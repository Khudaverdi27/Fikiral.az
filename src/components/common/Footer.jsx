import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

function Footer() {
  return (
    <footer className=" px-[150px] py-10 text-white backdrop-brightness-40 mt-28">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-[32px] font-semibold ">
            Yeni biznesə fikrini doğruldaraq başla!
          </p>
          <span className="text-sm">© 2024 Fikiral</span>
        </div>
        <div className="flex gap-x-[75px] cursor-pointer">
          <div className="space-y-2">
            <h6 className="text-sm font-semibold">Haqqımızda</h6>
            <Link to={"/"} className="text-xs">
              Fikiral
            </Link>
            <p className="text-xs">Yardım mərkəzi</p>
          </div>
          <div className="space-y-2 cursor-pointer">
            <h6 className="text-sm font-semibold ml-2">Əlaqə</h6>
            <p className="text-xs ml-2 ">info@fikiral.az</p>

            <span className="flex space-x-3 ">
              <FaFacebookF className="hover:text-white text-primaryGray size-6" />
              <FaInstagram className="hover:text-white text-primaryGray size-6" />
              <FaLinkedinIn className="hover:text-white text-primaryGray size-6" />
              <FaXTwitter className="hover:text-white text-primaryGray size-6" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
