import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  ArrowRightOnRectangleIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Payments } from "@/pages/dashboard";
import { SignIn } from "@/pages/auth";
import { paymentTable } from "./data";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <CurrencyDollarIcon {...icon} />,
        name: "payments",
        path: "/payments",
        element: <Payments paymentData={paymentTable} />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
];

export default routes;
