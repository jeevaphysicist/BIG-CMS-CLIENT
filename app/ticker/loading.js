import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center gap-3 flex-col justify-center w-[100%] h-screen lg:h-[calc(100vh-20px)]">
      <span className="font-bold text-[#0A1215] text-[18px] animate-pulse uppercase">
        Honeycomb
      </span>
      <span class="loader"></span>
    </div>
  );
};

export default Loading;
