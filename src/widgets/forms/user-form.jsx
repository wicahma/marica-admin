import {
  Button,
  Card,
  CardBody,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { Form, useFormikContext } from "formik";
import React from "react";

const UserForm = (props) => {
  const {
    errors,
    resetForm,
    isSubmitting,
    values,
    touched,
    setFieldValue,
    handleBlur,
    handleChange,
  } = useFormikContext();
  return (
    <div className="flex gap-5">
      <Card className="w-3/5">
        <CardBody>
          <Form className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="col-span-2">
              <Typography variant="h5" className="flex items-center gap-3 ">
                User Form{" "}
                <span className="rounded-md bg-red-400 px-2 text-xs font-medium uppercase text-white">
                  {values.fetchType}
                </span>
              </Typography>
            </div>
            <div className="col-span-2 w-full ">
              <Input
                value={values.nama}
                error={errors.nama && touched.nama ? true : false}
                type="text"
                name="nama"
                onBlur={handleBlur}
                onChange={handleChange}
                label={errors.nama && touched.nama ? errors.nama : "Nama User"}
                size="md"
              />
            </div>
            <div className="w-full">
              <Input
                value={values.email}
                error={errors.email && touched.email ? true : false}
                type="text"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label={
                  errors.email && touched.email ? errors.email : "Email User"
                }
                size="md"
              />
            </div>
            <div className="w-full">
              <Input
                value={values.lahir}
                error={errors.lahir && touched.lahir ? true : false}
                type="date"
                name="lahir"
                onBlur={handleBlur}
                onChange={handleChange}
                disabled={values.fetchType === "add" ? true : false}
                label={
                  errors.lahir && touched.lahir ? errors.lahir : "Tanggal Lahir"
                }
                size="md"
              />
            </div>
            <div className="w-full">
              <Input
                value={values.phone}
                error={errors.phone && touched.phone ? true : false}
                type="text"
                name="phone"
                onBlur={handleBlur}
                onChange={handleChange}
                disabled={values.fetchType === "add" ? true : false}
                label={
                  errors.phone && touched.phone ? errors.phone : "Nomor Telepon"
                }
                size="md"
              />
            </div>
            <div className="w-full">
              <Input
                value={values.username}
                error={errors.username && touched.username ? true : false}
                type="text"
                name="username"
                onBlur={handleBlur}
                onChange={handleChange}
                disabled={values.fetchType === "add" ? true : false}
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
                disabled={values.fetchType === "add" ? true : false}
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
                Buat User
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
      <Card className="w-2/5">
        <CardBody>
          <Typography variant="h5" className="flex items-center gap-3 ">
            User Value
            <span className="rounded-md bg-red-400 px-2 text-xs font-medium uppercase text-white">
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
