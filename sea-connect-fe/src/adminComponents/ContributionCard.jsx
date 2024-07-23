import { format } from "date-fns";

const ContributionCard = ({ data, isMyContributions = false }) => {
  const formattedContributionDate = format(
    new Date(data.contributionDate),
    "MMMM dd, yyyy"
  );

  return (
    <div className="w-full mt-2 max-w-md bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl mx-auto">
      <div className="p-6">
        {isMyContributions ? null : (
          <h2 className="text-xl font-semibold text-gray-800">
            {data.userEmail}
          </h2>
        )}
        <p className="mt-2 text-gray-600">Contribution Details</p>
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-600">Contribution Type</p>
          <p className="text-base font-semibold text-gray-800">
            {data.contributionType}
          </p>
        </div>

        <div className="mt-4">
          <p className="text-sm font-medium text-gray-600">Contribution Date</p>
          <p className="text-base font-semibold text-gray-800">
            {formattedContributionDate}
          </p>
        </div>

        <div className="mt-4">
          <p className="text-sm font-medium text-gray-600">Amount</p>
          <p className="text-base font-semibold text-gray-800">{data.amount}</p>
        </div>
      </div>
    </div>
  );
};

export default ContributionCard;
