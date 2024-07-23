import { format } from "date-fns";
import Button from "../Button";
import { useState } from "react";
import RoundTwoForm from "./RoundTwoForm";
import WinnersModal from "./WinnersModal";

const VotesDetails = ({ vote, onClose, getAllVotes, active }) => {
  const [showRoundEditForm, setShowRoundEditForm] = useState(false);
  const [round, setRound] = useState(null);
  const [showWinnerModal, setShowWinnerModal] = useState(false);

  const showFormHandler = (round) => {
    setRound(round);
    setShowRoundEditForm(true);
  };

  const showWinnerHandler = (round) => {
    setRound(round);
    setShowWinnerModal(true);
  };

  return (
    <div className="fixed z-20 overflow-y-auto inset-0 bg-white">
      <div className="max-w-96 mx-auto my-5 flex items-center justify-between">
        <h2>Vote Details</h2>
        <Button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-sm inline-flex items-center"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
      <div className="shadow-md p-4 space-y-2 max-w-xl mx-auto">
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
            className="shadow-md p-8 mb-10 space-y-2 max-w-xl mx-auto"
            key={round.id}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold">Round Number</h2>
                <p>{round.roundNumber}</p>
              </div>
              {active && (
                <button
                  onClick={() => showFormHandler(round)}
                  className="rounded-lg px-4 py-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-gray-100 duration-300"
                >
                  Edit Round
                </button>
              )}
              <button
                onClick={() => showWinnerHandler(round)}
                className="rounded-lg px-4 py-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-gray-100 duration-300"
              >
                Show Winner
              </button>
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
            <h2 className="font-bold">Options</h2>
            <ol className="list-decimal">
              {round.voteOptions.map((vto, index) => (
                <li key={index}>{vto}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>
      {showRoundEditForm && (
        <RoundTwoForm
          isEditing
          onClose={() => {
            setShowRoundEditForm(false);
            onClose();
          }}
          round={round}
          getAllVotes={getAllVotes}
        />
      )}
      {showWinnerModal && (
        <WinnersModal
          vote={vote}
          onClose={() => setShowWinnerModal(false)}
          round={round}
        />
      )}
    </div>
  );
};

export default VotesDetails;
