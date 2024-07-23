import { toast } from "react-toastify";
import Button from "../Button";
import Input from "../Input";
import { UserContext } from "../../Context/UserContext";
import { useContext, useState } from "react";

const UpdatePhoneNumberForm = ({
  userEmail,
  userPhone,
  onClose,
  getAllMembers,
}) => {
  const { user } = useContext(UserContext);
  const [email, setEmail] = useState(userEmail);
  const [phoneNumber, setPhoneNumber] = useState(userPhone || "");

  const submitHandler = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", user.token);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      memberEmail: email,
      newPhone: `${phoneNumber}`,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://185.216.27.140:3002/api/member/update_phone", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          toast.success(result.message);
          getAllMembers();
          onClose();
          return;
        }
        toast.error(result.message);
      })
      .catch((error) => toast.error(error));
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
              <h1 className="text-center text-2xl ">Add Phone Number</h1>
            </div>
            <Input
              label={"Email"}
              name={"email"}
              type={"email"}
              id={"email"}
              placeholder={"Email"}
              value={email}
              setValue={setEmail}
            />

            <Input
              label={"Phone Number"}
              name={"phoneNumber"}
              type={"number"}
              id={"number"}
              placeholder={"User Phone Number"}
              value={phoneNumber}
              setValue={setPhoneNumber}
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
                onClick={submitHandler}
                className={
                  "rounded-lg px-4 py-2 border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-green-100 duration-300"
                }
              >
                Update Phone Number
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePhoneNumberForm;
