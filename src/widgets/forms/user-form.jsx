import {
  Button,
  Card,
  CardBody,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { Form, useFormikContext } from "formik";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const UserForm = (props) => {
  const {
      errors,
      resetForm,
      isSubmitting,
      values,
      touched,
      setFieldValue,
      handleBlur,
    } = useFormikContext(),
    {
      user: { selectedData },
    } = useSelector((state) => state.table);

  useEffect(() => {
    if (Object.keys(selectedData).length > 0) {
      setFieldValue("id", selectedData._id ?? "");
      setFieldValue("nama", selectedData.nama ?? "");
      setFieldValue("email", selectedData.email ?? "");
      setFieldValue("lahir", selectedData.lahir.split("T")[0] ?? "");
      setFieldValue("phone", selectedData.essentials.phone ?? "");
      setFieldValue("username", selectedData.essentials.username ?? "");
      setFieldValue("address", selectedData.essentials.address ?? "");
      setFieldValue("fetchType", "update");
    } else {
      resetForm();
    }
  }, [selectedData]);

  return (
    <div className="flex flex-wrap gap-5">
      <Card className="w-full lg:w-3/5">
        <CardBody>
          <Form className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="col-span-2">
              <Typography variant="h5" className="flex items-center gap-3 ">
                User Form{" "}
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
            <div className="col-span-2 w-full ">
              <Input
                value={values.nama}
                error={errors.nama && touched.nama ? true : false}
                type="text"
                name="nama"
                onBlur={handleBlur}
                onChange={(e) => setFieldValue("nama", e.target.value)}
                label={errors.nama && touched.nama ? errors.nama : "Nama User"}
                size="md"
              />
            </div>
            <div className="col-span-2 w-full">
              <Input
                value={values.password}
                error={errors.password && touched.password ? true : false}
                type="text"
                name="password"
                onBlur={handleBlur}
                onChange={(e) => setFieldValue("password", e.target.value)}
                disabled={values.fetchType === "update" ? true : false}
                label={
                  errors.password && touched.password
                    ? errors.password
                    : "Password"
                }
                size="md"
              />
            </div>
            <div className="col-span-2 w-full md:col-span-1">
              <Input
                value={values.email}
                error={errors.email && touched.email ? true : false}
                type="text"
                name="email"
                onBlur={handleBlur}
                onChange={(e) => setFieldValue("email", e.target.value)}
                label={
                  errors.email && touched.email ? errors.email : "Email User"
                }
                size="md"
              />
            </div>
            <div className="col-span-2 w-full md:col-span-1">
              <Input
                value={values.lahir}
                error={errors.lahir && touched.lahir ? true : false}
                type="date"
                name="lahir"
                onBlur={handleBlur}
                onChange={(e) => setFieldValue("lahir", e.target.value)}
                disabled={values.fetchType === "create" ? true : false}
                label={
                  errors.lahir && touched.lahir ? errors.lahir : "Tanggal Lahir"
                }
                size="md"
              />
            </div>
            <div className="col-span-2 w-full md:col-span-1">
              <Input
                value={values.phone}
                error={errors.phone && touched.phone ? true : false}
                type="text"
                name="phone"
                onBlur={handleBlur}
                onChange={(e) => setFieldValue("phone", e.target.value)}
                disabled={values.fetchType === "create" ? true : false}
                label={
                  errors.phone && touched.phone ? errors.phone : "Nomor Telepon"
                }
                size="md"
              />
            </div>
            <div className="col-span-2 w-full md:col-span-1">
              <Input
                value={values.username}
                error={errors.username && touched.username ? true : false}
                type="text"
                name="username"
                onBlur={handleBlur}
                onChange={(e) => setFieldValue("username", e.target.value)}
                disabled={values.fetchType === "create" ? true : false}
                label={
                  errors.username && touched.username
                    ? errors.username
                    : "Username"
                }
                size="md"
              />
            </div>
            <div className="col-span-2 w-full">
              <Textarea
                value={values.address}
                error={errors.address && touched.address ? true : false}
                name="nama"
                onBlur={handleBlur}
                onChange={(e) => setFieldValue("address", e.target.value)}
                disabled={values.fetchType === "create" ? true : false}
                label={
                  errors.address && touched.address ? errors.address : "Address"
                }
                size="md"
              />
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
                {values.fetchType !== "create" ? "Update User" : "Buat User"}
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
      <Card className="grow">
        <CardBody>
          <Typography variant="h5" className="flex items-center gap-3 ">
            User Value
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
          <Typography variant="paragraph">Nama - {values.nama}</Typography>
          <Typography variant="paragraph">Email - {values.email}</Typography>
          <Typography variant="paragraph">
            Username - {values.username}
          </Typography>
          <Typography variant="paragraph">Lahir - {values.lahir}</Typography>
          <Typography variant="paragraph">Phone - {values.phone}</Typography>
          <Typography variant="paragraph">
            Address - {values.address}
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
};

export default UserForm;
