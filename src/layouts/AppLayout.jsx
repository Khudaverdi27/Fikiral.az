import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
function AppLayout({ children }) {
  return (
    <main className="bg-primary h-full  max-w-[1440px] mx-auto space-y-8">
      <section className="py-[25px] px-[150px]">
        <Header />
        {children}
      </section>

      <Footer />
    </main>
  );
}

export default AppLayout;
