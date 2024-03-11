import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import Logo from "./Logo";
import { getStorage } from "../../utils/helpers";

function Footer() {
  const token = getStorage("token");
  const date = new Date().getFullYear();
  return (
    <footer className="  text-white  px-[150px] py-5 bg-[#E7E8F1]  mt-28">
      <div className="border-b border-primaryGray">
        <div className="flex justify-center">
          <div className="flex w-full 2xl:justify-around justify-between pb-2  max-w-[1040px]">
            <Logo />
            <div className="space-y-2">
              <h6 className="text-sm font-semibold text-black">Haqqımızda</h6>
              <Link
                to={`${token.length !== 0 ? "/home" : "/"}`}
                className="text-xs text-primaryGray"
              >
                Fikiral
              </Link>
            </div>
            <div className="space-y-2">
              <h6 className="text-sm font-semibold text-black">Dəstək</h6>
              <p className="text-xs text-primaryGray">Yardım</p>
              <p className="text-xs text-primaryGray">
                Tez-tez verilən suallar
              </p>
              <p className="text-xs text-primaryGray">Məxfilik qaydaları</p>
            </div>
            <div className="space-y-2 cursor-pointer">
              <h6 className="text-sm font-semibold  text-black">Əlaqə</h6>
              <Link
                target="_blank"
                to={"mailto:info@fikiral.az"}
                rel="noopener noreferrer"
                className="text-xs  text-primaryGray"
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
                  <FaInstagram className="text-[#232323] hover:text-indigo-500 size-6" />
                </Link>
                <Link
                  to={"https://www.linkedin.com/company/fikiralaz/ "}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedinIn className="text-[#232323] hover:text-indigo-500 size-6" />
                </Link>

                <Link
                  to={
                    "https://www.facebook.com/profile.php?id=61556776975297&mibextid=eQY6cl "
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF className="text-[#232323] hover:text-indigo-500 size-6" />
                </Link>
                <Link
                  to={"https://x.com/fikiralaz?s=11&t=5frakKLjivhk-NIIvQNMiw"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaXTwitter className="text-[#232323] hover:text-indigo-500 size-6" />
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
      <span className="text-sm text-[#232323]">© {date} Fikiral</span>
    </footer>
  );
}

export default Footer;
