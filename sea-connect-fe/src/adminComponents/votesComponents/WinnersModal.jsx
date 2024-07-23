import { useContext, useEffect, useState } from "react";
import Button from "../Button";
import { UserContext } from "../../Context/UserContext";
import { toast } from "react-toastify";

const WinnersModal = ({ vote, round, onClose }) => {
  const [results, setResults] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("authorization", user.token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `http://localhost:3002/api/vote/get-round-result/${round.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          setResults(result.data);
          return;
        }
        // toast.error("Round Still In Progress");
      })
      .catch((error) => console.error(error));
  }, []);

  if (!results.length) {
    return (
      <div className="fixed z-30 overflow-y-auto inset-0 bg-white">
        <div className="max-w-96 mx-auto my-5 flex items-center justify-between">
          <h2>Winner Details</h2>
          <Button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-sm inline-flex items-center"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
        <h2 className="max-w-96 mx-auto mt-16">
          No Result YET. Round Might be still in progress
        </h2>
      </div>
    );
  }

  return (
    <div className="fixed z-30 overflow-y-auto inset-0 bg-white">
      <div className="max-w-96 mx-auto my-5 flex items-center justify-between">
        <h2>Winner Details</h2>
        <Button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-sm inline-flex items-center"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
      <div>
        {vote.rounds.map((round) => (
          <div
            className="shadow-md p-8 mb-10 space-y-2 max-w-xl mx-auto"
            key={round.id}
          >
            <h2 className="font-bold">Options</h2>
            <div className="">
              <div className="list-decimal">
                {results.map((vto, index) => (
                  <div key={index}>
                    <h2>{vto.option}</h2>
                    <p> {vto.voteCount}</p>
                    {vto.winner ? (
                      <div>
                        <h2 className="font-bold">Winner</h2>
                        <p>{vto.winner}</p>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WinnersModal;
