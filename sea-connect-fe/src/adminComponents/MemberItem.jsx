import { toast } from "react-toastify";
import Actions from "./Actions";
import MemberDetailsModal from "./MemberDetailsModal";
import { useState } from "react";

const MemberItem = ({
  member,
  user,
  showEditForm,
  showEditEmailForm,
  showPhoneForm,
  showMemberShipDetails,
  showContributionDetails,
  getAllMembers,
}) => {
  const [showMemberDetails, setShowMemberDetails] = useState(false);
  const handleDelete = (email) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", user.token);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: email,
    });

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3002/api/member/delete", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          toast.success(result.message);
          getAllMembers();
          return;
        }
        toast.error(result.message);
      })
      .catch((error) => toast.error(error));
  };

  return (
    <>
      <div
        onClick={() => setShowMemberDetails(true)}
        v-for="(contact, key) in contacts"
        className="hover:bg-gray-200 cursor-pointer bg-white shadow flex p-5 items-center mb-5 rounded-lg"
      >
        <div className="w-1/2">
          <div className="flex items-center">
            <div className="ml-4">
              <span className="block text-gray-800">{member.email}</span>
              {/* <span className="text-sm block text-gray-600"> contact.email</span> */}
            </div>
          </div>
        </div>
        <div className="w-1/4">
          <span className="capitalize text-gray-600 text-sm">
            {member.firstName}
          </span>
        </div>
        <div className="w-1/4">
          <span className="text-gray-600 text-sm">{member.lastName} </span>
        </div>
        <div className="w-1/4">
          <span className="text-gray-600 text-sm">
            <Actions
              deleteUser={() => handleDelete(member.email)}
              showEditForm={() => showEditForm(member)}
              showUpdateEmail={() => showEditEmailForm(member)}
              showAddNumber={() => showPhoneForm(member)}
              showMemberShip={() => showMemberShipDetails(member)}
              showContribution={() => showContributionDetails(member)}
            />
          </span>
        </div>
      </div>
      {showMemberDetails && (
        <MemberDetailsModal
          member={member}
          onClose={() => setShowMemberDetails(false)}
        />
      )}
    </>
  );
};

export default MemberItem;
