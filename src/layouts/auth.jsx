import { Routes, Route } from "react-router-dom";
import {
  ChartPieIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  TableCellsIcon,
} from "@heroicons/react/24/solid";
import { Navbar, Footer } from "@/widgets/layout";
import routes from "@/routes";
import Loading from "@/widgets/loading";
import AlertBar from "@/widgets/alert";
import { useDispatch, useSelector } from "react-redux";

export function Auth() {
  const navbarRoutes = [
      {
        name: "dashboard",
        path: "/dashboard/home",
        icon: ChartPieIcon,
      },
      {
        name: "profile",
        path: "/dashboard/profile",
        icon: UserIcon,
      },
      {
        name: "tables",
        path: "/dashboard/tables",
        icon: TableCellsIcon,
      },
      {
        name: "sign in",
        path: "/auth/sign-in",
        icon: ArrowRightOnRectangleIcon,
      },
    ],
    alert = useSelector((state) => state.main.alert),
    isLoading = useSelector((state) => state.main.loading),
    dispatch = useDispatch();

  return (
    <div className="relative min-h-screen w-full">
      <AlertBar
        type={alert.type}
        show={alert.show}
        message={alert.message}
        withTimeout
        setShow={(data) => {
          dispatch({
            type: "main/setAlert",
            payload: {
              show: data,
              type: "",
              message: "Message belum diatur!",
            },
          });
        }}
      />
      <Loading isLoading={isLoading} />
      <div className="container relative z-40 mx-auto p-4">
        <Navbar routes={navbarRoutes} />
      </div>
      <Routes>
        {routes.map(
          ({ layout, pages }) =>
            layout === "auth" &&
            pages.map(({ path, element }) => (
              <Route exact path={path} element={element} />
            ))
        )}
      </Routes>
      <div className="container absolute bottom-8 left-2/4 z-10 mx-auto -translate-x-2/4 text-white">
        <Footer />
      </div>
    </div>
  );
}

Auth.displayName = "/src/layout/Auth.jsx";

export default Auth;
