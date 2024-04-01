import AdminLayout from "../layouts/AdminLayout";
import AppLayout from "../layouts/AppLayout";
import PendingLayout from "../layouts/PendingLayout";
import AboutPage from "../pages/about/about";
import AboutSecurity from "../pages/about/About-security";
import AdminPage from "../pages/admin/container";
import CategoryPage from "../pages/categories/CategoryPage";
import ThinkFromClipboard from "../pages/clipboardResult/ThinkFromClipBoard";
import EditProfile from "../pages/edit";
import AuthWait from "../pages/error/authWait";
import ErrorPage from "../pages/error/ErrorPage";
import FavoritePage from "../pages/favorites/FavoritePage";
import HomePage from "../pages/home/HomePage";
import WelcomePage from "../pages/welcome";

export const routes = [
  { path: "/", element: <WelcomePage />, layout: "AppLayout" },
  { path: "/home", element: <HomePage />, layout: "AppLayout" },
  { path: "/favorites", element: <FavoritePage />, layout: "AppLayout" },
  { path: "/about", element: <AboutPage />, layout: "AppLayout" },
  {
    path: "/privacy_policy",
    element: <AboutSecurity />,
    layout: "AppLayout",
  },
  {
    path: "/categories/:slug",
    element: <CategoryPage />,
    layout: "AppLayout",
  },
  { path: "/edit-my-profile", element: <EditProfile />, layout: "AppLayout" },
  {
    path: "/think/:slug",
    element: <ThinkFromClipboard />,
    layout: "AppLayout",
  },
  {
    path: "/dashboard",
    element: <AdminPage />,
    layout: "AdminLayout",
  },
  {
    path: "/auth",
    element: <AuthWait />,
    layout: "authWaiting",
  },
  { path: "*", element: <ErrorPage />, layout: "AppLayout" },
];

routes.map((route) => {
  if (route.layout === "AppLayout") {
    route.element = <AppLayout>{route.element}</AppLayout>;
  } else if (route.layout === "AdminLayout") {
    route.element = <AdminLayout>{route.element}</AdminLayout>;
  } else {
    route.element = <PendingLayout>{route.element}</PendingLayout>;
  }
  return route;
});
