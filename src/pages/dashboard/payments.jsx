import Pagination from "@/widgets/micros/pagination";
import MainTable from "@/widgets/tables";
import {
  Card,
  CardBody
} from "@material-tailwind/react";
import { createElement, useState } from "react";
import { useSelector } from "react-redux";

export function Payments({ paymentData: { icon, value, titles } }) {
  const { data, pages } = useSelector((state) => state.table.payment),
    [activePage, setActivePage] = useState(1);
  return (
    <div className="mx-auto mb-20 mt-5 flex w-full flex-col gap-8">
      <div className="mt-10 space-y-10">
        <MainTable
          identifier={value}
          icon={createElement(icon, {
            className: "w-6 h-6",
          })}
          activeIndex={() => {
            return activePage;
          }}
          tableData={data}
          tableTitle={titles}
        />
        <Card>
          <CardBody className="py-2">
            <Pagination
              identifier={value}
              pages={() => pages}
              activeIndex={(index) => setActivePage(index)}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Payments;
