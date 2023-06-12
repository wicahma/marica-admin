import {
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
  Card,
  CardBody,
} from "@material-tailwind/react";
import { tableTab } from "@/data";
import MainTable from "@/widgets/tables";
import { createElement, useEffect } from "react";
import { Formik } from "formik";
import { getAllDataTable, setValue } from "@/context/table";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@/widgets/micros/pagination";

export function Tables() {
  const dispatch = useDispatch(),
    { user, video, series } = useSelector((state) => state.table);

  useEffect(() => {
    return () => {
      getAllDataTable(dispatch);
    };
  }, []);

  return (
    <div className="my-5 flex flex-col">
      <Tabs value="series">
        <TabsHeader>
          {tableTab.map(({ label, value }) => (
            <Tab
              key={value}
              className="font-medium text-gray-800"
              value={value}
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {tableTab.map(
            ({ value, titles, icon, form, initValue, validations }) => (
              <TabPanel className=" mt-5" key={value} value={value}>
                <Formik
                  initialValues={initValue}
                  onSubmit={(values, actions) => {
                    console.log(values);
                    return false;
                  }}
                  validationSchema={validations}
                >
                  <div className="space-y-10">
                    {createElement(form, {
                      user,
                      video,
                      series,
                    })}
                    <MainTable
                      identifier={value}
                      icon={createElement(icon, {
                        className: "w-6 h-6",
                      })}
                      tableData={setValue(value, { user, video, series })}
                      tableTitle={titles}
                    />
                    <Card>
                      <CardBody className="py-2">
                        <Pagination
                          identifier={value}
                          data={(data) => {
                            switch (data.toLowerCase()) {
                              case "video":
                                return video;
                              case "series":
                                return series;
                              case "user":
                                return user;
                              default:
                                return [];
                            }
                          }}
                          activeIndex={(index) => console.log(index)}
                          pageData={(data) => {
                            // console.log(data);
                            return data;
                          }}
                        />
                      </CardBody>
                    </Card>
                  </div>
                </Formik>
              </TabPanel>
            )
          )}
        </TabsBody>
      </Tabs>
    </div>
  );
}

export default Tables;
