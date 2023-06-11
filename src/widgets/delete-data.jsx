import { TrashIcon } from "@heroicons/react/24/solid";
import { Button, Switch } from "@material-tailwind/react";
import React from "react";
import { useDispatch } from "react-redux";

const DeleteButton = (props) => {
  const dispatch = useDispatch();
  return (
    <div className="fixed bottom-9 right-24 z-[200] flex items-center gap-3 rounded-xl bg-red-100 px-3 py-2 text-white">
      <Switch
        onClick={(e) => {
          console.log("Select Button", e.target.checked);
          if (e.target.checked) {
            localStorage.removeItem("state");
            dispatch({ type: "reset/initialState", payload: null });
          } else {
            localStorage.removeItem("state");
            dispatch({ type: "reset/localState", payload: null });
          }
        }}
        color="red"
        label="Change State Saver"
        labelProps={{
          className: "text-red-400",
        }}
      />
    </div>
  );
};

export default DeleteButton;
