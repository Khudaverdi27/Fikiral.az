import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link
      to={"/"}
      className="w-[130px] pt-[10px] text-[28px] cursor-pointer font-Biryani"
    >
      Fikiral
    </Link>
  );
}

export default Logo;
