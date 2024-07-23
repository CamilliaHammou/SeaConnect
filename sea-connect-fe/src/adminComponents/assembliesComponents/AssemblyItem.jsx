import ActionsDropdown from "../ActionsDropdown";

const AssemblyItem = ({ assembly, actions, showDetailsHandler }) => {
  return (
    <>
      <div
        onClick={() => showDetailsHandler(assembly)}
        v-for="(contact, key) in contacts"
        className="hover:bg-gray-200 cursor-pointer bg-white shadow flex p-5 items-center mb-5 rounded-lg"
      >
        <div className="w-1/2">
          <div className="flex items-center">
            <div className="ml-4">
              <span className="block text-gray-800">{assembly.title}</span>
            </div>
          </div>
        </div>

        <div className="w-1/4">
          <span className="capitalize text-gray-600 text-sm">
            {assembly.description}
          </span>
        </div>

        <div className="w-1/4">
          <span className="capitalize text-gray-600 text-sm">
            {assembly.quorumRequired}
          </span>
        </div>

        <div className="w-1/4">
          <span className="capitalize text-gray-600 text-sm">
            {assembly.status}
          </span>
        </div>

        <div className="w-1/4">
          <span className="text-gray-600 text-sm">
            <ActionsDropdown actions={actions} event={assembly} />
          </span>
        </div>
      </div>
    </>
  );
};

export default AssemblyItem;
