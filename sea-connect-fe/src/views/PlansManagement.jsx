import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import Loader from "../adminComponents/Loader";
import PlansList from "../adminComponents/plansComponents/PlansList";
import PlansForm from "../adminComponents/plansComponents/PlansForm";

const PlansManagement = () => {
  const { user } = useContext(UserContext);
  const [plans, setPlans] = useState([]);
  const [showPlansForm, setShowPlansForm] = useState(false);

  const getAllPlans = () => {
    const myHeaders = new Headers();
    myHeaders.append("authorization", user.token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:3002/api/plans/all-plans", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setPlans(result.data);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getAllPlans();
  }, []);

  const showFormHandler = () => {
    setShowPlansForm(true);
  };

  if (!plans.length)
    return (
      <section className="w-[80%] ml-auto ">
        <div className="p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Plans Management</h2>
          <button
            onClick={showFormHandler}
            className="rounded-lg px-4 py-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-gray-100 duration-300"
          >
            Create Plan
          </button>
        </div>
        <h2>No Plans Added Yet</h2>
        {showPlansForm && (
          <PlansForm
            getAllPlans={getAllPlans}
            onClose={() => setShowPlansForm(false)}
          />
        )}
      </section>
    );

  return (
    <section className="w-[80%] ml-auto ">
      <div className="p-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Plans Management</h2>
        <button
          onClick={showFormHandler}
          className="rounded-lg px-4 py-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-gray-100 duration-300"
        >
          Create Plan
        </button>
      </div>

      <div>
        <PlansList plans={plans} getAllPlans={getAllPlans} />
      </div>
      {showPlansForm && (
        <PlansForm
          getAllPlans={getAllPlans}
          onClose={() => setShowPlansForm(false)}
        />
      )}
    </section>
  );
};

export default PlansManagement;
