import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { Button, Chip, Switch, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import Tooltips from "../micros/tooltips";

const User = ({
  data: {
    _id,
    nama,
    userType,
    email,
    imageID,
    essentials,
    validated,
    createdAt,
    updatedAt,
    __v,
  },
  essential,
  handleOpen,
}) => {
  const className = "border-b border-blue-gray-50 py-3 px-2 text-left",
    [isValidated, setValidated] = useState(validated),
    newDate = (date) => new Date(date).toString().split("GMT")[0];
  return (
    <tr key={_id}>
      <td className={`${className} pl-5 uppercase`}>
        <Typography variant="small" className="font-medium">
          {_id}
        </Typography>
      </td>
      <td className={`${className}`}>
        <div className="flex min-w-max">
          <Typography variant="small">{nama}</Typography>
        </div>
      </td>
      <td className={`${className}`}>
        <Chip
          value={userType}
          color={userType === "admin" ? "red" : "teal"}
          size="sm"
          className="mx-auto w-fit text-xs"
        />
      </td>
      <td className={`${className}`}>
        <Typography variant="small">{email}</Typography>
      </td>
      <td className={`${className}`}>
        <Typography variant="small">{imageID}</Typography>
      </td>
      <td className={`${className}`}>
        <div className="flex justify-center">
          <Tooltips message={"Lihat data inti"}>
            <Button
              onClick={() => {
                handleOpen();
                essential(essentials);
              }}
              className="aspect-square p-2"
            >
              <PencilSquareIcon className="h-4 text-white" />
            </Button>
          </Tooltips>
        </div>
      </td>
      <td className={`${className}`}>
        <div className="flex justify-center">
          <Switch
            checked={isValidated}
            id={`switch-${_id}`}
            label={isValidated ? "Ya" : "Tidak"}
            color="green"
            labelProps={{
              className: "text-blue-gray-400 text-sm",
            }}
            onChange={() => setValidated(!isValidated)}
          />
        </div>
      </td>
      <td className={`${className} min-w-[200px]`}>
        <Typography id={`waktu-dibuat-${_id}`} variant="small">
          {newDate(createdAt)}
        </Typography>
      </td>
      <td className={`${className} min-w-[200px]`}>
        <Typography id={`waktu-diupdate-${_id}`} variant="small">
          {newDate(updatedAt)}
        </Typography>
      </td>
      <td className={`${className}`}>
        <Typography variant="small">{__v}</Typography>
      </td>
    </tr>
  );
};

export default User;
