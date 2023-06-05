import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { Alert } from "@material-tailwind/react";
import React from "react";

const AlertBar = ({
  show = false,
  setShow = (data) => {},
  type,
  withTimeout = false,
  timeout = 3000,
  message = "Alert belum diatur",
}) => {
  const [color, setColor] = React.useState("green");
  React.useEffect(() => {
    if (withTimeout) {
      setTimeout(() => {
        setShow(false);
      }, timeout);
    }
  }, [show]);

  React.useEffect(() => {
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
      <Alert
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
        {message}
      </Alert>
    </div>
  );
};

export default AlertBar;
