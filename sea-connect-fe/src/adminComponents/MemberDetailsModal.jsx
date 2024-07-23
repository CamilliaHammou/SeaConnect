import Button from "./Button";

const MemberDetailsModal = ({ member, onClose }) => {
  return (
    <>
      <div className="fixed inset-0 overflow-y-auto bg-white z-20">
        <div className="w-full max-w-lg bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl mx-auto">
          <div className="p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800">
                Member Details
              </h2>
              <Button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-sm inline-flex items-center"
                onClick={onClose}
              >
                Close
              </Button>
            </div>

            <div className="mt-4">
              <p className="text-sm font-medium text-gray-600">First Name</p>
              <p className="text-base font-semibold text-gray-800">
                {member.firstName}
              </p>
            </div>

            <div className="mt-4">
              <p className="text-sm font-medium text-gray-600">Last Name</p>
              <p className="text-base font-semibold text-gray-800">
                {" "}
                {member.lastName}
              </p>
            </div>

            <div className="mt-4">
              <p className="text-sm font-medium text-gray-600">Email</p>
              <p className="text-base font-semibold text-gray-800">
                {member.email}
              </p>
            </div>

            <div className="mt-4">
              <p className="text-sm font-medium text-gray-600">Role</p>
              <p className="text-base font-semibold text-gray-800">
                {member.role}
              </p>
            </div>

            <div className="mt-4">
              <p className="text-sm font-medium text-gray-600">
                Membership Status
              </p>
              <p className="text-base font-semibold text-red-600">
                {member.MembershipStatus}
              </p>
            </div>

            <div className="mt-4">
              <p className="text-sm font-medium text-gray-600">
                Membership Start Date
              </p>
              <p className="text-base font-semibold text-gray-800">
                {member.MembershipStartDate
                  ? member.MembershipStartDate
                  : "No Available"}
              </p>
            </div>

            <div className="mt-4">
              <p className="text-sm font-medium text-gray-600">Address</p>
              <p className="text-base font-semibold text-gray-800">
                {member.address ? member.address : "No Available"}
              </p>
            </div>

            <div className="mt-4">
              <p className="text-sm font-medium text-gray-600">Phone</p>
              <p className="text-base font-semibold text-gray-800">
                {member.phone ? member.phone : "No Available"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberDetailsModal;
