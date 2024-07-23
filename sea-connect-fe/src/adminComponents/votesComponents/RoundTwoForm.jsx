import { useContext, useState } from "react";
import Button from "../Button";
import Dropdown from "../Dropdown";
import { UserContext } from "../../Context/UserContext";
import { toast } from "react-toastify";
import Input from "../Input";

const RoundTwoForm = ({ round, voteId, getAllVotes, isEditing, onClose }) => {
  console.log(round);
  const { user } = useContext(UserContext);
  const [startDate, setStartDate] = useState(
    round ? new Date(round.startDate) : new Date()
  );
  const [endDate, setEndDate] = useState(
    round ? new Date(round.endDate) : new Date()
  );
  const [answerOne, setAnswerOne] = useState(
    round ? round?.voteOptions[0] : ""
  );
  const [answerTwo, setAnswerTwo] = useState(
    round ? round?.voteOptions[1] : ""
  );
  const [answerThree, setAnswerThree] = useState(
    round ? round?.voteOptions[2] : ""
  );
  const [answerFour, setAnswerFour] = useState(
    round ? round?.voteOptions[3] : ""
  );

  const editSubmitHandler = () => {
    const myHeaders = new Headers();
    myHeaders.append("authorization", user.token);
    myHeaders.append("Content-Type", "application/json");

    const formattedVoteStartDate = new Date(startDate).toISOString();
    const formattedVoteEndDate = new Date(endDate).toISOString();

    const raw = JSON.stringify({
      endDate: formattedVoteEndDate,
      startDate: formattedVoteStartDate,
      voteOptions: [answerOne, answerTwo, answerThree, answerFour],
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `http://185.216.27.140:3002/api/vote/update-round/${round.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          toast.success("Round Updated");
          getAllVotes();
          onClose();
          return;
        }
        toast.error("Unable to Update Round");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Unable to Update Round");
      });
  };

  // Create vote
  const submitHandler = () => {
    const myHeaders = new Headers();
    myHeaders.append("authorization", user.token);
    myHeaders.append("Content-Type", "application/json");

    const formattedVoteStartDate = new Date(startDate).toISOString();
    const formattedVoteEndDate = new Date(endDate).toISOString();

    const raw = JSON.stringify({
      voteId,
      startDate: formattedVoteStartDate,
      endDate: formattedVoteEndDate,
      voteOptions: [answerOne, answerTwo, answerThree, answerFour],
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://185.216.27.140:3002/api/vote/create-round", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          getAllVotes();
          toast.success("Vote Round Created Success");
          onClose();
          return;
        }
        toast.error(result.error);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Unable To Create Round");
      });
  };

  return (
    <div className="fixed overflow-y-auto h-[100vh] z-20 inset-0 bg-white">
      <div className="flex justify-center h-screen items-center ">
        <div className="w-full max-w-xs ">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="bg-white shadow-md rounded  px-4 py-4 pb-4 mb-4 form border "
          >
            <div className="mb-6">
              <h1 className="text-center text-2xl ">
                {isEditing ? "Edit Round" : "Create Round"}
              </h1>
            </div>
            <Input
              label={"Option One"}
              name={"optionOne"}
              type={"text"}
              id={"optionOne"}
              placeholder={"Option One"}
              value={answerOne}
              setValue={setAnswerOne}
            />

            <Input
              label={"Option Two"}
              name={"optionTwo"}
              type={"text"}
              id={"optionTwo"}
              placeholder={"Option two"}
              value={answerTwo}
              setValue={setAnswerTwo}
            />

            <Input
              label={"Option Three"}
              name={"optionThree"}
              type={"text"}
              id={"optionThree"}
              placeholder={"Option three"}
              value={answerThree}
              setValue={setAnswerThree}
            />

            <Input
              label={"Option Four"}
              name={"optionFour"}
              type={"text"}
              id={"optionFour"}
              placeholder={"Option four"}
              value={answerFour}
              setValue={setAnswerFour}
            />

            <div className="mb-4">
              <label htmlFor="date-input">Select Start date</label>
              <input
                className={`text-gray-700 rounded w-full px-4 py-2 border-2 border-slate-500 focus:border-blue-400 outline-none `}
                type="date"
                id="date-input"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="date-input">Select End date</label>
              <input
                className={`text-gray-700 rounded w-full px-4 py-2 border-2 border-slate-500 focus:border-blue-400 outline-none `}
                type="date"
                id="date-input"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="my-6 flex items-center justify-between">
              <Button
                onClick={onClose}
                className={
                  "rounded-lg  px-4 py-2 border-2 border-red-600 text-red-800 hover:bg-red-600 hover:text-red-100 duration-300"
                }
              >
                Close
              </Button>
              <Button
                onClick={isEditing ? editSubmitHandler : submitHandler}
                className={
                  "rounded-lg px-4 py-2 border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-green-100 duration-300"
                }
              >
                {isEditing ? "Edit Round" : "Create Round"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RoundTwoForm;
