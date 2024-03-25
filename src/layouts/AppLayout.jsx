import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { useMediaQuery } from "@uidotdev/usehooks";
function AppLayout({ children }) {
  const isMobile = useMediaQuery("only screen and (max-width : 480px)");
  return (
    <main>
      <Header />
      <section
        className={`py-[25px]  mx-auto h-full max-w-[1340px] overflow-x-hidden ${
          isMobile ? "px-2" : "px-[150px]"
        }`}
      >
        {children}
      </section>

      <Footer />
    </main>
  );
}

export default AppLayout;
