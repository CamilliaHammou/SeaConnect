import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { UserContext } from "../Context/UserContext";
import Notifications from "../components/Notifications";
import { toast } from "react-toastify";
import axios from "axios";

const UserNotifications = () => {
  const { user } = useContext(UserContext);
  const [readNotifications, setReadNotifications] = useState([]);
  const [unReadNotifications, setUnReadNotifications] = useState([]);
  const [hardRefresh, setHardRefresh] = useState();

  useEffect(() => {
    if (!user) return;
    const myHeaders = new Headers();
    myHeaders.append("authorization", user.token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "http://185.216.27.140:3002/api/notification",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          setReadNotifications(result.data.readNotifications);
          setUnReadNotifications(result.data.unReadNotifications);
        }
      })
      .catch((error) => console.error(error));
  }, [hardRefresh]);

  const markAsRead = async (notificationId) => {

    console.log("id", notificationId);
    const data = JSON.stringify({
      notificationId: notificationId,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://185.216.27.140:3002/api/notification/mark-read",
      headers: {
        authorization: user.token,
        "Content-Type": "application/json",
      },
      data,
    };

    const response = await axios.request(config);
    console.log(response.data);
    if (response.data.success) {
      toast.success("Notification Marked as Read");
      setHardRefresh(notificationId)
    }
  }

  if (!user) {
    return (
      <>
        <Header />
        <div className=" mx-auto max-w-[1200px]">
          <div className="bg-red-500 my-6 text-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-4">No User Found</h2>
            <p className="text-lg">Log Into Your Account</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* <Header /> */}
      <Notifications
        readNotifications={readNotifications}
        unReadNotifications={unReadNotifications}
        markAsRead={markAsRead}
      ></Notifications>
    </>
  );
};

export default UserNotifications;
