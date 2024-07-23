import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { toast } from "react-toastify";
import Input from "../Input";
import Dropdown from "../Dropdown";
import Button from "../Button";

const typeOptions = ["general", "extraordinary"];
const assemblyStatus = ["planned", "ongoing", "completed"];

const AssemblyForm = ({ assembly, getAllAssemblies, isEditing, onClose }) => {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState(assembly ? assembly.title : "");
  const [minutes, setMinutes] = useState(assembly ? assembly.minutes : "");
  const [quorumRequired, setQuorumRequired] = useState(
    assembly ? assembly.quorumRequired : 5
  );
  const [description, setDescription] = useState(
    assembly ? (assembly.description ? assembly.description : "") : ""
  );
  const [type, setType] = useState(assembly ? assembly.type : typeOptions[0]);
  const [status, setStatus] = useState(
    assembly ? assembly.status : assemblyStatus[0]
  );
  const [date, setDate] = useState(assembly ? assembly.date : new Date());

  const editSubmitHandler = () => {
    const formattedDate = new Date(date).toISOString();
    const myHeaders = new Headers();
    myHeaders.append("authorization", user.token);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      status,
      title,
      description,
      date: formattedDate,
      type,
      quorumRequired,
      minutes,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `http://185.216.27.140:3002/api/assemblies/update/${assembly.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          getAllAssemblies();
          toast.success("Assembly Updated Success");
          onClose();
          return;
        }
        toast.success("Unable To Update Assembly");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Unable To Update Assembly");
      });
  };

  // Create assembly
  const submitHandler = () => {
    const myHeaders = new Headers();
    myHeaders.append("authorization", user.token);
    myHeaders.append("Content-Type", "application/json");

    const formattedDate = new Date(date).toISOString();

    const raw = JSON.stringify({
      title,
      description,
      date: formattedDate,
      type,
      quorumRequired: Number(quorumRequired),
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://185.216.27.140:3002/api/assemblies/create", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          getAllAssemblies();
          toast.success("Assembly Created Success");
          onClose();
          return;
        }
        toast.success("Unable To Create Assembly");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Unable To Create Assembly");
      });
  };

  return (
    <div className="fixed overflow-y-auto h-[100vh] z-20 inset-0 bg-white">
      <div className="flex pt-52 justify-center h-screen items-center ">
        <div className="w-full max-w-xs ">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="bg-white shadow-md rounded  px-4 py-4 pb-4 mb-4 form border "
          >
            <div className="mb-6">
              <h1 className="text-center text-2xl ">
                {isEditing ? "Edit Assembly" : "Create Assembly"}
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

            {isEditing && (
              <Input
                label={"Minutes"}
                name={"minutes"}
                type={"text"}
                id={"minutes"}
                placeholder={"Minutes"}
                value={minutes}
                setValue={setMinutes}
              />
            )}

            <Input
              label={"Quorum Required"}
              name={"quorumRequired"}
              type={"number"}
              id={"quorumRequired"}
              placeholder={"5"}
              value={quorumRequired}
              setValue={setQuorumRequired}
            />

            <div className="mb-4">
              <label htmlFor="date-input">Select date</label>
              <input
                className={`text-gray-700 rounded w-full px-4 py-2 border-2 border-slate-500 focus:border-blue-400 outline-none `}
                type="date"
                id="date-input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <Dropdown
              value={type}
              setValue={setType}
              options={typeOptions}
              label={"Select assembly type"}
            />

            {isEditing && (
              <Dropdown
                value={status}
                setValue={setStatus}
                options={assemblyStatus}
                label={"Select assembly status"}
              />
            )}

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
                {isEditing ? "Edit Assembly" : "Create Assembly"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AssemblyForm;
