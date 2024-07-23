import Vote from "../models/vote.js"
import VoteCast from "../models/voteCast.js";
import VoteRound from "../models/voteRound.js"

class VoteService {

  static async getVotes(completed = false) {

    const activeRounds = completed === true ? await VoteRound.getCompletedVotes() : await VoteRound.getActiveRounds()
    const roundsByVoteId = new Map();

    activeRounds.forEach(round => {
      if (!roundsByVoteId.has(round.voteId)) {
        roundsByVoteId.set(round.voteId, []);
      }
      roundsByVoteId.get(round.voteId).push({
        id: round.id,
        roundNumber: round.roundNumber,
        startDate: round.startDate,
        endDate: round.endDate,
        voteOptions: round.voteOptions
      });
    });
  
    const votesWithRounds = await Promise.all(Array.from(roundsByVoteId.entries()).map(async ([voteId, rounds]) => {
      const vote = await Vote.getVote(voteId);
      return {
        id: vote.id,
        title: vote.title,
        description: vote.description,
        totalRounds: vote.totalRounds,
        resultType: vote.resultType,
        rounds: rounds
      };
    }));
  
    return votesWithRounds;
  }

  static async getRoundResult(round) {
    const voteOptions = round.voteOptions;
    const vote = await Vote.getVote(round.voteId);
    const votes = await VoteCast.getCastedVotes(round.id);
  
    const totalVoteCount = votes.length;
    console.log("Round", round)
    console.log("vote options:", voteOptions)


    const optionVotes = voteOptions.map(option => {
      const voteCount = votes.filter(vote => vote.voteOption === option).length;
      return {
        option: option,
        voteCount: voteCount
      };
    });

    optionVotes.sort((a, b) => b.voteCount - a.voteCount);

    let winner;
    
    if (vote.resultType === 'ABSOLUTE' && optionVotes[0].voteCount > totalVoteCount / 2) {
      winner = optionVotes[0].option;
      optionVotes.push({winner: winner});
      return optionVotes;
    }

    if (vote.resultType === 'ABSOLUTE' && optionVotes[0].voteCount <= totalVoteCount / 2) {
      optionVotes.push({winner: 'No ONE'});
      return optionVotes;
    }

    if (vote.resultType === 'RELATIVE') {
      winner = optionVotes[0].option;
      optionVotes.push({winner: winner});
      return optionVotes;
    }
  }
  
}

export default VoteService
