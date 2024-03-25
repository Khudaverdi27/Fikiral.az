import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
function SupportFooter() {
  return (
    <div className="space-y-2 cursor-pointer ">
      <h6 className="text-sm font-semibold  text-black dark:text-white">
        Əlaqə
      </h6>
      <Link
        target="_blank"
        to={"mailto:info@fikiral.az"}
        rel="noopener noreferrer"
        className="text-xs  text-primaryGray dark:text-white"
      >
        info@fikiral.az
      </Link>
      <span className="flex space-x-3 ">
        <Link
          to={
            "https://www.instagram.com/fikiral.az?igsh=MWM1MDY3OWR4b2xtdg%3D%3D&utm_source=qr "
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="text-[#232323] dark:text-gray-500  hover:text-indigo-500 size-6 dark:hover:text-indigo-500 " />
        </Link>
        <Link
          to={"https://www.linkedin.com/company/fikiralaz/ "}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedinIn className="text-[#232323] dark:text-gray-500 hover:text-indigo-500 dark:hover:text-indigo-500  size-6" />
        </Link>

        <Link
          to={
            "https://www.facebook.com/profile.php?id=61556776975297&mibextid=eQY6cl "
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookF className="text-[#232323] dark:text-gray-500  hover:text-indigo-500 dark:hover:text-indigo-500  size-6" />
        </Link>
        <Link
          to={"https://x.com/fikiralaz?s=11&t=5frakKLjivhk-NIIvQNMiw"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaXTwitter className="text-[#232323] dark:text-gray-500  hover:text-indigo-500 dark:hover:text-indigo-500  size-6" />
        </Link>
      </span>
    </div>
  );
}

export default SupportFooter;
