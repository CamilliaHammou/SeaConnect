import { useState } from "react";
import VotesDetails from "./VotesDetails";
import VotesForm from "./VotesForm";
import VotesItem from "./VotesItem";
import { v4 as uuid } from "uuid";
import RoundTwoForm from "./RoundTwoForm";
import WinnersModal from "./WinnersModal";

const VotesList = ({ getAllVotes, votes, user, active }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [showRoundForm, setShowRoundForm] = useState(false);
  const [vote, setVote] = useState(null);
  const [showVoteDetails, setShowVoteDetails] = useState(false);

  const showDetailsHandler = (vote) => {
    setVote(vote);
    setShowVoteDetails(true);
  };

  const actions = [
    {
      id: uuid(),
      label: "Add Round",
      action: (vote) => {
        setVote(vote);
        setShowRoundForm(true);
      },
    },
    // {
    //   id: uuid(),
    //   label: "Show Winner",
    //   action: (vote) => {
    //     setVote(vote);
    //     setShowWinnerModal(true);
    //   },
    // },
  ];
  const renderVotes = votes.map((vote) => (
    <VotesItem
      key={vote.id}
      vote={vote}
      actions={actions}
      showDetailsHandler={showDetailsHandler}
    />
  ));
  return (
    <>
      <div className="bg-gray-100 p-4">
        <div className="container mx-auto">
          <div className="py-5">
            <div className="flex items-center px-5 py-2">
              <span className="w-1/4">
                <span className="text-xs uppercase text-gray-600 font-bold">
                  Title
                </span>
              </span>

              <span className="ml-28 w-1/4">
                <span className="text-xs uppercase text-gray-600 font-bold">
                  Total Rounds
                </span>
              </span>

              <span className="ml-auto  w-fit mr-28">
                <span className="text-xs uppercase text-gray-600 font-bold">
                  Actions
                </span>
              </span>
            </div>
            {renderVotes}
          </div>
        </div>
      </div>
      {showEditForm && (
        <VotesForm
          getAllVotes={getAllVotes}
          vote={vote}
          isEditing
          onClose={() => setShowEditForm(false)}
        />
      )}
      {showVoteDetails && (
        <VotesDetails
          active={active}
          getAllVotes={getAllVotes}
          vote={vote}
          onClose={() => setShowVoteDetails(false)}
        />
      )}
      {showRoundForm && (
        <RoundTwoForm
          round={null}
          voteId={vote.id}
          getAllVotes={getAllVotes}
          onClose={() => setShowRoundForm(false)}
        />
      )}
    </>
  );
};

export default VotesList;
