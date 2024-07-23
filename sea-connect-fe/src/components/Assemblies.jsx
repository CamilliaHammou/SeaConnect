import { useContext, useEffect, useState } from "react";
import Loader from "../adminComponents/Loader";
import { UserContext } from "../Context/UserContext";
import { format } from "date-fns";
import AssemblyVoteModel from "./AssemblyVoteModel";

const Assemblies = () => {
  const { user } = useContext(UserContext);
  const [assemblies, setAssemblies] = useState([]);
  const [showVoteModel, setShowVoteModel] = useState(false);
  const [assembly, setAssembly] = useState(null);

  const getAllAssemblies = () => {
    const myHeaders = new Headers();
    myHeaders.append("authorization", user.token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://185.216.27.140:3002/api/assemblies/get", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        if (result.success) {
          setAssemblies(result.data);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getAllAssemblies();
  }, []);

  if (!assemblies.length) return <Loader />;

  const renderAssemblies =
    assemblies.length &&
    assemblies.map((assembly) => (
      <div
        onClick={() => {
          setAssembly(assembly);
          setShowVoteModel(true);
        }}
        key={assembly.id}
        className="cursor-pointer hover:bg-slate-200 shadow-md p-4 space-y-2 full"
      >
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

        {/* <div>
          <h2 className="font-bold">Votes</h2>
          <p>
            {assembly.votes
              ? assembly.votes.map((v, i) => <span key={i}>{v.userEmail}</span>)
              : "No Votes"}
          </p>
        </div> */}

        <div>
          <h2 className="font-bold">Status</h2>
          <p>{assembly.status}</p>
        </div>

        <div>
          <h2 className="font-bold">Date</h2>
          {format(assembly.date, "dd-MM-yyyy")}
        </div>
      </div>
    ));

  return (
    <section>
      <div className="grid grid-cols-3 gap-4">{renderAssemblies}</div>
      {showVoteModel && (
        <AssemblyVoteModel
          onClose={() => setShowVoteModel(false)}
          assembly={assembly}
          user={user}
        />
      )}
    </section>
  );
};

export default Assemblies;
