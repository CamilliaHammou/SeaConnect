import ActionsDropdown from "../ActionsDropdown";

const VotesItem = ({ actions, showDetailsHandler, vote }) => {
  return (
    <>
      <div
        onClick={() => showDetailsHandler(vote)}
        v-for="(contact, key) in contacts"
        className="hover:bg-gray-200 cursor-pointer bg-white shadow flex p-5 items-center mb-5 rounded-lg"
      >
        <div className="w-1/2">
          <div className="flex items-center">
            <div className="ml-4">
              <span className="block text-gray-800">{vote.title}</span>
              {/* <span className="text-sm block text-gray-600"> contact.email</span> */}
            </div>
          </div>
        </div>
        <div className="w-1/4">
          <span className="capitalize text-gray-600 text-sm">
            {vote.rounds.length}
          </span>
        </div>
        <div className="w-1/4">
          <span className="text-gray-600 text-sm">
            {/* {format(vote.rounds.StartDate, "yyyy-MM-dd")} */}
          </span>
        </div>
        <div className="w-1/4">
          <span className="text-gray-600 text-sm">
            <ActionsDropdown actions={actions} event={vote} />
          </span>
        </div>
      </div>
    </>
  );
};

export default VotesItem;
