import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import MembershipCard from "../components/MembershipCard";
import { UserContext } from "../Context/UserContext";
import Loader from "../adminComponents/Loader";
import PaymentModal from "../components/PaymentModal";
import axios from "axios";
import { toast } from "react-toastify";

const MembershipPlans = () => {
  const { user } = useContext(UserContext);
  const [plans, setPlans] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [plan, setPlan] = useState(false);

  useEffect(() => {
    if (!user) return;
    const myHeaders = new Headers();
    myHeaders.append("authorization", user.token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://185.216.27.140:3002/api/plans/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setPlans(result.data);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  if (!user) {
    return (
      <>
        <Header />
        <div className=" mx-auto max-w-[1200px]">
          <div className="bg-indigo-500 my-6 text-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-4">No User Found</h2>
            <p className="text-lg">Log Into Your Account</p>
          </div>
        </div>
      </>
    );
  }

  const renderPlans = plans?.map((plan) => (
    <MembershipCard
      plan={plan}
      key={plan.id}
      onSelect={(plan) => {
        setShowPaymentModal(true);
        setPlan(plan);
      }}
    />
  ));

  const onSuccess = async (user) => {
    try {
      console.log(plan.id);
      console.log(plan.membershipType);

      const data = JSON.stringify({
        membershipPlanId: plan.id,
        membershipType: plan.membershipType,
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://185.216.27.140:3002/api/membership/create-membership",
        headers: {
          authorization: user.token,
          "Content-Type": "application/json",
        },
        data,
      };

      const response = await axios.request(config);
      console.log(response.data);
      if (response.data.success) {
        toast.success("Membership was successful");
        setShowPaymentModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold my-4">Membership Plans</h2>
        <p className="text-gray-600">
          Choose a membership plan that suits your needs and enjoy premium
          benefits.
        </p>
      </div>
      {plans.length ? (
        <main className="max-w-6xl mx-auto pt-10 pb-36 px-8">
          <div className="grid grid-cols-3 gap-2 justify-between items-center ">
            {renderPlans}
          </div>
        </main>
      ) : (
        <Loader />
      )}
      {showPaymentModal && (
        <PaymentModal
          amount={plan.amount}
          type={`Membership/${plan.membershipType}`}
          onSuccess={onSuccess}
          onClose={() => setShowPaymentModal(false)}
        />
      )}
    </>
  );
};

export default MembershipPlans;
