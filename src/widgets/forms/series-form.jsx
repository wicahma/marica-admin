import {
  Button,
  Card,
  CardBody,
  Input,
  Option,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { Form, useFormikContext } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import Tooltips from "../micros/tooltips";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { findBarang } from "@/context/forms/series";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "@/store/slices/main";

const SeriesForm = ({ video }) => {
  const {
      errors,
      resetForm,
      isSubmitting,
      values,
      touched,
      setFieldValue,
      handleBlur,
      handleChange,
    } = useFormikContext(),
    thumbnailRef = React.useRef(null),
    dispatch = useDispatch(),
    getVideo = useMemo(() => video, [video]),
    {
      series: { selectedData },
    } = useSelector((state) => state.table),
    [filteredVideo, setFilteredVideo] = useState(getVideo);

  useEffect(() => {
    if (Object.keys(selectedData).length > 0) {
      setFieldValue("id", selectedData._id ?? "");
      setFieldValue("fetchType", "update");
      setFieldValue("judul", selectedData.judul ?? "");
      setFieldValue("deskripsi", selectedData.deskripsi ?? "");
      setFieldValue("dataVideo", selectedData.dataVideo ?? "");
    } else {
      resetForm();
    }
  }, [selectedData]);

  return (
    <div className="flex flex-wrap gap-5 lg:flex-nowrap">
      <Card className="w-full shrink-0 lg:w-3/5">
        <CardBody>
          <Form className="grid grid-cols-2 gap-5">
            <div className="col-span-2">
              <Typography variant="h5" className="flex items-center gap-3">
                Series Form{" "}
                <span
                  className={`rounded-md ${
                    values.fetchType !== "create"
                      ? "bg-light-blue-400"
                      : "bg-red-400"
                  } px-2 text-xs font-medium uppercase text-white`}
                >
                  {values.fetchType}
                </span>{" "}
                {values.id && (
                  <span
                    className={`bg-white-400 rounded-md border border-blue-400 px-2 text-xs font-normal uppercase text-blue-600 shadow-xl`}
                  >
                    ID-{values.id}
                  </span>
                )}
              </Typography>
            </div>
            <div className="col-span-2 w-full">
              <Input
                value={values.judul}
                error={errors.judul && touched.judul ? true : false}
                type="text"
                name="judul"
                onBlur={handleBlur}
                onChange={handleChange}
                label={
                  errors.judul && touched.judul ? errors.judul : "Judul Series"
                }
                size="md"
              />
            </div>
            <div className="col-span-2 w-full md:col-span-1">
              <Textarea
                value={values.deskripsi}
                error={errors.deskripsi && touched.deskripsi ? true : false}
                name="deskripsi"
                onBlur={handleBlur}
                onChange={(e) => setFieldValue("deskripsi", e)}
                label={
                  errors.deskripsi && touched.deskripsi
                    ? errors.deskripsi
                    : "Alamat URL Video"
                }
              />
            </div>
            <div
              className={`col-span-2 flex h-fit w-full flex-col justify-between rounded-lg border md:col-span-1 ${
                errors.thumbnail && touched.thumbnail
                  ? "border-red-500"
                  : "border-blue-gray-200"
              } gap-2 p-2`}
            >
              <div className="flex grow items-center justify-between">
                <label
                  htmlFor="thumbnail"
                  className={` inline-block pl-3 text-sm font-normal capitalize ${
                    errors.thumbnail && touched.thumbnail
                      ? "text-red-500"
                      : "text-blue-gray-500 dark:text-blue-gray-200"
                  }`}
                >
                  {errors.thumbnail && touched.thumbnail
                    ? errors.thumbnail
                    : "thumbnail"}
                </label>
                <Tooltips message={"Hapus File"}>
                  <Button
                    color="red"
                    className="rounded-full p-2"
                    onClick={() => {
                      setFieldValue("thumbnail", []);
                      thumbnailRef.current.value = "";
                      thumbnailRef.current.files = FileList[{}];
                    }}
                    variant="gradient"
                  >
                    <TrashIcon className="aspect-square h-5" />
                  </Button>
                </Tooltips>
              </div>
              <input
                accept="image/*"
                ref={thumbnailRef}
                name="thumbnail"
                onChange={(e) => setFieldValue("thumbnail", e.target.files)}
                className="focus:border-primary focus:shadow-te-primary dark:focus:border-primary relative m-0 block max-h-[2.5rem] w-full min-w-0 flex-auto cursor-pointer rounded-lg border border-solid border-blue-gray-200 bg-clip-padding px-3 py-[0.12rem] font-normal leading-[2.15] text-blue-gray-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.12rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-blue-gray-200 file:px-3 file:py-[0.12rem] file:text-blue-gray-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-blue-gray-200 focus:text-blue-gray-700 focus:outline-none dark:border-blue-gray-600 dark:text-blue-gray-200 dark:file:bg-blue-gray-700 dark:file:text-blue-gray-100"
                id="thumbnail"
                type="file"
              />
            </div>
            <div className="col-span-2 w-full">
              <Select
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 25 },
                }}
                label={`${
                  errors.videos && touched.videos ? errors.videos : "ID Video"
                }`}
                error={touched.videos && errors.videos ? true : false}
                onChange={(e) => {
                  if (values.videos.filter((data) => data === e).length > 0) {
                    return dispatch(
                      setAlert({
                        type: "info",
                        message: "Data telah ditambahkan sebelumnya!",
                        show: true,
                      })
                    );
                  }
                  setFieldValue("videos", [e, ...values.videos]);
                }}
                menuProps={{
                  className: "min-w-max max-w-[80vw]",
                }}
                selected={(e) => {
                  if (values.videos.length > 0) {
                    return <p className="uppercase">{values.videos[0]}</p>;
                  }
                }}
              >
                <Input
                  type="text"
                  key={"searchBarang"}
                  color="gray"
                  label="Cari ID / Nama Barang"
                  onChange={(e) =>
                    findBarang(e.target.value, video, (data) =>
                      setFilteredVideo(data)
                    )
                  }
                />
                {filteredVideo.length !== 0 ? (
                  filteredVideo.map(({ _id, title }, i) => (
                    <Option
                      value={_id}
                      key={`${i}-idbarangs`}
                      className="uppercase"
                    >
                      {_id} - {title}
                    </Option>
                  ))
                ) : (
                  <Option
                    value={null}
                    className="py-5 text-center"
                    disabled
                    key={`idbarangs`}
                  >
                    Tidak ada data video
                  </Option>
                )}
              </Select>
            </div>
            <div className="col-span-2 flex justify-end gap-5">
              <Button
                variant="text"
                onClick={() => resetForm()}
                disabled={isSubmitting ? true : false}
                color="red"
                type="reset"
              >
                Bersihkan
              </Button>
              <Button
                disabled={isSubmitting ? true : false}
                variant="gradient"
                color="green"
                type="submit"
              >
                {values.fetchType !== "create"
                  ? "Update Series"
                  : "Buat Series"}
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
      <Card className="lg:2/5 grow">
        <CardBody className="break-all">
          <Typography variant="h5" className="flex items-center gap-3 ">
            Series Value
            <span
              className={`rounded-md ${
                values.fetchType !== "create"
                  ? "bg-light-blue-400"
                  : "bg-red-400"
              } px-2 text-xs font-medium uppercase text-white`}
            >
              {values.fetchType}
            </span>
          </Typography>
          <p>Judul Series - {values.videoURL}</p>
          <p>Deskripsi - {values.thumbnail[0] && values.thumbnail[0].name}</p>
          <div className="mt-3 flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-blue-gray-300 px-3 py-2 text-center">
            {values.videos.length !== 0 ? (
              values.videos.map((data, key) => (
                <Typography
                  key={key}
                  className="flex w-full items-center justify-between text-xs font-medium uppercase text-blue-gray-500"
                >
                  {data}
                  <Button
                    color="red"
                    id={`delete-${data}-${key}`}
                    onClick={() => {
                      setFieldValue(
                        "videos",
                        values.videos.filter((id) => id !== data)
                      );
                    }}
                    className="p-0"
                  >
                    <XMarkIcon className="h-5 rounded-full p-1 text-white" />
                  </Button>
                </Typography>
              ))
            ) : (
              <Typography className="mx-auto text-xs text-blue-gray-300">
                Belum ada ID Video
              </Typography>
            )}
          </div>
          <div className="mt-3 rounded-xl border border-blue-gray-300 px-3 py-1">
            <p>Thumbnail - {values.thumbnail[0] && values.thumbnail[0].name}</p>
            <a
              href={
                values.thumbnail[0] && URL.createObjectURL(values.thumbnail[0])
              }
              target="_blank"
            >
              <img
                src={
                  values.thumbnail[0] &&
                  URL.createObjectURL(values.thumbnail[0])
                }
                className="mb-2 w-full rounded-lg"
                alt={values.thumbnail[0] && values.thumbnail[0].name}
              />
            </a>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default SeriesForm;
