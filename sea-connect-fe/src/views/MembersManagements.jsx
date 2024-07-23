import { useContext, useEffect, useState } from "react";
import MembersForm from "../adminComponents/MembersForm";
import { toast } from "react-toastify";
import { UserContext } from "../Context/UserContext";
import MembersList from "../adminComponents/MembersList";
import Loader from "../adminComponents/Loader";

const MembersManagements = () => {
  const { user } = useContext(UserContext);
  const [members, setMembers] = useState([]);
  const [showAddMembersForm, setShowAddMembersForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const createCustomer = () => {
      if (user.user.stripeId) return;

      const myHeaders = new Headers();
      myHeaders.append("authorization", user.token);
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        name: `${user.user.firstName}`,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://185.216.27.140:3002/api/stripe/create-customer", requestOptions)
        .then((response) => {
          return;
        })
        .catch((error) => console.error(error));
    };
    createCustomer();
  }, [user]);

  const showFormHandler = () => {
    setShowAddMembersForm(true);
  };

  const getAllMembers = () => {
    const myHeaders = new Headers();
    myHeaders.append("authorization", user.token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://185.216.27.140:3002/api/member/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setMembers(result.data);
        }
      })
      .catch((error) => toast.error("Unable to get members"));
  };

  useEffect(() => {
    getAllMembers();
  }, []);

  const filteredMembers = members.filter((member) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      member.email.toLowerCase().includes(searchLower) ||
      member.firstName.toLowerCase().includes(searchLower) ||
      member.lastName.toLowerCase().includes(searchLower)
    );
  });

  if (!members.length)
    return (
      <section className="w-[80%] ml-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Members Management</h2>
          <button
            onClick={showFormHandler}
            className="rounded-lg px-4 py-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-gray-100 transition duration-300"
          >
            Add Members
          </button>
        </div>
        <h2 className="text-center text-gray-600">NO Members Added YET</h2>
        {showAddMembersForm && (
          <MembersForm
            getAllMembers={getAllMembers}
            onClose={() => setShowAddMembersForm(false)}
          />
        )}
      </section>
    );

  return (
    <section className="w-[80%] ml-auto p-6">
      {user ? (
        <>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Members Management</h2>
            <button
              onClick={showFormHandler}
              className="rounded-lg px-4 py-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-gray-100 transition duration-300"
            >
              Add Members
            </button>
          </div>
          <div className="mb-4 flex">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-1/4 p-2 border-2 border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <MembersList
              members={filteredMembers}
              user={user}
              getAllMembers={getAllMembers}
            />
          </div>
          {showAddMembersForm && (
            <MembersForm
              getAllMembers={getAllMembers}
              onClose={() => setShowAddMembersForm(false)}
            />
          )}
        </>
      ) : (
        <h2 className="text-center text-gray-600">No User</h2>
      )}
    </section>
  );
};

export default MembersManagements;
