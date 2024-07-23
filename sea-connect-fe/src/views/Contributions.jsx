import { useContext, useState } from "react";
import ContributionForm from "../components/ContributionForm";
import Header from "../components/Header";
import PaymentModal from "../components/PaymentModal";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../Context/UserContext";

const Contributions = () => {
  const { user } = useContext(UserContext);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const options = ["donation", "volunteer"];
  const [contributionType, setContributionType] = useState(options[0]);
  const [amount, setAmount] = useState(0);

  const onSuccess = async (user) => {
    try {
      const data = JSON.stringify({
        contributionType: contributionType.toLowerCase(),
        amount: Number(amount),
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:3002/api/contribution/create-contribution",
        headers: {
          authorization: user.token,
          "Content-Type": "application/json",
        },
        data,
      };

      const response = await axios.request(config);
      console.log(response.data);
      if (response.data.success) {
        toast.success("Your Payment was successful");
        setShowPaymentModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return (
      <>
        <Header />
        <div className=" mx-auto max-w-[1200px]">
          <div className="bg-green-500 my-6 text-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-4">No User Found</h2>
            <p className="text-lg">Log Into Your Account</p>
          </div>
        </div>
      </>
    );
  }

  const showForm = () => {
    if (amount < 1) {
      toast.error("Min amount must be 1");
      return;
    }
    setShowPaymentModal(true);
  };

  return (
    <>
      <Header />
      <div className="max-w-[1200px] mx-auto">
        <ContributionForm
          contributionType={contributionType}
          setContributionType={setContributionType}
          showForm={showForm}
          options={options}
          amount={amount}
          setAmount={setAmount}
        />
        {showPaymentModal && (
          <PaymentModal
            amount={amount}
            type={contributionType}
            onSuccess={onSuccess}
            onClose={() => setShowPaymentModal(false)}
          />
        )}
      </div>
    </>
  );
};

export default Contributions;
