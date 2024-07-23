import { format } from "date-fns";
import React, { useState } from "react";
import VotingModal from "./VotingModal";

const VotesList = ({ vote }) => {
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [round, setRound] = useState(null);

  return (
    <div className="shadow-md  ">
      <div className=" p-4 space-y-2 max-w-xl mx-auto">
        <div>
          <h2 className="font-bold">Title</h2>
          <p>{vote.title}</p>
        </div>

        <div>
          <h2 className="font-bold">Description</h2>
          <p>{vote.description ? vote.description : "No Description"}</p>
        </div>
        <div>
          <h2 className="font-bold">Total Rounds</h2>
          <p>{vote.totalRounds}</p>
        </div>
      </div>
      <div>
        {vote.rounds.map((round) => (
          <div
            className="hover:bg-slate-100 cursor-pointer p-4 mb-3 space-y-2 max-w-xl mx-auto"
            key={round.id}
            onClick={() => {
              setRound(round);
              setShowVoteModal(true);
            }}
          >
            <div>
              <h2 className="font-bold">Click Here For Voting</h2>
            </div>

            <div className="w-1/4">
              <h2 className="font-bold">Start Date</h2>

              <span className="text-gray-600 text-sm">
                {format(round.startDate, "yyyy-MM-dd")}
              </span>
            </div>

            <div className="w-1/4">
              <h2 className="font-bold">End Date</h2>
              <span className="text-gray-600 text-sm">
                {format(round.endDate, "yyyy-MM-dd")}
              </span>
            </div>
            {/* <h2 className="font-bold">Options</h2>
            <ol className="list-decimal">
              {round.voteOptions.map((vto, index) => (
                <li key={index}>{vto}</li>
              ))}
            </ol> */}
          </div>
        ))}
      </div>
      {showVoteModal && (
        <VotingModal
          voteId={vote.id}
          vote={round}
          onClose={() => setShowVoteModal(false)}
        />
      )}
    </div>
  );
};

export default VotesList;
