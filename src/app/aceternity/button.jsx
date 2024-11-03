const CustomBtn = ({
  children,
  onClick,
  disabled,
  textColor = "text-white", 
  bgColor = 'bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] '
}) => {
  return (
    <button
      className={`inline-flex h-12 gap-2 text-sm animate-shimmer ${textColor} items-center justify-center rounded-full border-none ${bgColor} bg-[length:200%_100%] px-4 font-medium transition-colors focus:outline-none focus:ring-0 z-10`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};


const CustomBtnWithIcon = ({
  text,
  icon,
  onClick,
  bgColor = "bg-black",
  textColor = "text-white",
}) => {
  return (
    <button
      className={`inline-flex h-12 gap-2 animate-shimmer ${bgColor} ${textColor} items-center justify-center rounded-full border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium transition-colors focus:outline-none focus:ring-0`}
      onClick={onClick}
    >
      <span aria-hidden="true">{icon}</span>{" "}
      <span className="text-sm hidden md:block">{text}</span>{" "}
    </button>
  );
};

const CustomTextWithIcon = ({ text, icon }) => {
  return (
    <span className="inline-flex items-center gap-2 mt-10">
      <span aria-hidden="true">{icon}</span>
      <span className="text-xl font-bold">{text}</span>
    </span>
  );
};


export { CustomBtn, CustomBtnWithIcon, CustomTextWithIcon };
