import React from "react";

function Container({ children }) {
  return (
    <div className="xl:w-[60%] lg:w-[70%] md:w-[80%] sm:w-[90%] w-[90%] md:h-[60%] min-h-[60vh] py-[3rem] bg-[#343964] rounded-xl flex flex-col gap-7 items-center justify-center px-6 ">
      {children}
    </div>
  );
}

export default Container;
