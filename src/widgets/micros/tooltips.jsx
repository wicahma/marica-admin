import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { Tooltip } from "@material-tailwind/react";
import React from "react";

const Tooltips = ({
  children,
  className = "bg-white text-blue-gray-400",
  message,
  enable = true,
}) => {
  return (
    <Tooltip
      content={
        <div className={`${enable ? "flex" : "hidden"} gap-3`}>
          <InformationCircleIcon className="aspect-square w-5" />
          <p>{message}</p>
        </div>
      }
      className={`shadow-xl ${className}`}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0, y: 25 },
      }}
    >
      {children}
    </Tooltip>
  );
};

export default Tooltips;
