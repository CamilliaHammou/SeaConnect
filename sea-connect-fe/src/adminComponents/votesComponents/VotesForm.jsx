import { toast } from "react-toastify";
import Button from "../Button";
import Input from "../Input";
import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import Dropdown from "../Dropdown";

const resultOptions = ["absolute", "relative"];
const roundOptions = ["1", "2"];

const VotesForm = ({ vote, getAllVotes, isEditing, onClose }) => {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState(vote ? vote.title : "");
  const [description, setDescription] = useState(
    vote ? (vote.description ? vote.description : "") : ""
  );
  const [resultType, setResultType] = useState(
    vote ? vote.resultType : resultOptions[0]
  );
  const [startDate, setStartDate] = useState(
    vote ? vote.startDate : new Date()
  );
  const [endDate, setEndDate] = useState(vote ? vote.endDate : new Date());
  const [totalRounds, setTotalRounds] = useState(
    vote ? vote.totalRounds : roundOptions[0]
  );

  const [answerOne, setAnswerOne] = useState(vote ? vote.voteOptions[0] : "");
  const [answerTwo, setAnswerTwo] = useState(vote ? vote.voteOptions[1] : "");
  const [answerThree, setAnswerThree] = useState(
    vote ? vote.voteOptions[2] : ""
  );
  const [answerFour, setAnswerFour] = useState(vote ? vote.voteOptions[3] : "");

  const editSubmitHandler = () => {
    // const formattedEventDate = new Date(eventDate).toISOString();
    const formData = {
      title: title,
      description: description,
      // eventDate: formattedEventDate,
      // organizerEmail: user.user.email,
      // organizerId: user.user.id,
    };
  };

  // Create vote
  const submitHandler = () => {
    const formData = {
      title,
      description,
      totalRounds: Number(totalRounds),
      resultType,
      // eventDate: formattedEventDate,
    };
    // console.log(formData);

    const myHeaders = new Headers();
    myHeaders.append("authorization", user.token);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(formData);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://185.216.27.140:3002/api/vote/create-vote", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          createRound(result.data.id);
        }
      })
      .catch((error) => console.error(error));
  };

  const createRound = (id) => {
    const myHeaders = new Headers();
    myHeaders.append("authorization", user.token);
    myHeaders.append("Content-Type", "application/json");

    const formattedVoteStartDate = new Date(startDate).toISOString();
    const formattedVoteEndDate = new Date(endDate).toISOString();

    const raw = JSON.stringify({
      voteId: id,
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
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Unable To Create Round");
      });
  };

  return (
    <div className="fixed overflow-y-auto h-[100vh] pt-60 z-20 inset-0 bg-white">
      <div className="flex justify-center h-screen items-center ">
        <div className="w-full max-w-xs ">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="bg-white shadow-md rounded  px-4 py-4 pb-4 mb-4 form border "
          >
            <div className="mb-6">
              <h1 className="text-center text-2xl ">
                {isEditing ? "Edit Vote" : "Create Vote"}
              </h1>
            </div>
            <Input
              label={"Title"}
              name={"title"}
              type={"text"}
              id={"title"}
              placeholder={"Title"}
              value={title}
              setValue={setTitle}
            />

            <Input
              label={"Description"}
              name={"description"}
              type={"text"}
              id={"description"}
              placeholder={"Description"}
              value={description}
              setValue={setDescription}
            />

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

            <Dropdown
              value={`${totalRounds}`}
              setValue={setTotalRounds}
              options={roundOptions}
              label={"Select Rounds"}
            />

            <Dropdown
              value={resultType}
              setValue={setResultType}
              options={resultOptions}
              label={"Select result type"}
            />

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
                {isEditing ? "Edit Vote" : "Create Vote"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VotesForm;
