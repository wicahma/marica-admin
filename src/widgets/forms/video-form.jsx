import { InformationCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
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
import React, { useEffect } from "react";
import Tooltips from "../micros/tooltips";
import { useSelector } from "react-redux";

const VideoForm = (props) => {
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
    disabledInput = true,
    thumbnailRef = React.useRef(null),
    {
      video: { selectedData },
    } = useSelector((state) => state.table),
    quizAttachmentDataRef = React.useRef(null);

  useEffect(() => {
    if (Object.keys(selectedData).length > 0) {
      setFieldValue("id", selectedData._id ?? "");
      setFieldValue("videoURL", selectedData.videoURL ?? "");
      setFieldValue("type", selectedData.type ?? "");
      setFieldValue("title", selectedData.title ?? "");
      setFieldValue("description", selectedData.description ?? "");
      setFieldValue("fetchType", "update");
    } else {
      resetForm();
    }
  }, [selectedData]);

  useEffect(() => {
    if (thumbnailRef.current) {
      thumbnailRef.current.src = values.thumbnail;
    }
  }, [thumbnailRef]);

  return (
    <div className="flex flex-wrap gap-5 lg:flex-nowrap">
      <Card className="w-full shrink-0 lg:w-3/5">
        <CardBody>
          <Form className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="col-span-2">
              <Typography variant="h5" className="flex items-center gap-3">
                Video Form{" "}
                <span
                  className={`rounded-md ${
                    values.fetchType !== "add"
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
            <div className="col-span-2 w-full ">
              <Input
                value={values.videoURL}
                error={errors.videoURL && touched.videoURL ? true : false}
                type="text"
                name="videoURL"
                onBlur={handleBlur}
                onChange={handleChange}
                label={
                  errors.videoURL && touched.videoURL
                    ? errors.videoURL
                    : "Alamat URL Video"
                }
                size="md"
              />
            </div>
            <div className="col-span-2 w-full ">
              <Input
                value={values.title}
                error={errors.title && touched.title ? true : false}
                type="text"
                name="title"
                onBlur={handleBlur}
                onChange={handleChange}
                label={errors.title && touched.title ? errors.title : "Judul"}
                size="md"
              />
            </div>
            <div className="col-span-2 w-full ">
              <Textarea
                value={values.description}
                error={errors.description && touched.description ? true : false}
                name="description"
                onBlur={handleBlur}
                onChange={handleChange}
                label={
                  errors.description && touched.description
                    ? errors.description
                    : "Deskripsi"
                }
                size="md"
              />
            </div>
            <div
              className={`col-span-2 row-span-2 flex w-full flex-col justify-between rounded-xl border md:col-span-1 ${
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
                disabled={disabledInput ? true : false}
                onChange={(e) => setFieldValue("thumbnail", e.target.files)}
                className="focus:border-primary focus:shadow-te-primary dark:focus:border-primary relative m-0 block max-h-[2.5rem] w-full min-w-0 flex-auto cursor-pointer rounded-lg border border-solid border-blue-gray-200 bg-clip-padding px-3 py-[0.12rem] font-normal leading-[2.15] text-blue-gray-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.12rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-blue-gray-200 file:px-3 file:py-[0.12rem] file:text-blue-gray-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-blue-gray-200 focus:text-blue-gray-700 focus:outline-none dark:border-blue-gray-600 dark:text-blue-gray-200 dark:file:bg-blue-gray-700 dark:file:text-blue-gray-100"
                id="thumbnail"
                type="file"
              />
            </div>
            <div className="col-span-2 w-full md:col-span-1">
              <Select
                value={values.type}
                error={errors.type && touched.type ? true : false}
                name="type"
                onChange={(e) => setFieldValue("type", e)}
                label={errors.type && touched.type ? errors.type : "Tipe Video"}
              >
                <Option value="paid">Berbayar</Option>
                <Option value="free">Gratis</Option>
              </Select>
            </div>
            <Tooltips message={"Fitur sedang dinonaktifkan untuk saat ini"}>
              <div className="col-span-2 w-full md:col-span-1">
                <Input
                  value={values.quizTimestamp}
                  error={
                    errors.quizTimestamp && touched.quizTimestamp ? true : false
                  }
                  type="text"
                  name="quizTimestamp"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  disabled={disabledInput ? true : false}
                  label={
                    errors.quizTimestamp && touched.quizTimestamp
                      ? errors.quizTimestamp
                      : "Quiz Timestamp"
                  }
                  size="md"
                />
              </div>
            </Tooltips>
            <Tooltips message="Fitur sedang dinonaktifkan untuk saat ini">
              <div className="col-span-2 row-span-2 flex w-full flex-col justify-between rounded-xl bg-blue-gray-50 p-2 md:col-span-1">
                <div className="flex grow items-center">
                  <label
                    htmlFor="quizAttachmentData"
                    className="mb-2 inline-block pl-3 text-sm font-normal capitalize text-blue-gray-500 dark:text-blue-gray-200"
                  >
                    {errors.quizAttachmentData && touched.quizAttachmentData
                      ? errors.quizAttachmentData
                      : "Quiz Attachment Data"}
                  </label>
                </div>
                <input
                  accept="image/*"
                  disabled={
                    values.fetchType === "add" && disabledInput ? true : false
                  }
                  ref={quizAttachmentDataRef}
                  name="quizAttachmentData"
                  onChange={(e) =>
                    setFieldValue("quizAttachmentData", e.target.files)
                  }
                  className="focus:border-primary focus:shadow-te-primary dark:focus:border-primary relative m-0 block max-h-[2.5rem] w-full min-w-0 flex-auto cursor-pointer rounded-lg border border-solid border-blue-gray-200 bg-clip-padding px-3 py-[0.12rem] font-normal leading-[2.15] text-blue-gray-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.12rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-blue-gray-200 file:px-3 file:py-[0.12rem] file:text-blue-gray-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-blue-gray-200 focus:text-blue-gray-700 focus:outline-none disabled:file:bg-blue-gray-900 dark:border-blue-gray-600 dark:text-blue-gray-200 dark:file:bg-blue-gray-700 dark:file:text-blue-gray-100"
                  id="quizAttachmentData"
                  type="file"
                />
              </div>
            </Tooltips>
            <Tooltips message="Fitur sedang dinonaktifkan untuk saat ini">
              <div className="col-span-2 w-full md:col-span-1">
                <Select
                  value={values.quizType}
                  error={errors.quizType && touched.quizType ? true : false}
                  name="quizType"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  disabled={disabledInput ? true : false}
                  label={
                    errors.quizType && touched.quizType
                      ? errors.quizType
                      : "quizType"
                  }
                  size="md"
                >
                  <Option value="pilihanGanda">Pilihan Ganda</Option>
                  <Option value="fillTheBlank">Fill The Blank</Option>
                  <Option value="reArrange">Re Arrange</Option>
                </Select>
              </div>
            </Tooltips>
            <Tooltips message={"Fitur sedang dinonaktifkan untuk saat ini"}>
              <div className="col-span-2 w-full md:col-span-1">
                <Select
                  value={values.quizAttachmentType}
                  error={
                    errors.quizAttachmentType && touched.quizAttachmentType
                      ? true
                      : false
                  }
                  name="quizAttachmentType"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  disabled={disabledInput ? true : false}
                  label={
                    errors.quizAttachmentType && touched.quizAttachmentType
                      ? errors.quizAttachmentType
                      : "Quiz Attachment Type"
                  }
                  size="md"
                >
                  <Option value="video">Video</Option>
                  <Option value="image">Gambar</Option>
                </Select>
              </div>
            </Tooltips>
            <Tooltips message="Fitur sedang dinonaktifkan untuk saat ini">
              <div className="col-span-2 w-full">
                <Textarea
                  value={
                    JSON.stringify(values.quiz) === "{}" ? "" : values.quiz
                  }
                  error={errors.quiz && touched.quiz ? true : false}
                  name="QuizData"
                  onBlur={handleBlur}
                  onChange={(e) => setFieldValue("quiz", e.target.value)}
                  disabled={disabledInput ? true : false}
                  label={
                    errors.quiz && touched.quiz ? errors.quiz : "Quiz Data"
                  }
                  size="md"
                />
              </div>
            </Tooltips>
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
                {values.fetchType !== "add" ? "Update Video" : "Buat Video"}
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
      <Card className="lg:2/5 grow">
        <CardBody className="break-all">
          <Typography variant="h5" className="flex items-center gap-3 ">
            Video Value
            <span
              className={`rounded-md ${
                values.fetchType !== "add" ? "bg-light-blue-400" : "bg-red-400"
              } px-2 text-xs font-medium uppercase text-white`}
            >
              {values.fetchType}
            </span>
          </Typography>
          <p>Video Url - {values.videoURL}</p>
          <p>Judul - {values.title}</p>
          <p>Tipe Video - {values.type}</p>
          <div className="rounded-xl border border-blue-gray-300 px-3 py-1">
            <p>Deskripsi - {values.description}</p>
          </div>
          <div className="mt-3 rounded-xl border border-blue-gray-300 px-3 py-1">
            <p>Thumbnail - {values.thumbnail[0] && values.thumbnail[0].name}</p>
            {values.fetchType !== "add" && (
              <a
                href={
                  values.thumbnail[0] &&
                  URL.createObjectURL(values.thumbnail[0])
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
            )}
          </div>
          <Tooltips message={"Fitur sedang dinonaktifkan untuk saat ini"}>
            <div
              id="disabled-features"
              className="mt-3 rounded-xl bg-blue-gray-300 py-1 px-3 font-normal text-white"
            >
              <p>Quiz Timestamp - {}</p>
              <p>Quiz Attachment Data - {}</p>
              <p>Quiz Type - {}</p>
              <p>Quiz Attachment Type - {}</p>
              <p>Quiz Data - {}</p>
            </div>
          </Tooltips>
        </CardBody>
      </Card>
    </div>
  );
};

export default VideoForm;
