import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { UserContext } from "../Context/UserContext";
import Loader from "../adminComponents/Loader";
import VotesList from "../components/VotesList";

const VotingPage = () => {
  const [votes, setVotes] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) return;
    const myHeaders = new Headers();
    myHeaders.append("authorization", user.token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://185.216.27.140:3002/api/vote/get-active-votes", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setVotes(result.data);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  if (!user) {
    return (
      <>
        <Header />
        <div className=" mx-auto max-w-[1200px]">
          <div className="bg-pink-500 my-6 text-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-4">No User Found</h2>
            <p className="text-lg">Log Into Your Account</p>
          </div>
        </div>
      </>
    );
  }

  if (!votes) return <Loader />;

  return (
    <div className=" mx-auto max-w-[1200px]">
      <Header />
      <div className="bg-green-500 my-6 text-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-4">
          Vote for Your Favorite Candidate
        </h2>
        <p className="text-lg">
          Cast your vote for the candidate you believe will make a positive
          impact in our community. Your voice matters!
        </p>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {votes ? (
          votes.map((vote) => <VotesList key={vote.id} vote={vote} />)
        ) : (
          <h2>No Active Voting</h2>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default VotingPage;
