"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/context/AuthContext";
import { CustomBtn } from "@/app/aceternity/button";

const SubscriptionCard = () => {
  const {
    userDetails,
    isSubscribed,
    upgradeToPro,
    subscriptionPlans,
    fetchSubscriptionPlans,
    subscriptionPlansLoading,
  } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (subscriptionPlans.length === 0 && !subscriptionPlansLoading) {
      fetchSubscriptionPlans(); // Fetch subscription plans when no plans are available
    }
  }, [subscriptionPlans, subscriptionPlansLoading, fetchSubscriptionPlans]);

  const handleUpgradeClick = (planId) => {
    const isLoggedIn = !!localStorage.getItem("token");
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      upgradeToPro(planId);
    }
  };

  const handleStartFreeClick = () => {
    const isLoggedIn = !!localStorage.getItem("token");
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      router.push("/dashboard");
    }
  };

  if (subscriptionPlansLoading) {
    return <div>Loading subscription plans...</div>;
  }

  if (subscriptionPlans.length === 0) {
    return <div>No subscription plans available.</div>;
  }



  return (
    <div className="bg-white shadow-xl rounded-lg p-8 font-faculty">
      <h3 className="text-3xl font-semibold text-gray-900 text-center">
        Choose Your Plan
      </h3>
      <p className="mt-4 text-lg text-gray-500 text-center">
        Select the plan that suits you best. Enjoy powerful features and
        exclusive templates with Pro.
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {subscriptionPlans.map((plan) => (
          <div
            key={plan._id}
            className={`rounded-lg p-6 text-center border ${
              plan.name === "Pro Plan"
                ? "bg-indigo-600 text-white border-indigo-400"
                : "bg-gray-100 text-gray-900 border-gray-200"
            } flex flex-col justify-between`}
          >
            <h4 className="text-2xl font-semibold">{plan.name}</h4>
            <p className="mt-4 text-4xl font-bold">
              {plan.price ? `$${plan.price}` : "$0"}
              <span className="text-sm font-normal">
                /
                {plan.billingCycle === "M"
                  ? "M"
                  : plan.billingCycle === "Y"
                  ? "Y"
                  : ""}
              </span>
            </p>
            <ul className="mt-6 text-left flex-grow">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <span
                    className={
                      feature.available ? "text-green-500" : "text-red-500"
                    }
                  >
                    {feature.available ? "✔" : "✘"}
                  </span>
                  <span>{feature.name}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 mb-4">
              {plan.name === "Free Plan" ? (
                userDetails && userDetails.isSubscribed ? (
                  // Disable the button when the user is logged in and subscribed
                  <CustomBtn color="gray" disabled>
                    Start for Free
                  </CustomBtn>
                ) : (
                  // Enable the button when the user is not logged in or not subscribed
                  <CustomBtn onClick={handleStartFreeClick}>
                    Start for Free
                  </CustomBtn>
                )
              ) : !userDetails.isSubscribed ? (
                <CustomBtn
                  onClick={() => handleUpgradeClick(plan._id)}
                  color="indigo"
                >
                  Upgrade Now
                </CustomBtn>
              ) : (
                <div className="text-green-500 font-bold">
                  You are already a Pro member!
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionCard;
