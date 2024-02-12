import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
function AppLayout({ children }) {
  return (
    <main className=" h-full max-w-[1440px] mx-auto  py-[25px] px-[150px]">
      <Header />
      <section>{children}</section>

      <Footer />
    </main>
  );
}

export default AppLayout;
