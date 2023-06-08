import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { Alert as Peringatan } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

const AlertBar = (props) => {
  const {
    show = false,
    setShow = () => {},
    type,
    withTimeout = false,
    timeout = 3000,
    message = "Alert belum diatur",
  } = props;
  const [color, setColor] = useState("green");

  useEffect(() => {
    if (withTimeout) {
      setTimeout(() => {
        setShow(false);
      }, timeout);
    }
  }, [show]);

  useEffect(() => {
    switch (type) {
      case "error":
        setColor("red");
        break;
      case "success":
        setColor("green");
        break;
      case "warning":
        setColor("yellow");
        break;
      case "info":
        setColor("blue");
      default:
        break;
    }
  }, [type]);

  return (
    <div className="fixed left-0 z-[100] w-full">
      <Peringatan
        open={show}
        color={color}
        icon={<InformationCircleIcon strokeWidth={2} className="h-6 w-6" />}
        onClose={() => setShow(false)}
        animate={{
          mount: { opacity: 1, y: 26 },
          unmount: { opacity: 0, y: -70 },
        }}
        className="container mx-auto shadow-xl"
      >
        <p>{message}</p>
      </Peringatan>
    </div>
  );
};

export default AlertBar;
