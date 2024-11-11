import SubscriptionCard from "@/app/aceternity/SubscriptionCard";

export const Subscriptions = () => {
  return (
    <div className=" flex flex-col justify-center items-center mt-10 mb-10">
      <h1 className="text-xl sm:text-4xl md:text-6xl font-bold font-faculty text-center mb-8">
        Subscriptions
      </h1>

      <SubscriptionCard />
    </div>
  );
};
