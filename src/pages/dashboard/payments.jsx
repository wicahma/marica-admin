import React, { createElement } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { Formik } from "formik";
import MainTable from "@/widgets/tables";

export function Payments({
  paymentData: { icon, value, data, titles, validations, initValue },
}) {
  return (
    <div className="mx-auto mb-20 mt-5 flex w-full flex-col gap-8">
      <Formik
        initialValues={initValue}
        onSubmit={(values, actions) => {
          console.log(values);
          return false;
        }}
        validationSchema={validations}
      >
        <div className="space-y-10">
          <Card>
            <CardBody>Form isian</CardBody>
          </Card>
          <Card>
            <CardHeader
              variant="gradient"
              color="light-green"
              className="mb-8 flex items-center justify-start gap-3 p-6 capitalize"
            >
              <Typography variant="h5">Payment Table</Typography>
            </CardHeader>
            <CardBody>
              {/* //TODO - Define Variable input to Main Table */}
              <MainTable
                identifier={value}
                icon={createElement(icon, {
                  className: "w-6 h-6",
                })}
                tableData={data}
                tableTitle={titles}
              />
            </CardBody>
          </Card>
        </div>
      </Formik>
    </div>
  );
}

export default Payments;
