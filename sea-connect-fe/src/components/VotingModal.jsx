import { useContext, useState } from "react";
import Dropdown from "../adminComponents/Dropdown";
import { UserContext } from "../Context/UserContext";
import { toast } from "react-toastify";

const VotingModal = ({ vote, onClose, voteId }) => {
  const [value, setValue] = useState(vote.voteOptions[0]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);

  const submitVoteHandler = () => {
    setIsLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("authorization", user.token);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      voteId: voteId,
      roundId: vote.id,
      voteOption: value,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://185.216.27.140:3002/api/vote/cast-vote", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          toast.success("Vote Casted Successful");
          onClose();
          setIsLoading(false);
          return;
        }
        toast.error(result.message);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  return (
    <div className="fixed z-30 inset-0 bg-white">
      <div className="p-7 max-w-md  mx-auto">
        <div className="mb-6 ">
          <h2 className="font-bold">Options</h2>
          <ol className="list-decimal">
            {vote.voteOptions.map((vto, index) => (
              <li key={index}>{vto}</li>
            ))}
          </ol>
        </div>
        <div>
          <Dropdown
            label={"Select Option"}
            setValue={setValue}
            value={value}
            options={vote.voteOptions}
          />
        </div>
        <div className="flex space-x-2 mt-7 justify-between">
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={submitVoteHandler}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex flex-row space-x-2"
          >
            <span>Submit</span>
            {isLoading && (
              <span className="w-4 h-4 border-t-2 border-b-2 border-white rounded-full animate-spin"></span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VotingModal;
