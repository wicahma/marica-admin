import {
  HandThumbDownIcon,
  HandThumbUpIcon,
  PencilIcon,
  TrashIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/solid";
import { Button, Switch, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import Tooltips from "../micros/tooltips";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { setSelectedData } from "@/store/slices/table";
import { useDispatch, useSelector } from "react-redux";
import { updateVideo } from "@/context/table";

const Video = ({
  data: { _id, videoURL, thumbnail, type, like, dislike, title, description },
  selectedData = () => {},
}) => {
  const className = "border-b border-blue-gray-50 py-3 px-2 text-left",
    dispatch = useDispatch();

  return (
    <tr key={_id}>
      <td className={`${className} pl-5 uppercase`}>
        <Typography variant="small" className="font-medium">
          {_id}
        </Typography>
      </td>
      <td className={`${className}`}>
        <div className="flex items-center justify-center">
          <Typography variant="small">{title}</Typography>
        </div>
      </td>
      <td className={`${className} max-w-[100px]`}>
        <div className="flex items-center justify-center">
          <Typography variant="small" className="break-all">
            {description.slice(0, 100)}
          </Typography>
        </div>
      </td>
      <td className={`${className}`}>
        <div className="flex min-w-max items-center justify-center gap-3">
          <Tooltips message={`${videoURL} | Buka di Youtube`}>
            <a
              href={videoURL}
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
            <Button
              onClick={() =>
                dispatch(
                  setSelectedData({
                    type: "video",
                    data: {
                      _id,
                      thumbnail,
                      videoURL,
                      title,
                      description,
                      type,
                      fetchType: "update-image",
                    },
                  })
                )
              }
              className="rounded-full p-2"
              color="light-green"
            >
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
        <div className="flex justify-center gap-3">
          <div className="flex items-center gap-3 rounded-xl border-2 border-red-100 px-3 text-red-400">
            <HandThumbUpIcon className="h-5" /> {like}
          </div>
          <div className="flex items-center gap-3 rounded-xl border-2 border-gray-100 px-3 text-gray-400">
            <HandThumbDownIcon className="h-5" /> {dislike}
          </div>
        </div>
      </td>
      <td>
        <div className="mx-auto flex w-fit gap-3 px-2">
          <Tooltips message={"Edit data"}>
            <Button
              id={`edit-${_id}`}
              className="p-1 text-white"
              variant="gradient"
              color="orange"
              onClick={() =>
                dispatch(
                  setSelectedData({
                    type: "video",
                    data: {
                      _id,
                      videoURL,
                      thumbnail,
                      title,
                      description,
                      type,
                      like,
                      dislike,
                      fetchType: "update",
                    },
                  })
                )
              }
            >
              <PencilIcon className="aspect-square h-5" />
            </Button>
          </Tooltips>
          <Tooltips message={"Delete data"}>
            <Button
              id={`delete-${_id}`}
              onClick={() =>
                selectedData(
                  {
                    _id,
                    videoURL,
                    thumbnail,
                    type,
                    like,
                    dislike,
                  },
                  "delete"
                )
              }
              className="p-1 text-white"
              variant="gradient"
              color="red"
            >
              <TrashIcon className="aspect-square h-5" />
            </Button>
          </Tooltips>
        </div>
      </td>
    </tr>
  );
};

export default Video;
