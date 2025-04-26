import { GoHome, GoPlus } from "react-icons/go";
import { RiSettings4Line } from "react-icons/ri";

type Route = {
  pathname: string;
  label: string;
  icon?: React.ReactElement;
  isSideBar?: boolean;
};

type Routes = { [k: string]: Route };

export const routes: Routes = {
  signIn: {
    pathname: "/sign-in",
    label: "Sign In",
  },
  signUp: {
    pathname: "/sign-up",
    label: "Sign Up",
  },
  dashboard: {
    pathname: "/dashboard",
    label: "Dashboard",
    icon: <GoHome className="text-[20px]" strokeWidth={0.4} />,
    isSideBar: true,
  },
  create: {
    pathname: "/polls/create",
    label: "Create",
    icon: <GoPlus className="text-[20px]" strokeWidth={0.4} />,
    isSideBar: true,
  },
  settings: {
    pathname: "/settings",
    label: "Settings",
    icon: <RiSettings4Line className="text-[20px]" strokeWidth={0.1} />,
    isSideBar: true,
  },
} as const;

const sidebarRoutes = Object.entries(routes).reduce((acc, [key, route]) => {
  if (route.isSideBar) {
    acc[key] = route;
  }
  return acc;
}, {} as Routes);

export const sidebarRoutesArray = Object.values(sidebarRoutes);

export const getRoute = (pathname: string): Route | undefined => {
  return Object.values(routes).find((route) => route.pathname === pathname);
};
