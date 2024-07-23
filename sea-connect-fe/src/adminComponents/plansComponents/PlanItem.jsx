import ActionsDropdown from "../ActionsDropdown";

const PlanItem = ({ plan, actions }) => {
  return (
    <>
      <div
        v-for="(contact, key) in contacts"
        className="hover:bg-gray-200 cursor-pointer bg-white shadow flex p-5 items-center mb-5 rounded-lg"
      >
        <div className="w-1/2">
          <div className="flex items-center">
            <div className="ml-4">
              <span className="block text-gray-800">{plan.membershipType}</span>
            </div>
          </div>
        </div>
        <div className="w-1/4">
          <span className="capitalize text-gray-600 text-sm">
            ${plan.amount}
          </span>
        </div>

        <div className="w-1/4">
          <span className="capitalize text-gray-600 text-sm">
            {plan.description}
          </span>
        </div>

        <div className="w-1/4">
          <span className="capitalize text-gray-600 text-sm">
            {plan.status}
          </span>
        </div>

        <div className="w-1/4">
          <span className="text-gray-600 text-sm">
            <ActionsDropdown actions={actions} event={plan} />
          </span>
        </div>
      </div>
    </>
  );
};

export default PlanItem;
