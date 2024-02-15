import loadings from "../../../assets/img/loading.svg";
function Section({ title, children, loading }) {
  return (
    <section>
      {loading ? (
        <div className="flex justify-center">
          <img src={loadings} alt="Loading..." />
        </div>
      ) : (
        <>
          <h4 className="text-2xl text-primaryGray font-semibold mt-5 mb-6">
            {title}
          </h4>

          <div>{children}</div>
        </>
      )}
    </section>
  );
}

export default Section;
