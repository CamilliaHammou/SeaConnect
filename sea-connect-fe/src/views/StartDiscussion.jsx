import { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import axios from "axios";

import Input from "../adminComponents/Input";
import Button from "../adminComponents/Button";
import { toast } from "react-toastify";

const StartDiscussion = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { user } = useContext(UserContext);

  const sendNotificationHandler = async () => {
    const data = JSON.stringify({
      title: title,
      description: description,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://185.216.27.140:3002/api/discussion/start",
      headers: {
        authorization: user.token,
        "Content-Type": "application/json",
      },
      data,
    };

    const response = await axios.request(config);
    console.log(response.data);
    if (response.data.success) {
      toast.success("Discussion started successfully");
    }
  };

  return (

    <div className="w-[80%] ml-auto">
      <div className="flex justify-center h-screen items-center -ml-24">
        <div className="w-full max-w-xs ">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="bg-white shadow-md rounded px-4 py-4 pb-4 mb-4 form border"
          >
            <div className="mb-6">
              <h1 className="text-center text-2xl ">
                Start Discussion
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
  
            <div className="my-6 flex items-center justify-between">
              <Button
                onClick={sendNotificationHandler}
                className="rounded-lg mx-auto py-2 border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-green-100 duration-300"
              >
                Start Discussion
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StartDiscussion;
