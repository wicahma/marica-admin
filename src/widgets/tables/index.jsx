import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import React, { useMemo, useState } from "react";
import User from "./user-table";
import Video from "./video-table";
import Series from "./series-table";
import EssentialDialog from "../Dialog/essential-dialog";
import MainDialog from "../Dialog/main-dialog";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import Tooltips from "../micros/tooltips";
import { filterData } from "@/context/table";
import Payment from "./payment-table";

const MainTable = ({
  identifier,
  tableData,
  icon,
  tableTitle,
  activeIndex = () => {},
}) => {
  const [essentials, setEssentials] = useState({}),
    [open, setOpen] = useState(false),
    [selectedData, setSelectedData] = useState({}),
    [searchValue, setSearchValue] = useState(""),
    [triggerValue, setTriggerValue] = useState(false),
    handleOpen = () => setOpen(!open);

  const [deleteDialog, setDeleteDialog] = useState(false),
    handleDeleteDialog = () => setDeleteDialog(!deleteDialog);

  const newData = useMemo(() => {
    let data = tableData[activeIndex() - 1];
    if (searchValue !== "") {
      data = filterData({
        input: searchValue,
        data: tableData.flat(1),
        identifier,
      });
    }
    return data;
  }, [activeIndex(), triggerValue, tableData]);

  return (
    <Card>
      <CardHeader
        variant="gradient"
        color="light-blue"
        className="mb-8 flex items-center justify-between gap-3 p-6 capitalize"
      >
        <div className="flex gap-3">
          {icon}
          <Typography variant="h5" color="white">
            Table {identifier}
          </Typography>
        </div>
        <div className="flex items-center gap-3 rounded-xl bg-white px-3 py-2">
          <Tooltips
            message={"Tekan Enter untuk mencari / klik tombol disamping"}
          >
            <Input
              value={searchValue}
              type="text"
              name="email"
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              label={"Cari Data"}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setTriggerValue(!triggerValue);
                }
              }}
              size="md"
            />
          </Tooltips>
          <Tooltips message={"Cari data"}>
            <Button
              type="button"
              onClick={() => setTriggerValue(!triggerValue)}
              className="
            aspect-square w-11 p-1"
            >
              <MagnifyingGlassCircleIcon className="m-0 aspect-square w-full p-0" />
            </Button>
          </Tooltips>
        </div>
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
              <th
                key={"action"}
                className="border-b border-blue-gray-50 py-3 px-5 text-left"
              >
                <Typography
                  variant="small"
                  className="text-[11px] font-bold uppercase text-blue-gray-400"
                >
                  Action
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.length !== 0 ? (
              newData.map((value, key) => {
                // NOTE - Mapping Table Data per row
                switch (identifier) {
                  case "user":
                    return (
                      <User
                        key={key}
                        data={value}
                        essential={(data) => setEssentials(data)}
                        handleOpen={(data) => handleOpen(data)}
                        selectedData={(data, type) => {
                          setSelectedData(data);
                          switch (type) {
                            case "delete":
                              setDeleteDialog(true);
                              break;
                            default:
                              alert("Mapping Dialog diatur!");
                              break;
                          }
                        }}
                      />
                    );
                  case "video":
                    return (
                      <Video
                        key={key}
                        data={value}
                        selectedData={(data, type) => {
                          setSelectedData(data);
                          switch (type) {
                            case "delete":
                              setDeleteDialog(true);
                              break;
                            default:
                              alert("Mapping Dialog diatur!");
                              break;
                          }
                        }}
                      />
                    );
                  case "series":
                    return (
                      <Series
                        key={key}
                        data={value}
                        selectedData={(data, type) => {
                          setSelectedData(data);
                          switch (type) {
                            case "delete":
                              setDeleteDialog(true);
                              break;
                            default:
                              alert("Mapping Dialog diatur!");
                              break;
                          }
                        }}
                      />
                    );
                  case "payment":
                    return <Payment key={key} data={value} />;
                  default:
                    return <tr>Mapping belum diatur!</tr>;
                }
              })
            ) : (
              <tr>
                <td
                  colSpan={tableTitle.length + 1}
                  className="py-5 text-center"
                >
                  Table Kosong, silahkan tambah data terlebih dahulu!
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* //NOTE - Table User Dialog */}
        <EssentialDialog
          open={open}
          handleOpen={(data) => handleOpen()}
          data={essentials}
        />
        {/* //NOTE - Delete Data */}
        <MainDialog
          handleOpen={() => handleDeleteDialog()}
          open={deleteDialog}
          type="delete"
          title={identifier}
          id={selectedData._id}
        >
          <div className="mx-auto mb-4 w-fit rounded-lg bg-blue-gray-500 px-3 py-1 text-sm font-medium uppercase text-white">
            {selectedData._id}
          </div>
          {identifier === "user" && (
            <p>
              Apakah anda yakin ingin menghapus data user
              <span className="font-medium"> {selectedData.nama}</span> ? Data
              anak dari user ini akan dihapus juga
            </p>
          )}
          {identifier === "video" && (
            <p>
              Apakah anda yakin ingin menghapus data video
              <span className="font-medium"> {selectedData.thumbnail}</span> ?
            </p>
          )}
          {identifier === "series" && (
            <p>
              Apakah anda yakin ingin menghapus data series
              <span className="font-medium"> {selectedData._id}</span> ?
            </p>
          )}
        </MainDialog>
      </CardBody>
    </Card>
  );
};

export default MainTable;
