import ContentLoader from "react-content-loader";
import loadings from "../../../assets/img/loading.svg";
export const ThinkCardLoading = (props) => (
  <ContentLoader
    animate={true}
    speed={2}
    width={400}
    height={160}
    viewBox="0 0 400 160"
    backgroundColor="#e6e6e6"
    foregroundColor="#e3e3e3"
    {...props}
  >
    <rect x="93" y="117" rx="0" ry="0" width="0" height="1" />
    <rect x="-13" y="15" rx="0" ry="0" width="173" height="37" />
    <rect x="4" y="94" rx="0" ry="0" width="120" height="33" />
    <rect x="49" y="57" rx="0" ry="0" width="0" height="4" />
    <rect x="156" y="94" rx="0" ry="0" width="65" height="31" />
    <rect x="241" y="18" rx="0" ry="0" width="45" height="33" />
    <rect x="237" y="92" rx="0" ry="0" width="49" height="31" />
  </ContentLoader>
);

export default ThinkCardLoading;

export const LineLoading = (props) => (
  <ContentLoader
    animate={true}
    speed={2}
    width={400}
    height={160}
    viewBox="0 0 400 160"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="4" y="113" rx="3" ry="3" width="260" height="35" />
    <rect x="5" y="60" rx="3" ry="3" width="260" height="35" />
    <rect x="5" y="8" rx="3" ry="3" width="260" height="35" />
  </ContentLoader>
);

export const LoadingSpin = () => {
  return (
    <div className="flex justify-center">
      <img src={loadings} alt="Loading..." />
    </div>
  );
};
