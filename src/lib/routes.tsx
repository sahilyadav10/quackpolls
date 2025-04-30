import { GoHome, GoPlus } from "react-icons/go";
import { RiSettings4Line } from "react-icons/ri";

type Route = {
  pathname: string;
  label: string;
  icon?: React.ReactElement;
  isSideBar?: boolean;
};

export const routes = {
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
  results: {
    pathname: "/polls/{id}",
    label: "Poll Info",
    isSideBar: false,
  },
  settings: {
    pathname: "/settings",
    label: "Settings",
    icon: <RiSettings4Line className="text-[20px]" strokeWidth={0.1} />,
    isSideBar: true,
  },
} satisfies Record<string, Route>;

export const sidebarRoutesArray = Object.values(routes).filter(
  (route: Route): route is Route & { isSideBar: true } => {
    return route.isSideBar === true;
  }
);

export const getRoute = (pathname: string): Route | undefined => {
  return Object.values(routes).find((route) => route.pathname === pathname);
};
