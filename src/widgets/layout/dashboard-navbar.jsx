import { useLocation, Link } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Chip,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/context";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController(),
    { fixedNavbar, openSidenav } = controller,
    { pathname } = useLocation(),
    { adminToken: token, adminData } = useSelector((state) => state.auth),
    [layout, page] = pathname.split("/").filter((el) => el !== "");

  // useEffect(() => {
  //   return () => {
  //     console.log(token);
  //   };
  // }, [token]);

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? "mt-1" : ""
            }`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {page}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray">
            {page}
          </Typography>
        </div>
        <div className="flex items-center">
          <div className="mr-auto md:mr-4 md:w-56">
            <Input label="Type here" />
          </div>
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
          {token === "" ? (
            <Link to="/auth/sign-in">
              <Button
                variant="text"
                color="blue-gray"
                className="hidden items-center gap-1 px-4 xl:flex"
              >
                <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
                Sign In
              </Button>
              <IconButton
                variant="text"
                color="blue-gray"
                className="grid xl:hidden"
              >
                <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
              </IconButton>
            </Link>
          ) : (
            <Menu>
              <MenuHandler>
                <Button color="light-blue">
                  {adminData.essentials.username}
                </Button>
              </MenuHandler>
              <MenuList>
                <MenuItem
                  color="light-blue"
                  className="text-start text-gray-800"
                >
                  <UserCircleIcon className="mx-auto aspect-square h-24 rounded-full" />
                  <p className="text-center text-lg font-medium leading-6">
                    {adminData.nama}
                  </p>
                </MenuItem>
                <MenuItem
                  color="light-blue"
                  className="p-0 text-start text-base text-gray-800"
                >
                  <Chip value={adminData._id} />
                </MenuItem>
                <MenuItem className="py-1 mt-5">
                  <div className="py-1 pl-5">{adminData.email}</div>
                </MenuItem>
                <MenuItem className="py-1">
                  <div className="pl-5">
                    {adminData.essentials.username}
                  </div>
                </MenuItem>
                <MenuItem className="py-1">
                  <div className="pl-5">{token !== "" ? "Token Exist" : "User"}</div>
                </MenuItem>
              </MenuList>
            </Menu>
          )}
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => setOpenConfigurator(dispatch, true)}
          >
            <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
