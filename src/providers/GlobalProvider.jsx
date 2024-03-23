import { useRoutes } from "react-router-dom";
import { routes } from "../routers/Routes";
import Scrollup from "../components/ui/Scroll";
import { useNetworkState } from "@uidotdev/usehooks";
import { Result } from "antd";
function GlobalProvider() {
  const RouterComponent = () => useRoutes(routes);
  const network = useNetworkState();

  return (
    <>
      {network.online ? (
        <>
          <RouterComponent />
          <Scrollup />
        </>
      ) : (
        <Result
          status="404"
          title="502 Bad gateway"
          subTitle="Internet bağlantınız kəsildi"
        />
      )}
    </>
  );
}

export default GlobalProvider;
