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
import { createElement, useState } from "react";
import { Formik } from "formik";
import { setValue, submitHandler } from "@/context/table";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@/widgets/micros/pagination";

export function Tables() {
  const { user, video, series } = useSelector((state) => state.table),
    { adminToken } = useSelector((state) => state.auth),
    dispatch = useDispatch(),
    [activePage, setActivePage] = useState({
      user: 1,
      video: 1,
      series: 1,
    });

  return (
    <div className="my-5 flex flex-col">
      <Tabs value="user">
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
                    submitHandler({
                      values,
                      actions,
                      dispatch,
                      adminToken,
                      identifier: value.toLowerCase(),
                    });
                    return false;
                  }}
                  validationSchema={validations}
                >
                  <div className="space-y-10">
                    {createElement(form, {
                      user: user.data.flat(1),
                      video: video.data.flat(1),
                      series: series.data.flat(1),
                    })}
                    <MainTable
                      identifier={value}
                      icon={createElement(icon, {
                        className: "w-6 h-6",
                      })}
                      tableData={setValue(value, {
                        user: user.data,
                        video: video.data,
                        series: series.data,
                      })}
                      activeIndex={() => {
                        switch (value.toLowerCase()) {
                          case "video":
                            return activePage.video;
                          case "series":
                            return activePage.series;
                          case "user":
                            return activePage.user;
                          default:
                            return 1;
                        }
                      }}
                      tableTitle={titles}
                    />
                    <Card>
                      <CardBody className="py-2">
                        <Pagination
                          identifier={value}
                          pages={(data) => {
                            switch (data.toLowerCase()) {
                              case "video":
                                return video.pages;
                              case "series":
                                return series.pages;
                              case "user":
                                return user.pages;
                              default:
                                return [];
                            }
                          }}
                          activeIndex={(index) => {
                            switch (value.toLowerCase()) {
                              case "video":
                                setActivePage((prev) => ({
                                  ...prev,
                                  video: index,
                                }));
                                break;
                              case "series":
                                setActivePage((prev) => ({
                                  ...prev,
                                  series: index,
                                }));
                                break;
                              case "user":
                                setActivePage((prev) => ({
                                  ...prev,
                                  user: index,
                                }));
                                break;
                              default:
                                return;
                            }
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
