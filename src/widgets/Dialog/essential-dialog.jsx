import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dialog,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

const EssentialDialog = ({ open, handleOpen = () => {}, data }) => {
  const [size, setSize] = useState("md");

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
      <Card>
        <CardHeader variant="gradient" color="blue" className="px-5 py-3">
          <Typography variant="h4">User Essential data</Typography>
        </CardHeader>
        <CardBody className="max-h-[80vh] overflow-y-auto">
          <div>
            <Typography variant="paragraph">
              Username: {data.username}
            </Typography>
            <Typography variant="paragraph">Telepon: {data.phone}</Typography>
          </div>
          <div className="relative mt-10 space-y-3 rounded-bl-xl rounded-br-xl rounded-tr-xl bg-blue-500 px-4 py-4 text-white">
            {data.dataAnak !== undefined && data.dataAnak.length !== 0 ? (
              data.dataAnak.map((el, key) => (
                <div className="rounded-xl bg-blue-400 px-3 py-2">
                  <Typography className="uppercase">ID-{el._id}</Typography>
                  <Typography>{el.nama}</Typography>
                  <Typography>{el.rentangUsia}</Typography>
                </div>
              ))
            ) : (
              <div className="my-10 text-center">
                <Typography>User belum membuat data anak</Typography>
              </div>
            )}
            <div className="absolute bottom-full left-0 rounded-tl-lg rounded-tr-lg bg-blue-500 px-7 py-1 text-lg font-medium before:absolute before:left-full before:bottom-0 before:aspect-square before:h-4 before:bg-blue-500 after:absolute after:left-full after:bottom-0 after:aspect-square after:h-8 after:rounded-full after:bg-white">
              Data Anak
            </div>
          </div>
        </CardBody>
        <CardFooter className="flex justify-end pt-0">
          <Button color="red" variant="gradient" onClick={handleOpen}>
            Close
          </Button>
        </CardFooter>
      </Card>
    </Dialog>
  );
};

export default EssentialDialog;
