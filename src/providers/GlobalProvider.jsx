import { useRoutes } from "react-router-dom";
import { routes } from "../routers/Routes";
import Scrollup from "../components/ui/Scroll";

function GlobalProvider() {
  const RouterComponent = () => useRoutes(routes);
  return (
    <>
      <RouterComponent />
      <Scrollup />
    </>
  );
}

export default GlobalProvider;
