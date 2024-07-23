import { useContext, useState, useEffect } from "react";
import Button from "./Button";
import Dropdown from "./Dropdown";
import Input from "./Input";
import { UserContext } from "../Context/UserContext";
import { toast } from "react-toastify";

const options = ["Admin", "User", "President", "Secretary", "Treasurer"];

const MembersForm = ({ onClose, isEditing, userData, getAllMembers }) => {
  const { user } = useContext(UserContext);
  const [email, setEmail] = useState(userData ? userData.email : "");
  const [password, setPassword] = useState(userData ? userData.password : "");
  const [firstName, setFirstName] = useState(
    userData ? userData.firstName : ""
  );
  const [lastName, setLastName] = useState(userData ? userData.lastName : "");
  const [role, setRole] = useState(userData ? userData.role : options[0]);

  useEffect(() => {
    console.log("Current role:", role); //log the role whenever it changes
  }, [role]);

  const submitHandler = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", user.token);
    myHeaders.append("Content-Type", "application/json");

    console.log("Role before submission:", role); //log the role right before submission

    const userFormData = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      role: role,
    };

    console.log("Sending user data:", userFormData);

    const raw = JSON.stringify(userFormData);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://185.216.27.140:3002/api/member/add", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("Server response:", result);
        if (result.success) {
          toast.success(result.message);
          getAllMembers();
          onClose();
          return;
        }
        toast.error(result.message);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error(error.toString());
      });
  };

  const editSubmitHandler = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", user.token);
    myHeaders.append("Content-Type", "application/json");

    console.log("Role before edit submission:", role);

    const updateFields = {
      firstName: firstName,
      lastName: lastName,
      role: role,
    };

    if (password && password !== userData.password) {
      updateFields.password = password;
    }

    const raw = JSON.stringify({
      memberEmail: email,
      updateFields: updateFields,
    });

    console.log("Sending edit data:", raw);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://185.216.27.140:3002/api/member/update", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("Server response for edit:", result);
        if (result.success) {
          toast.success(result.message);
          getAllMembers();
          onClose();
          return;
        }
        toast.error(result.message);
      })
      .catch((error) => {
        console.error("Error during edit:", error);
        toast.error(error.toString());
      });
  };

  return (
    <div className="fixed z-20 inset-0 bg-white">
      <div className="flex justify-center h-screen items-center ">
        <div className="w-full max-w-xs ">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="bg-white shadow-md rounded  px-4 py-4 pb-4 mb-4 form border "
          >
            <div className="mb-6">
              <h1 className="text-center text-2xl ">
                {isEditing ? "Edit Member" : "Create Member"}
              </h1>
            </div>
            {isEditing ? null : (
              <Input
                label={"Email"}
                name={"email"}
                type={"email"}
                id={"email"}
                placeholder={"Email"}
                value={email}
                setValue={setEmail}
              />
            )}

            {isEditing ? null : (
              <Input
                label={"Password"}
                name={"password"}
                type={"password"}
                id={"password"}
                placeholder={"Password"}
                value={password}
                setValue={setPassword}
              />
            )}

            <Input
              label={"First Name"}
              name={"firstName"}
              type={"text"}
              id={"firstName"}
              placeholder={"User First Name"}
              value={firstName}
              setValue={setFirstName}
            />

            <Input
              label={"Last Name"}
              name={"lastName"}
              type={"text"}
              id={"lastName"}
              placeholder={"User Last Name"}
              value={lastName}
              setValue={setLastName}
            />
            <Dropdown
              value={role}
              setValue={(newRole) => {
                console.log("Role changed to:", newRole);
                setRole(newRole);
              }}
              options={options}
              label={"Select Role"}
            />
            <div className="my-6 flex items-center justify-between">
              <Button
                onClick={onClose}
                className={
                  "rounded-lg  px-4 py-2 border-2 border-red-600 text-red-800 hover:bg-red-600 hover:text-red-100 duration-300"
                }
              >
                Close
              </Button>
              <Button
                onClick={isEditing ? editSubmitHandler : submitHandler}
                className={
                  "rounded-lg px-4 py-2 border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-green-100 duration-300"
                }
              >
                {isEditing ? "Edit Member" : "Create Member"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MembersForm;