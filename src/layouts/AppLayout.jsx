import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
function AppLayout({ children }) {
  return (
    <main>
      <Header />
      <section className=" py-[25px] px-[150px] mx-auto h-full max-w-[1340px] ">
        {children}
      </section>

      <Footer />
    </main>
  );
}

export default AppLayout;
