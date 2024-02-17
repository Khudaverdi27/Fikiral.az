import { LoadingSpin } from "../../widget/Loading/ThinkSkeleton";

function Section({ title, children, loading }) {
  return (
    <section>
      {loading ? (
        <LoadingSpin />
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
