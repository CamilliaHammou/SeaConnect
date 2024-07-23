import { useState } from "react";
import Dropdown from "../adminComponents/Dropdown";
import Button from "../adminComponents/Button";
import { toast } from "react-toastify";

const votes = ["against", "abstain"];

const AssemblyVoteModel = ({ assembly, user, onClose }) => {
  const [vote, setVote] = useState(votes[0] || "");

  console.log(assembly);

  const voteHandler = () => {
    const myHeaders = new Headers();
    myHeaders.append("authorization", user.token);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      voteType: "against",
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `http://185.216.27.140:3002/api/assemblies/${assembly.id}/vote`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          toast.success("Vote Casted Successfully");
          onClose();
          return;
        }
        toast.error(result.error);
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="fixed z-20 inset-0 bg-white">
      <div className="max-w-96 mx-auto my-5">
        <div className=" flex items-center justify-between ">
          <h2>Cast Assembly Vote</h2>
          <Button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-sm inline-flex items-center"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
        <Dropdown
          label={"Select Vote"}
          options={votes}
          value={vote}
          setValue={setVote}
        />

        <Button
          onClick={voteHandler}
          className={
            "rounded-lg mt-10 px-4 py-2 border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-green-100 duration-300"
          }
        >
          Vote
        </Button>
      </div>
    </div>
  );
};

export default AssemblyVoteModel;
