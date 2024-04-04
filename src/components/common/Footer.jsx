import Logo from "./Logo";
import { useMediaQuery } from "@uidotdev/usehooks";
import AboutFooter from "./footerComponents/about";
import ContactFooter from "./footerComponents/contact";
import SupportFooter from "./footerComponents/support";

function Footer() {
  const date = new Date().getFullYear();
  const isMobile = useMediaQuery("only screen and (max-width : 480px)");
  const isTablet = useMediaQuery("only screen and (max-width : 768px)");
  const isLaptop = useMediaQuery("only screen and (max-width : 1115px)");
  return (
    <footer
      className={`text-white  ${
        isMobile || isTablet || isLaptop
          ? "px-[50px] overflow-x-hidden"
          : "px-[150px]"
      } py-5 bg-[#E7E8F1] dark:bg-[#22303c] mt-28`}
    >
      <div className="border-b border-primaryGray dark:border-white">
        {!isMobile && !isTablet && (isLaptop || !isLaptop) && (
          <div className="flex justify-center ">
            <div className="flex w-full 2xl:justify-around justify-between pb-2  ">
              <Logo />
              <AboutFooter />
              <ContactFooter />
              <SupportFooter />
            </div>
          </div>
        )}
        {(isMobile || isTablet) && (
          <div>
            <div className="flex justify-center mb-5">
              <Logo />
            </div>
            <div className="flex justify-between">
              <AboutFooter />
              <ContactFooter />
            </div>
            <div className="mb-5">
              <SupportFooter />
            </div>
          </div>
        )}
      </div>
      <span className="text-sm text-[#232323] dark:text-white">
        © {date} Fikiral
      </span>
    </footer>
  );
}

export default Footer;
