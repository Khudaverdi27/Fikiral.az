import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to={"/"} className="w-[130px] py-[10px] text-[28px] cursor-pointer">
      Fikiral
    </Link>
  );
}

export default Logo;
