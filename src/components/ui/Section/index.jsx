import { useSearchActions } from "../../../context/FormSearchProvider";
import { LoadingSpin } from "../../widget/Loading/ThinkSkeleton";

function Section({ title, children, loading }) {
  const { searchResponse } = useSearchActions();
  return (
    <section>
      {loading ? (
        <LoadingSpin />
      ) : (
        <>
          <h4 className="text-2xl text-primaryGray font-semibold mt-5 mb-6 dark:text-white">
            {searchResponse.length > 0 ? "Axtarış nəticələri" : title}
          </h4>

          <div>{children}</div>
        </>
      )}
    </section>
  );
}

export default Section;
