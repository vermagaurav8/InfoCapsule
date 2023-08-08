import React from "react";

const Loader = ({msg}) => {
  return (
    <div >
      <div className="flex flex-col gap-2 text-xl justify-center items-center h-3/4">
      <div
        class="animate-spin w-8 h-8 border-[4px] border-current border-t-transparent rounded-full"
        role="status"
        aria-label="loading"
      >
        <span class="sr-only">Loading...</span>
      </div>
      {msg}
    </div>
    </div>
  );
};

export default Loader;