import { PencilIcon, PhotoIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Button, Switch, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import Tooltips from "../micros/tooltips";
import { setSelectedData } from "@/store/slices/table";
import { useDispatch, useSelector } from "react-redux";
import { activateSeries, submitHandler } from "@/context/table";

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
  selectedData = () => {},
}) => {
  const className = "border-b border-blue-gray-50 py-3 px-2 text-left",
    [isActive, setActive] = useState(active),
    dispatch = useDispatch(),
    { adminToken } = useSelector((state) => state.auth),
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
        <div className="flex items-center justify-center gap-3">
          <Tooltips message={`${thumbnail} | Lihat Thumbnail`}>
            <Button
              onClick={() =>
                dispatch(
                  setSelectedData({
                    type: "series",
                    data: {
                      _id,
                      judul,
                      deskripsi,
                      thumbnail,
                      active,
                      videos: dataVideo,
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
        <div className="flex justify-center">
          <Switch
            checked={isActive}
            id={`switch-${_id}`}
            label={isActive ? "Ya" : "Tidak"}
            color="green"
            labelProps={{
              className: "text-blue-gray-400 text-sm",
            }}
            onChange={async (e) => {
              setActive(e.target.checked);
              await activateSeries(
                _id,
                {
                  judul,
                  deskripsi,
                  thumbnail,
                  active: e.target.checked,
                  videos: dataVideo,
                },
                dispatch,
                adminToken
              );
            }}
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
      <td>
        <div className="mx-auto flex w-fit gap-3 px-2">
          <Tooltips message={"Edit data"}>
            <Button
              id={`edit-${_id}`}
              className="texxt-white p-1"
              variant="gradient"
              color="orange"
              onClick={() =>
                dispatch(
                  setSelectedData({
                    type: "series",
                    data: {
                      _id,
                      judul,
                      deskripsi,
                      thumbnail,
                      active,
                      videos: dataVideo,
                      createdAt,
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
                    judul,
                    deskripsi,
                    thumbnail,
                    active,
                    dataVideo,
                    createdAt,
                    updatedAt,
                    __v,
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

export default Series;
