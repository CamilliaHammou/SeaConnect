import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { toast } from "react-toastify";
import Input from "../Input";
import Button from "../Button";
import Dropdown from "../Dropdown";

const options = ["Active", "Inactive"];
const membershipOptions = ["monthly", "annual", "lifetime"];

const PlansForm = ({ isEditing, plan, getAllPlans, onClose }) => {
  const { user } = useContext(UserContext);
  const [membershipType, setMembershipType] = useState(
    plan ? plan.membershipType : membershipOptions[0]
  );
  const [description, setDescription] = useState(
    plan ? (plan.description ? plan.description : "") : ""
  );
  const [status, setStatus] = useState(plan ? plan.status : "");
  const [amount, setAmount] = useState(plan ? plan.amount : 0);

  const editSubmitHandler = () => {
    const formData = {
      membershipType: membershipType,
      description: description,
      amount: Number(amount),
      status: status,
    };
    const myHeaders = new Headers();
    myHeaders.append("authorization", user.token);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(formData);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `http://localhost:3002/api/plans/update-plan/${plan.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          toast.success("Plan Updated Successfully");
          getAllPlans();
          onClose();
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error);
      });
  };

  // Create plan
  const submitHandler = () => {
    const formData = {
      membershipType: membershipType,
      description: description,
      amount: Number(amount),
      // organizerEmail: user.user.email,
      // organizerId: user.user.id,
    };

    const myHeaders = new Headers();
    myHeaders.append("authorization", user.token);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(formData);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3002/api/plans/create-plan", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          toast.success("Plan Created Successfully");
          getAllPlans();
          onClose();
        }
      })
      .catch((error) => {
        toast.error(error);
        console.log(error);
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
                {isEditing ? "Edit Plan" : "Create Plan"}
              </h1>
            </div>
            <Dropdown
              value={membershipType}
              setValue={setMembershipType}
              options={membershipOptions}
              label={"Select Membership"}
            />
            {/* <Input
              label={"Membership Type"}
              name={"membershipType"}
              type={"text"}
              id={"membershipType"}
              placeholder={"Title"}
              value={membershipType}
              setValue={setMembershipType}
            /> */}

            <Input
              label={"Description"}
              name={"description"}
              type={"text"}
              id={"description"}
              placeholder={"Description"}
              value={description}
              setValue={setDescription}
            />

            <Input
              label={"Amount"}
              name={"amount"}
              type={"number"}
              id={"amount"}
              placeholder={"Amount"}
              value={amount}
              setValue={setAmount}
            />

            {isEditing ? (
              <Dropdown
                value={status}
                setValue={setStatus}
                options={options}
                label={"Select Status"}
              />
            ) : null}

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
                {isEditing ? "Edit Plan" : "Create Plan"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlansForm;
