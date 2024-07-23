import { useState } from "react";
import MemberItem from "./MemberItem";
import UpdatePhoneNumberForm from "./forms/UpdatePhoneNumberForm";
import UpdateEmailForm from "./forms/UpdateEmailForm";
import MembersForm from "./MembersForm";
import MemberShipDetails from "./forms/MemberShipDetails";
import ContributionDetails from "./ContributionDetails";

const MembersList = ({ members, user, getAllMembers }) => {
  const [showEditMembersForm, setShowEditMembersForm] = useState(false);
  const [showEditEmailForm, setShowEditEmailForm] = useState(false);
  const [showPhoneNumberForm, setShowPhoneNumberForm] = useState(false);
  const [showMembershipDetails, setShowMembershipDetails] = useState(false);
  const [showContributionDetails, setShowContributionDetails] = useState(false);
  const [memberData, setMemberData] = useState(null);

  const showEditEmailHandler = (memberInfo) => {
    setShowEditEmailForm(true);
    setMemberData(memberInfo);
  };

  const showEditHandler = (memberInfo) => {
    setShowEditMembersForm(true);
    setMemberData(memberInfo);
  };

  const showPhoneNumberHandler = (memberInfo) => {
    setShowPhoneNumberForm(true);
    setMemberData(memberInfo);
  };

  const showMemberShipDetailsHandler = (memberInfo) => {
    setShowMembershipDetails(true);
    setMemberData(memberInfo);
  };

  const showContributionDetailsHandler = (memberInfo) => {
    setShowContributionDetails(true);
    setMemberData(memberInfo);
  };

  const renderMembers = members.map((member) => {
    return (
      <MemberItem
        getAllMembers={getAllMembers}
        member={member}
        user={user}
        key={member.id}
        showEditForm={showEditHandler}
        showEditEmailForm={showEditEmailHandler}
        showPhoneForm={showPhoneNumberHandler}
        showMemberShipDetails={showMemberShipDetailsHandler}
        showContributionDetails={showContributionDetailsHandler}
      />
    );
  });

  return (
    <>
      {" "}
      <div className="bg-gray-100 p-4">
        <div className="container mx-auto">
          <div className="py-5">
            <div className="flex items-center px-5 py-2">
              <span className="w-1/2">
                <span className="text-xs uppercase text-gray-600 font-bold">
                  Email
                </span>
              </span>
              <span className="w-1/4">
                <span className="text-xs uppercase text-gray-600 font-bold">
                  First Name
                </span>
              </span>
              <span className="w-1/4">
                <span className="text-xs uppercase text-gray-600 font-bold">
                  Last Name
                </span>
              </span>

              <span className="w-1/4">
                <span className="text-xs uppercase text-gray-600 font-bold">
                  Actions
                </span>
              </span>
            </div>

            {renderMembers}
          </div>
        </div>
      </div>
      {showEditMembersForm && (
        <MembersForm
          getAllMembers={getAllMembers}
          userData={{
            email: memberData.email,
            // password: "test123",
            firstName: memberData.firstName,
            lastName: memberData.lastName,
            role: memberData.role,
          }}
          isEditing
          onClose={() => setShowEditMembersForm(false)}
        />
      )}
      {showEditEmailForm && (
        <UpdateEmailForm
          getAllMembers={getAllMembers}
          userEmail={memberData.email}
          onClose={() => setShowEditEmailForm(false)}
        />
      )}
      {showPhoneNumberForm && (
        <UpdatePhoneNumberForm
          getAllMembers={getAllMembers}
          userPhone={memberData.phone}
          userEmail={memberData.email}
          onClose={() => setShowPhoneNumberForm(false)}
        />
      )}
      {showMembershipDetails && (
        <MemberShipDetails
          user={user}
          onClose={() => setShowMembershipDetails(false)}
          userEmail={memberData.email}
        />
      )}
      {showContributionDetails && (
        <ContributionDetails
          user={user}
          onClose={() => setShowContributionDetails(false)}
          userEmail={memberData.email}
        />
      )}
    </>
  );
};

export default MembersList;
