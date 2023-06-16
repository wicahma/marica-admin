import { PaperClipIcon } from "@heroicons/react/24/solid";
import { Button, Typography } from "@material-tailwind/react";
import React from "react";

const Payment = ({ data: { _id, event, data, createdAt } }) => {
  const className = "border-b border-blue-gray-50 py-3 px-2 text-left",
    newDate = (date) => new Date(date).toString().split("GMT")[0];
    
  return (
    <tr key={_id}>
      <td className={`${className} pl-5 uppercase break-all`}>
        <Typography variant="small" className="font-medium max-w-fit ">
          {_id}
        </Typography>
      </td>
      <td className={`${className}`}>
        <div className="flex items-center justify-center">
          <Typography variant="small">{event}</Typography>
        </div>
      </td>
      <td className={`${className}`}>
        <div className="flex items-center justify-center">
          <Button className="aspect-square p-1">
            <PaperClipIcon className="h-5" />
          </Button>
        </div>
      </td>
      <td className={`${className}`}>
        <div className="flex items-center justify-center">
          <Typography variant="small">{newDate(createdAt)}</Typography>
        </div>
      </td>
      <td className={`${className}`}>
        <div className="flex items-center justify-end">
          <Button disabled>Not Active</Button>
        </div>
      </td>
    </tr>
  );
};

export default Payment;
