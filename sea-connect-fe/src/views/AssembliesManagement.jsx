import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import Loader from "../adminComponents/Loader";
import AssemblyForm from "../adminComponents/assembliesComponents/AssemblyForm";
import AssemblyList from "../adminComponents/assembliesComponents/AssemblyList";

const AssembliesManagement = () => {
  const { user } = useContext(UserContext);
  const [assemblies, setAssemblies] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const showFormHandler = () => {
    setShowForm(true);
  };

  const getAllAssemblies = () => {
    const myHeaders = new Headers();
    myHeaders.append("authorization", user.token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:3002/api/assemblies/get", requestOptions)
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

  if (!assemblies.length)
    return (
      <section className="w-[80%] ml-auto">
        <div className="p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Assemblies Management</h2>
          <div className="space-x-2">
            <button
              onClick={showFormHandler}
              className="rounded-lg px-4 py-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-gray-100 duration-300"
            >
              Create Assembly
            </button>
          </div>
        </div>
        <h2>No Assembly Added YET</h2>
        {showForm && (
          <AssemblyForm
            getAllAssemblies={getAllAssemblies}
            onClose={() => setShowForm(false)}
          />
        )}
      </section>
    );

  return (
    <section className="w-[80%] ml-auto">
      <div className="p-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Assemblies Management</h2>
        <div className="space-x-2">
          <button
            onClick={showFormHandler}
            className="rounded-lg px-4 py-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-gray-100 duration-300"
          >
            Create Assembly
          </button>
        </div>
      </div>
      <div>
        <AssemblyList
          assemblies={assemblies}
          user={user}
          getAllAssemblies={getAllAssemblies}
        />
      </div>
      {showForm && (
        <AssemblyForm
          getAllAssemblies={getAllAssemblies}
          onClose={() => setShowForm(false)}
        />
      )}
    </section>
  );
};

export default AssembliesManagement;
