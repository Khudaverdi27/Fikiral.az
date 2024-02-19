import AppLayout from "../layouts/AppLayout";
import CategoryPage from "../pages/categories/CategoryPage";
import ErrorPage from "../pages/error/ErrorPage";
import FavoritePage from "../pages/favorites/FavoritePage";
import HomePage from "../pages/home/HomePage";
import WelcomePage from "../pages/welcome";

export const routes = [
  { path: "/", element: <WelcomePage />, layout: "AppLayout" },
  { path: "/home", element: <HomePage />, layout: "AppLayout" },
  { path: "/favorites", element: <FavoritePage />, layout: "AppLayout" },
  {
    path: "/categories/:id:/slug",
    element: <CategoryPage />,
    layout: "AppLayout",
  },
  { path: "*", element: <ErrorPage />, layout: "AppLayout" },
];

routes.map((route) => {
  if (route.layout === "AppLayout") {
    route.element = <AppLayout>{route.element}</AppLayout>;
  }
  return route;
});
