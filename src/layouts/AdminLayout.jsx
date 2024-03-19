function AdminLayout({ children }) {
  return (
    <main>
      <section className="h-full max-w-[1340px] ">{children}</section>
    </main>
  );
}

export default AdminLayout;
