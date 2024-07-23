const MembershipCard = ({ plan, onSelect }) => {
  return (
    <div className="w-full flex-1 mt-8 p-6 max-w-sm bg-white shadow-lg rounded-xl transition-transform transform hover:scale-105 hover:shadow-2xl">
      <div className="flex items-center mb-6 border-b border-gray-200 pb-6">
        <img
          src="https://images.radio-canada.ca/v1/ici-premiere/16x9/premiere-plus-arthur-aventurier-tortue.jpg"
          alt="Plan Image"
          className="rounded-full w-16 h-16 object-cover"
        />
        <div className="ml-4">
          <div className="text-gray-600 text-lg">
            <span className="text-2xl font-bold text-gray-900">${plan.amount}</span>
            <span className="text-gray-500 text-sm ml-1">/{plan.membershipType}</span>
          </div>
        </div>
      </div>
      <ul className="mb-6 text-gray-600 text-base space-y-2">
        <li className="flex items-center">
          <img
            src="https://res.cloudinary.com/williamsondesign/check-grey.svg"
            alt="Check Icon"
            className="w-5 h-5"
          />
          <span className="ml-3">Join us !</span>
        </li>
      </ul>
      <button
        onClick={() => onSelect(plan)}
        className="w-full py-4 px-6 bg-indigo-600 text-white text-lg font-semibold rounded-lg transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Choose Plan
      </button>
    </div>
  );
};

export default MembershipCard;
