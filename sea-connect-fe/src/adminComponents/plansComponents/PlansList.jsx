import { useState } from "react";
import { v4 as uuid } from "uuid";
import PlanItem from "./PlanItem";
import PlansForm from "./PlansForm";

const PlansList = ({ plans, getAllPlans }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [plan, setPlan] = useState(null);

  const actions = [
    {
      id: uuid(),
      label: "Edit",
      action: (event) => {
        setPlan(event);
        setShowEditForm(true);
      },
    },
  ];
  const renderPlans = plans.map((plan) => (
    <PlanItem key={plan.id} plan={plan} actions={actions} />
  ));
  return (
    <>
      <div className="bg-gray-100 p-4">
        <div className="container mx-auto">
          <div className="py-5">
            <div className="flex items-center px-5 py-2">
              <span className="w-1/2">
                <span className="text-xs uppercase text-gray-600 font-bold">
                  Membership Type
                </span>
              </span>
              <span className="w-1/4">
                <span className="text-xs uppercase text-gray-600 font-bold">
                  Amount
                </span>
              </span>
              <span className="w-1/4">
                <span className="text-xs uppercase text-gray-600 font-bold">
                  Description
                </span>
              </span>
              <span className="w-1/4">
                <span className="text-xs uppercase text-gray-600 font-bold">
                  Status
                </span>
              </span>

              <span className="w-1/4">
                <span className="text-xs uppercase text-gray-600 font-bold">
                  Actions
                </span>
              </span>
            </div>
            {renderPlans}
          </div>
        </div>
      </div>
      {showEditForm && (
        <PlansForm
          getAllPlans={getAllPlans}
          plan={plan}
          isEditing
          onClose={() => setShowEditForm(false)}
        />
      )}
    </>
  );
};

export default PlansList;
