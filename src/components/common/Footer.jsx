import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import Logo from "./Logo";

function Footer() {
  return (
    <footer className="  text-white  py-[25px]  bg-[#E7E8F1] px-[150px] mt-28">
      <div className="flex justify-between border-b border-primaryGray pb-2">
        <Logo />

        <div className="space-y-2">
          <h6 className="text-sm font-semibold text-black">Haqqımızda</h6>
          <Link to={"/"} className="text-xs text-primaryGray">
            Fikiral
          </Link>
        </div>
        <div className="space-y-2">
          <h6 className="text-sm font-semibold text-black">Dəstək</h6>
          <p className="text-xs text-primaryGray">Yardım</p>
          <p className="text-xs text-primaryGray">Tez-tez verilən suallar</p>
          <p className="text-xs text-primaryGray">Məxfilik qaydaları</p>
        </div>
        <div className="space-y-2 cursor-pointer">
          <h6 className="text-sm font-semibold ml-2 text-black">Əlaqə</h6>
          <p className="text-xs ml-2 text-primaryGray">info@fikiral.az</p>

          <span className="flex space-x-3 ">
            <FaFacebookF className="hover:text-[#232323] text-[#858585] size-6" />
            <FaInstagram className="hover:text-[#232323] text-[#858585] size-6" />
            <FaLinkedinIn className="hover:text-[#232323] text-[#858585] size-6" />
            <FaXTwitter className="hover:text-[#232323] text-[#858585] size-6" />
          </span>
        </div>
      </div>

      <span className="text-sm text-[#232323]">© 2024 Fikiral</span>
    </footer>
  );
}

export default Footer;
