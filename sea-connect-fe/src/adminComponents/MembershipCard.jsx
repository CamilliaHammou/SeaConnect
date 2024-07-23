import { format } from "date-fns";

const MembershipCard = ({ data }) => {
  const formattedStartDate = format(new Date(data.startDate), "MMMM dd, yyyy");
  const formattedEndDate = format(new Date(data.endDate), "MMMM dd, yyyy");

  const membershipStatus = data.isActive ? "Active" : "Inactive";
  const statusColor = data.isActive ? "text-green-600" : "text-red-600";

  return (
    <div className="w-full mt-2 max-w-md bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl mx-auto">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {data.userEmail}
        </h2>
        <p className="mt-2 text-gray-600">Membership Details</p>

        <div className="mt-4">
          <p className="text-sm font-medium text-gray-600">Membership Type</p>
          <p className="text-base font-semibold text-gray-800">
            {data.membershipType}
          </p>
        </div>

        <div className="mt-4">
          <p className="text-sm font-medium text-gray-600">Start Date</p>
          <p className="text-base font-semibold text-gray-800">
            {formattedStartDate}
          </p>
        </div>

        <div className="mt-4">
          <p className="text-sm font-medium text-gray-600">End Date</p>
          <p className="text-base font-semibold text-gray-800">
            {formattedEndDate}
          </p>
        </div>

        {/* <div className="mt-4">
          <p className="text-sm font-medium text-gray-600">Status</p>
          <p className={`text-base font-semibold ${statusColor}`}>
            {membershipStatus}
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default MembershipCard;
