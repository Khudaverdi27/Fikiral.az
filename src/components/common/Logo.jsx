import { Link } from "react-router-dom";
import logo from "../../assets/img/Logo.svg";
import { getStorage } from "../../utils/helpers";
function Logo() {
  const token = getStorage("token");

  return (
    <Link
      className="w-[131px] h-[53px] "
      to={`${token.length !== 0 ? "/home" : "/"}`}
    >
      <img src={logo} alt="logo" className="img-cover" />
    </Link>
  );
}

export default Logo;
