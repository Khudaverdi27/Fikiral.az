import { Link } from "react-router-dom";
import logo from "../../assets/img/Logo.svg";
import { getStorage } from "../../utils/helpers";
import { useMediaQuery } from "@uidotdev/usehooks";
function Logo() {
  const token = getStorage("token");
  const isMobile = useMediaQuery("only screen and (max-width : 480px)");
  return (
    <Link
      className={`shrink-0 ${
        isMobile ? "w-[101px] mr-5" : "w-[131px]"
      } h-[43px] `}
      to={`${token.length !== 0 ? "/home" : "/"}`}
    >
      <img src={logo} alt="logo" className="img-cover" />
    </Link>
  );
}

export default Logo;
