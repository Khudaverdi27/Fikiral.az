import { Link } from "react-router-dom";

function AboutFooter() {
  return (
    <div className="space-y-2 ">
      <h6 className="text-sm font-semibold dark:text-white text-black">
        Haqqımızda
      </h6>
      <Link to={"/about"} className="text-xs text-primaryGray dark:text-white">
        Fikiral
      </Link>
    </div>
  );
}

export default AboutFooter;
