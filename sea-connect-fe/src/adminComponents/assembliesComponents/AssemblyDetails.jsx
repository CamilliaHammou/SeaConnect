import { format } from "date-fns";
import Button from "../Button";

const AssemblyDetails = ({ assembly, onClose }) => {
  return (
    <div className="fixed z-20 overflow-y-auto inset-0 bg-white">
      <div className="max-w-96 mx-auto my-5 flex items-center justify-between">
        <h2>Assembly Details</h2>
        <Button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-sm inline-flex items-center"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
      <div className="shadow-md p-4 space-y-2 max-w-xl mx-auto">
        <div>
          <h2 className="font-bold">Title</h2>
          <p>{assembly.title}</p>
        </div>

        <div>
          <h2 className="font-bold">Description</h2>
          <p>
            {assembly.description ? assembly.description : "No Description"}
          </p>
        </div>

        <div>
          <h2 className="font-bold">Type</h2>
          <p>{assembly.type}</p>
        </div>

        <div>
          <h2 className="font-bold">Quorum Required</h2>
          <p>{assembly.quorumRequired}</p>
        </div>

        <div>
          <h2 className="font-bold">Votes</h2>

          {assembly.votes
            ? assembly.votes.map((v, i) => (
                <div key={i}>
                  <p>
                    <span>Email:</span>
                    <span>{v.userEmail}</span>
                  </p>
                  <p>
                    <span>Vote Type</span>
                    <span>:{v.voteType}</span>
                  </p>
                </div>
              ))
            : "No Votes"}
        </div>

        <div>
          <h2 className="font-bold">Minutes</h2>
          <p>{assembly.minutes ? assembly.minutes : "No minutes"}</p>
        </div>

        <div>
          <h2 className="font-bold">Status</h2>
          <p>{assembly.status}</p>
        </div>

        <div>
          <h2 className="font-bold">Date</h2>
          {format(assembly.date, "dd-MM-yyyy")}
        </div>
      </div>
    </div>
  );
};

export default AssemblyDetails;
