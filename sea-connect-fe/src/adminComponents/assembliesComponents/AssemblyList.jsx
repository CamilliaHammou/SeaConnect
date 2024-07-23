import { useState } from "react";
import { v4 as uuid } from "uuid";
import AssemblyItem from "./AssemblyItem";
import AssemblyForm from "./AssemblyForm";
import AssemblyDetails from "./AssemblyDetails";
import AssemblyResults from "./AssemblyResults";

const AssemblyList = ({ assemblies, user, getAllAssemblies }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDetails, setDetails] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [assembly, setAssembly] = useState(null);

  const actions = [
    {
      id: uuid(),
      label: "Edit",
      action: (assembly) => {
        setAssembly(assembly);
        setShowEditForm(true);
      },
    },

    {
      id: uuid(),
      label: "Results",
      action: (assembly) => {
        setAssembly(assembly);
        setShowResults(true);
      },
    },
  ];

  const showDetailsHandler = (assembly) => {
    setAssembly(assembly);
    setDetails(true);
  };

  const renderAssemblies = assemblies.map((assembly) => (
    <AssemblyItem
      key={assembly.id}
      assembly={assembly}
      actions={actions}
      showDetailsHandler={showDetailsHandler}
    />
  ));

  return (
    <>
      <div className="bg-gray-100 p-4">
        <div className="container mx-auto">
          <div className="py-5">
            <div className="flex items-center px-5 py-2">
              <span className="w-1/2">
                <span className="text-xs uppercase text-gray-600 font-bold">
                  Title
                </span>
              </span>
              <span className="w-1/4">
                <span className="text-xs uppercase text-gray-600 font-bold">
                  Description
                </span>
              </span>
              <span className="w-1/4">
                <span className="text-xs uppercase text-gray-600 font-bold">
                  Quorum Required
                </span>
              </span>
              <span className="w-1/4">
                <span className="text-xs uppercase text-gray-600 font-bold">
                  Status
                </span>
              </span>

              <span className="w-1/4">
                <span className="text-xs uppercase text-gray-600 font-bold">
                  Actions
                </span>
              </span>
            </div>
            {renderAssemblies}
          </div>
        </div>
      </div>
      {showEditForm && (
        <AssemblyForm
          getAllAssemblies={getAllAssemblies}
          assembly={assembly}
          isEditing
          onClose={() => setShowEditForm(false)}
        />
      )}
      {showDetails && (
        <AssemblyDetails
          assembly={assembly}
          onClose={() => setDetails(false)}
        />
      )}

      {showResults && (
        <AssemblyResults
          user={user}
          assembly={assembly}
          onClose={() => setShowResults(false)}
        />
      )}
    </>
  );
};

export default AssemblyList;
