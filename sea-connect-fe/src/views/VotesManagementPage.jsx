import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import VotesForm from "../adminComponents/votesComponents/VotesForm";
import VotesList from "../adminComponents/votesComponents/VotesList";
import Loader from "../adminComponents/Loader";

const VotesManagementPage = () => {
  const { user } = useContext(UserContext);
  const [votes, setVotes] = useState([]);
  const [showVoteForm, setShowVoteForm] = useState(false);
  const [active, setActive] = useState(true);

  const showFormHandler = () => {
    setShowVoteForm(true);
  };

  const getAllVotes = () => {
    const myHeaders = new Headers();
    myHeaders.append("authorization", user.token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://185.216.27.140:3002/api/vote/get-active-votes", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setVotes(result.data);
          setActive(true);
        }
      })
      .catch((error) => console.error(error));
  };

  const getAllEndedRounds = () => {
    const myHeaders = new Headers();
    myHeaders.append("authorization", user.token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://185.216.27.140:3002/api/vote/get-compeleted-votes", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setVotes(result.data);
          setActive(false);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getAllVotes();
  }, []);

  if (!votes.length)
    return (
      <section className="w-[80%] ml-auto ">
        <div className="p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Votes Management</h2>
          <div className="space-x-2">
            <button
              onClick={showFormHandler}
              className="rounded-lg px-4 py-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-gray-100 duration-300"
            >
              Create Vote
            </button>
            <button
              onClick={getAllVotes}
              className="rounded-lg px-4 py-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-gray-100 duration-300"
            >
              Active Rounds
            </button>

            <button
              onClick={getAllEndedRounds}
              className="rounded-lg px-4 py-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-gray-100 duration-300"
            >
              Ended Rounds
            </button>
          </div>
        </div>
        <h2>No Votes Added Yet</h2>
        {showVoteForm && (
          <VotesForm
            getAllVotes={getAllVotes}
            onClose={() => setShowVoteForm(false)}
          />
        )}
      </section>
    );

  return (
    <section className="w-[80%] ml-auto ">
      <div className="p-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Votes Management</h2>
        <div className="space-x-2">
          <button
            onClick={showFormHandler}
            className="rounded-lg px-4 py-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-gray-100 duration-300"
          >
            Create Vote
          </button>
          <button
            onClick={getAllVotes}
            className="rounded-lg px-4 py-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-gray-100 duration-300"
          >
            Active Rounds
          </button>

          <button
            onClick={getAllEndedRounds}
            className="rounded-lg px-4 py-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-gray-100 duration-300"
          >
            Ended Rounds
          </button>
        </div>
      </div>
      <div>
        <VotesList
          active={active}
          votes={votes}
          user={user}
          getAllVotes={getAllVotes}
        />
      </div>
      {showVoteForm && (
        <VotesForm
          getAllVotes={getAllVotes}
          onClose={() => setShowVoteForm(false)}
        />
      )}
    </section>
  );
};

export default VotesManagementPage;
