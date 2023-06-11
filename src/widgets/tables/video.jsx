import {
  HandThumbDownIcon,
  HandThumbUpIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/solid";
import { Button, Switch, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import Tooltips from "../micros/tooltips";
import { Link } from "react-router-dom";
import { PhotoIcon } from "@heroicons/react/24/outline";

const Video = ({
  data: { _id, videoURL, thumbnail, type, active, like, dislike },
}) => {
  const className = "border-b border-blue-gray-50 py-3 px-2 text-left",
    [isActive, setActive] = useState(active);

  return (
    <tr key={_id}>
      <td className={`${className} pl-5 uppercase`}>
        <Typography variant="small" className="font-medium">
          {_id}
        </Typography>
      </td>
      <td className={`${className}`}>
        <div className="flex min-w-max items-center justify-center gap-3">
          <Tooltips message={`${videoURL} | Buka di Youtube`}>
            <a
              href={"https://www.youtube.com/watch?v=hbpdAhTgrf8"}
              target="_blank"
              className="rounded-full bg-blue-500 p-2 text-white"
            >
              <VideoCameraIcon className="aspect-square h-4" />
            </a>
          </Tooltips>
        </div>
      </td>
      <td className={`${className}`}>
        <div className="flex items-center justify-center gap-3">
          <Tooltips message={`${thumbnail} | Lihat Thumbnail`}>
            <Button className="rounded-full p-2" color="light-green">
              <PhotoIcon className="aspect-square h-4" />
            </Button>
          </Tooltips>
        </div>
      </td>
      <td className={`${className}`}>
        <div className="flex items-center justify-center">
          <Typography variant="small">
            {"free".includes(type) ? "Free" : "Paid"}
          </Typography>
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
        <div className="flex justify-center gap-3">
          <div className="flex items-center gap-3 rounded-xl border-2 border-red-100 px-3 text-red-400">
            <HandThumbUpIcon className="h-5" /> {like}
          </div>
          <div className="flex items-center gap-3 rounded-xl border-2 border-gray-100 px-3 text-gray-400">
            <HandThumbDownIcon className="h-5" /> {dislike}
          </div>
        </div>
      </td>
    </tr>
  );
};

export default Video;
