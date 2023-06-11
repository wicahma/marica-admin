import { Switch, Typography } from "@material-tailwind/react";
import React, { useState } from "react";

const Series = ({
  data: {
    _id,
    judul,
    deskripsi,
    thumbnail,
    active,
    dataVideo,
    createdAt,
    updatedAt,
    __v,
  },
}) => {
  const className = "border-b border-blue-gray-50 py-3 px-2 text-left",
    [isActive, setActive] = useState(active),
    newDate = (date) => new Date(date).toString().split("GMT")[0];

  return (
    <tr key={_id}>
      <td className={`${className} pl-5 uppercase`}>
        <Typography variant="small" className="font-medium">
          {_id}
        </Typography>
      </td>
      <td className={`${className}`}>
        <div className="flex items-center justify-center">
          <Typography variant="small">{judul}</Typography>
        </div>
      </td>
      <td className={`${className}`}>
        <div className="flex items-center justify-center">
          <Typography variant="small">{deskripsi}</Typography>
        </div>
      </td>
      <td className={`${className}`}>
        <div className="flex items-center justify-center">
          <Typography variant="small">{thumbnail}</Typography>
        </div>
      </td>
      <td className={`${className}`}>
        <div className="flex justify-center">
          <Switch
            checked={isActive}
            id={`switch-${_id}`}
            label={isActive ? "Ya" : "Tidak"}
            color="green"
            labelProps={{
              className: "text-blue-gray-400 text-sm",
            }}
            onChange={() => setActive(!isActive)}
          />
        </div>
      </td>
      <td className={`${className}`}>
        <div className="flex items-center justify-center">
          <Typography variant="small">{dataVideo.length}</Typography>
        </div>
      </td>
      <td className={`${className}`}>
        <div className="flex items-center justify-center">
          <Typography variant="small">{newDate(createdAt)}</Typography>
        </div>
      </td>
      <td className={`${className}`}>
        <div className="flex items-center justify-center">
          <Typography variant="small">{newDate(updatedAt)}</Typography>
        </div>
      </td>
      <td className={`${className}`}>
        <div className="flex items-center justify-center">
          <Typography variant="small">{__v}</Typography>
        </div>
      </td>
    </tr>
  );
};

export default Series;
