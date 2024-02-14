import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/img/Logo.png";
function Logo() {
  const path = useLocation().pathname;

  return (
    <Link className="w-[91px] h-[53px] " to={`${path === "/" ? "/" : "/home"}`}>
      <img src={logo} alt="logo" className="img-cover" />
    </Link>
  );
}

export default Logo;
