import { setOpenConfigurator, useMaterialTailwindController } from "@/context";
import { getAllDataTable } from "@/context/table";
import routes from "@/routes";
import { getBalance } from "@/store/actions";
import { setAlert } from "@/store/slices/main";
import AlertBar from "@/widgets/alert";
import {
  Configurator,
  DashboardNavbar,
  Footer,
  Sidenav,
} from "@/widgets/layout";
import Loading from "@/widgets/loading";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController(),
    alert = useSelector((state) => state.main.alert),
    isLoading = useSelector((state) => state.main.loading),
    dispatcher = useDispatch(),
    { sidenavType } = controller;

  useEffect(() => {
    getAllDataTable(dispatcher);
    dispatcher(getBalance());
  }, []);

  return (
    <div className="min-h-screen bg-[#19cbd1]">
      <Sidenav routes={routes} brandImg={"/img/logo.png"} />
      <AlertBar
        type={alert.type}
        show={alert.show}
        message={alert.message}
        withTimeout
        setShow={(data) => {
          dispatcher(
            setAlert({
              show: data.show,
              type: "",
              message: "Message belum diatur!",
            })
          );
        }}
      />
      <Loading isLoading={isLoading} />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element }) => (
                <Route exact path={path} element={element} />
              ))
          )}
        </Routes>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
