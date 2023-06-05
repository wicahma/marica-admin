import React from "react";
import { Spinner } from "@material-tailwind/react";

const Loading = ({ isLoading = false }) => {
  return (
    <div className={`${isLoading ? "flex": "hidden"} fixed top-0 left-0 z-[80] h-full w-full items-center justify-center bg-black/50`}>
      <div className="rounded-xl bg-black/10 p-3 backdrop-blur-md">
        <Spinner color="light-blue" className="w-6 h-6" />
      </div>
    </div>
  );
};

export default Loading;
