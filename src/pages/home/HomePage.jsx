import Header from "../../components/common/Header";
import MainSection from "../../components/widget/Section/MainSection";

function HomePage() {
  return (
    <main className="bg-primary h-full py-[25px] px-[150px] max-w-[1440px] mx-auto space-y-8">
      <Header />
      <MainSection />
    </main>
  );
}

export default HomePage;
