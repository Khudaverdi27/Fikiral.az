import { useEffect } from "react";

function AdminLayout({ children }) {
  useEffect(() => {
    document.body.classList.remove("bg-heroBg");
  }, []);
  return (
    <main className="bg-[#F9F9F9]">
      <section className="h-full w-full ">{children}</section>
    </main>
  );
}

export default AdminLayout;
