import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

function Footer() {
  return (
    <footer className="  text-white bg-transparent mt-28">
      <div className="flex justify-between items-center">
        <div className="text-black">
          <p className="text-[32px] font-semibold ">
            Yeni biznesə fikrini doğruldaraq başla!
          </p>
          <span className="text-sm">© 2024 Fikiral</span>
        </div>
        <div className="flex gap-x-[75px] cursor-pointer ">
          <div className="space-y-2">
            <h6 className="text-sm font-semibold text-black">Haqqımızda</h6>
            <Link to={"/"} className="text-xs text-primaryGray">
              Fikiral
            </Link>
            <p className="text-xs text-primaryGray">Yardım mərkəzi</p>
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
      </div>
    </footer>
  );
}

export default Footer;
