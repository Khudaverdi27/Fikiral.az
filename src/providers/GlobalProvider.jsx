import { useRoutes } from "react-router-dom";
import { routes } from "../routers/Routes";

function GlobalProvider() {
  const RouterComponent = () => useRoutes(routes);
  return (
    <>
      <RouterComponent />
    </>
  );
}

export default GlobalProvider;
