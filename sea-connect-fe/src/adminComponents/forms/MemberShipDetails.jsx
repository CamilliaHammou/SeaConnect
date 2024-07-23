import { useEffect, useState } from "react";
import Button from "../Button";
import MembershipCard from "../MembershipCard";
import Loader from "../Loader";

const MemberShipDetails = ({ onClose, userEmail, user }) => {
  const [memberShipDetails, setMemberShipDetails] = useState(null);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("authorization", user.token);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const encodedEmail = encodeURIComponent(userEmail);

    fetch(
      `http://185.216.27.140:3002/api/membership?email=${encodedEmail}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setMemberShipDetails(result.data);
        }
      })
      .catch((error) => {
        console.error(error);
        setMemberShipDetails([]);
      });
  }, [userEmail, user]);

  return (
    <div className="fixed overflow-y-auto inset-0 z-20 bg-white">
      {memberShipDetails === null ? (
        <Loader />
      ) : (
        <div className="max-w-md mx-auto p-4">
          {memberShipDetails.length ? (
            <div>
              <div className="flex items-center justify-between">
                <h2>Membership Details</h2>
                <Button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-sm inline-flex items-center"
                  onClick={onClose}
                >
                  Close
                </Button>
              </div>
              <div className="w-80 mx-auto">
                {memberShipDetails.map((mb) => (
                  <MembershipCard data={mb} key={mb.id} />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <h2>No Membership Details</h2>
              <Button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-sm inline-flex items-center"
                onClick={onClose}
              >
                Close
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MemberShipDetails;
