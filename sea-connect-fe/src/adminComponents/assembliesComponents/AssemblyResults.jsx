import { useEffect, useState } from "react";
import Button from "../Button";

const AssemblyResults = ({ onClose, user, assembly }) => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("authorization", user.token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `http://localhost:3002/api/assemblies/${assembly.id}/result`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          setResult(result.data);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  console.log(result);
  return (
    <div className="fixed z-20 overflow-y-auto inset-0 bg-white">
      <div className="max-w-96 mx-auto my-5 flex items-center justify-between">
        <h2>Assembly Results</h2>
        <Button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-sm inline-flex items-center"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
      <div className="max-w-96 mx-auto my-5 shadow-md p-4">
        {result ? (
          <div>
            <div>
              <h2 className="font-bold">Title</h2>
              <p>{assembly.title}</p>
            </div>
            <div>
              <h2 className="font-bold">Description</h2>
              <p>{assembly.description}</p>
            </div>

            <h3 className="font-bold">Results</h3>
            <div>
              <h2 className="font-bold">Abstain Votes</h2>
              <p>{result.abstainVotes}</p>
            </div>
            <div>
              <h2 className="font-bold">Against Votes</h2>
              <p>{result.againstVotes}</p>
            </div>
          </div>
        ) : (
          <h2 className="font-bold">Loading...</h2>
        )}
      </div>
    </div>
  );
};

export default AssemblyResults;
