import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import emailjs from 'emailjs-com';
import axios from "axios";
import Select from 'react-select';
import { toast } from "react-toastify";

import Input from "../adminComponents/Input";
import Button from "../adminComponents/Button";

const SendNotification = () => {
  const [notificationType, setNotificationType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("http://185.216.27.140:3002/api/member/", {
          method: "GET",
          headers: {
            authorization: user.token,
          },
        });
        const result = await response.json();
        if (result.success) {
          const memberOptions = result.data.map(member => ({ value: member.email, label: member.email }));
          setMembers(memberOptions);

          if (selectAll) {
            setSelectedMembers(memberOptions);
          }
        } else {
          toast.error("Unable to get members");
        }
      } catch (error) {
        toast.error("Unable to get members");
        console.error("Failed to fetch members:", error);
      }
    };

    fetchMembers();
  }, [user.token, selectAll]);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedMembers(members);
    } else {
      setSelectedMembers([]);
    }
  };

  const sendNotificationHandler = async (e) => {
    e.preventDefault();

    //on convertis les membre en une liste
    const emails = selectedMembers.map(member => member.value).join(", ");

    try {
      //we Send email via EmailJS
      const emailResponse = await emailjs.send(
        'service_z60o3ke',
        'template_agchqwa',
        {
          to_name: "Camillia",
          from_name: user.name || "SeaConnect",
          title: title,
          description: description,
          type: notificationType,
          reply_to: emails,
        },
        'TRuraKDAkPpnLqUlO'
      );
      console.log('Email sent successfully!', emailResponse.status, emailResponse.text);

      //USING AXIOS TO SEND NOTIFICATION
      const data = JSON.stringify({
        title: title,
        description: description,
        notiificationType: notificationType,
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://185.216.27.140:3002/api/notification/create-notification",
        headers: {
          authorization: user.token,
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      console.log(response.data);

      if (response.data.success) {
        toast.success("Notification sent successfully");
      } else {
        toast.error("Failed to send notification");
      }
    } catch (error) {
      console.error('Failed to send email or notification. Error: ', error);
      toast.error("Failed to send notification");
    }
  };

  return (
    <div className="w-[80%] ml-auto">
      <div className="flex justify-center h-screen items-center -ml-24">
        <div className="w-full max-w-xs ">
          <form
            onSubmit={sendNotificationHandler}
            className="bg-white shadow-md rounded px-4 py-4 pb-4 mb-4 form border"
          >
            <div className="mb-6">
              <h1 className="text-center text-2xl ">
                Send Notification
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

            <div className="mb-6">
              <label htmlFor="replyTo" className="block text-sm font-medium text-gray-700">Send to</label>
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={(e) => {
                    setSelectAll(e.target.checked);
                    handleSelectAll();
                  }}
                  className="mr-2"
                />
                <span>Select All</span>
              </div>
              <Select
                id="replyTo"
                isMulti
                value={selectedMembers}
                onChange={setSelectedMembers}
                options={members}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="notificationType" className="block text-sm font-medium text-gray-700">Type</label>
              <select
                id="notificationType"
                value={notificationType}
                onChange={(e) => setNotificationType(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="other">Other</option>
                <option value="action">Action</option>
                <option value="event">Event</option>
              </select>
            </div>

            <div className="my-6 flex items-center justify-between">
              <Button
                onClick={sendNotificationHandler}
                className="rounded-lg mx-auto py-2 border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-green-100 duration-300"
              >
                Send Notification
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendNotification;
