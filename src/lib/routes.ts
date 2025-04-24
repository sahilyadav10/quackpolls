type Route = {
  pathname: string;
  label: string;
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
} as const;

export const getRoute = (pathname: string): Route | undefined => {
  return Object.values(routes).find((route) => route.pathname === pathname);
};
