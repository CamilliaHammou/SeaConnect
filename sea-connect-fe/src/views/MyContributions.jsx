import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { UserContext } from "../Context/UserContext";
import ContributionCard from "../adminComponents/ContributionCard";

const MyContributions = () => {
  const { user } = useContext(UserContext);
  const [myContributions, setMyContributions] = useState([]);

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
      "http://185.216.27.140:3002/api/contribution/my-contribution",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          setMyContributions(result.data);
        }
      })
      .catch((error) => console.error(error));
  }, []);

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
      <Header />
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-3xl font-bold my-4">My Contributions</h1>
        <p className="text-lg mb-8">
          Here you can find all of your contributions to our platform. From
          donations to volunteer work, we appreciate everything you've done to
          make a difference.
        </p>
        {myContributions.length ? (
          <div className="grid grid-cols-3 gap-4">
            {myContributions?.map((cd) => (
              <ContributionCard data={cd} key={cd.id} isMyContributions />
            ))}
          </div>
        ) : (
          <h2>No Contributions</h2>
        )}
      </div>
    </>
  );
};

export default MyContributions;
