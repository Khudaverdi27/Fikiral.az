import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
function AppLayout({ children }) {
  return (
    <main className=" h-full max-w-[1440px] mx-auto  ">
      <Header />
      <section className="py-[25px] px-[150px] ">{children}</section>

      <Footer />
    </main>
  );
}

export default AppLayout;
