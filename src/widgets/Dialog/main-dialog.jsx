import { deleteSeries, deleteUser, deleteVideo } from "@/context/table";
import { setAlert } from "@/store/slices/main";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const MainDialog = ({
  open,
  handleOpen = () => {},
  children,
  type,
  title,
  id,
}) => {
  const [size, setSize] = useState("md"),
    { adminToken } = useSelector((state) => state.auth),
    dispatch = useDispatch();

  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      if (newWidth < 868) setSize("xl");
      else setSize("md");
    };
    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  return (
    <Dialog open={open} size={size} id="anjas" handler={handleOpen}>
      <DialogHeader>
        <Typography className="text-2xl font-semibold capitalize text-blue-gray-400">
          {type} {title}
        </Typography>
      </DialogHeader>
      <DialogBody divider>{children}</DialogBody>
      <DialogFooter className="flex gap-2">
        <Button onClick={handleOpen} color="green">
          Batal
        </Button>
        <Button
          onClick={() => {
            switch (title) {
              case "user":
                deleteUser(id, dispatch, adminToken);
                break;
              case "video":
                deleteVideo(id, dispatch, adminToken);
                break;
              case "series":
                deleteSeries(id, dispatch, adminToken);
                break;
              default:
                dispatch(
                  setAlert({
                    type: "warning",
                    message: "Function untk data ini belum diatur!",
                    show: true,
                  })
                );
                break;
            }
            return handleOpen();
          }}
          color="red"
        >
          Hapus
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default MainDialog;
