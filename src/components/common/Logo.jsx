import { Link } from "react-router-dom";
import logo from "../../assets/img/Logo.png";
function Logo() {
  return (
    <Link className="w-[91px] h-[53px] ml-5" to={"/"}>
      <img src={logo} alt="logo" className="img-cover" />
    </Link>
  );
}

export default Logo;
