import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link className="w-[91px] h-[53px] ml-5" to={"/"}>
      <img src="./public/logo.png" alt="logo" className="img-cover" />
    </Link>
  );
}

export default Logo;
