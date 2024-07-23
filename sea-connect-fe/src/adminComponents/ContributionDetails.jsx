import { useEffect, useState } from "react";
import Button from "./Button";
import Loader from "./Loader";
import ContributionCard from "./ContributionCard";

const ContributionDetails = ({ onClose, userEmail, user }) => {
  const [contributionDetails, setContributionDetails] = useState(null);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("authorization", user.token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const encodedEmail = encodeURIComponent(userEmail);

    fetch(
      `http://185.216.27.140:3002/api/contribution/user-contribution/${encodedEmail}`,
      // `http://185.216.27.140:3002/api/contribution?email=${encodedEmail}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          setContributionDetails(result.data);
        }
      })
      .catch((error) => {
        console.error(error);
        setContributionDetails([]);
      });
  }, [userEmail, user]);

  console.log(contributionDetails?.length);

  return (
    <div className="fixed overflow-y-auto inset-0 z-20 bg-white">
      {contributionDetails === null ? (
        <Loader />
      ) : (
        <div className="max-w-md mx-auto p-4">
          {contributionDetails?.length ? (
            <div>
              <div className="flex items-center justify-between">
                <h2>Contribution Details</h2>
                <Button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-sm inline-flex items-center"
                  onClick={onClose}
                >
                  Close
                </Button>
              </div>
              <div className="w-80 mx-auto">
                {contributionDetails?.map((cd) => (
                  <ContributionCard data={cd} key={cd.id} />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <h2>No Contribution Details</h2>
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

export default ContributionDetails;
