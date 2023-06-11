import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import User from "./user";
import Video from "./video";
import Series from "./series";
import EssentialDialog from "../Dialog/essential-dialog";

const MainTable = ({ identifier, tableData, icon, tableTitle }) => {
  const [essentials, setEssentials] = useState({}),
    [open, setOpen] = useState(false),
    handleOpen = () => setOpen(!open);
  return (
    <Card>
      <CardHeader
        variant="gradient"
        color="light-blue"
        className="mb-8 flex items-center justify-start gap-3 p-6 capitalize"
      >
        {icon}
        <Typography variant="h5" color="white">
          Table {identifier}
        </Typography>
      </CardHeader>
      <CardBody className="w-full overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {tableTitle.map((el) => (
                <th
                  key={el}
                  className="border-b border-blue-gray-50 py-3 px-5 text-left"
                >
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    {el}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((value, key) => {
              switch (identifier) {
                case "user":
                  return (
                    <User
                      key={key}
                      data={value}
                      essential={(data) => setEssentials(data)}
                      handleOpen={(data) => handleOpen(data)}
                    />
                  );
                case "video":
                  return <Video key={key} data={value} />;
                case "series":
                  return <Series key={key} data={value} />;
                default:
                  return <tr>Mapping belum diatur!</tr>;
              }
            })}
          </tbody>
        </table>
        {/* //NOTE - Table User Dialog */}
        <EssentialDialog
          open={open}
          handleOpen={(data) => handleOpen()}
          data={essentials}
        />
      </CardBody>
    </Card>
  );
};

export default MainTable;
