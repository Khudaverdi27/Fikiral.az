import AppLayout from "../layouts/AppLayout";
import ErrorPage from "../pages/error/ErrorPage";
import HomePage from "../pages/home/HomePage";

export const routes = [
  { path: "/", element: <HomePage />, layout: "AppLayout" },
  { path: "*", element: <ErrorPage />, layout: "AppLayout" },
];

routes.map((route) => {
  if (route.layout === "AppLayout") {
    route.element = <AppLayout>{route.element}</AppLayout>;
  }
  return route;
});
