import {
  PencilIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { Button, Chip, Switch, Typography } from "@material-tailwind/react";
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Tooltips from "../micros/tooltips";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedData } from "@/store/slices/table";
import { validateUser } from "@/context/table";

const User = ({
  data: {
    _id,
    nama,
    userType,
    lahir,
    email,
    imageID,
    essentials,
    validated,
    createdAt,
    updatedAt,
    __v,
  },
  handleOpen,
  essential,
  selectedData = () => {},
}) => {
  const className = "border-b border-blue-gray-50 py-3 px-2 text-left",
    dispatch = useDispatch(),
    { adminToken } = useSelector((state) => state.auth),
    newDate = (date) => new Date(date).toString().split("GMT")[0],
    firstUpdate = useRef(true);

  // useLayoutEffect(() => {
  //   if (firstUpdate.current) {
  //     firstUpdate.current = false;
  //     return;
  //   }

  // });
  // validateUser(_id, isValidated, dispatch, adminToken);
  // useEffect(() => {
  //   if (isValidated !== validated) {
  //   }
  // }, [isValidated]);

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
            // checked={isValidated}
            defaultChecked={validated}
            id={`switch-${_id}`}
            label={validated ? "Ya" : "Tidak"}
            color="green"
            labelProps={{
              className: "text-blue-gray-400 text-sm",
            }}
            onChange={(e) => {
              if (userType === "admin") return;
              validateUser(_id, e.target.checked, dispatch, adminToken);
            }}
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
                    type: "user",
                    data: {
                      _id,
                      nama,
                      email,
                      lahir,
                      essentials,
                      validated,
                      updatedAt,
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

export default User;
