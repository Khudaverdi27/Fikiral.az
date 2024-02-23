import { Link } from "react-router-dom";
import logo from "../../assets/img/Logo.png";
import { getStorage } from "../../utils/helpers";
function Logo() {
  const token = getStorage("token");

  return (
    <Link className="w-[91px] h-[53px] " to={`${!token ? "/" : "/home"}`}>
      <img src={logo} alt="logo" className="img-cover" />
    </Link>
  );
}

export default Logo;
