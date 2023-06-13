import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Button, Switch, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import Tooltips from "../micros/tooltips";
import { setSelectedData } from "@/store/slices/table";
import { useDispatch } from "react-redux";

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
                      dataVideo,
                      createdAt,
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
