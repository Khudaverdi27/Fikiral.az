function Section({ title, children }) {
  return (
    <section>
      <h4 className="text-2xl text-primaryGray font-semibold mt-5 mb-6">
        {title}
      </h4>

      <div>{children}</div>
    </section>
  );
}

export default Section;
