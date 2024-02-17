import React from "react";
import ContentLoader from "react-content-loader";

const ThinkLoader = (props) => (
  <ContentLoader
    speed={2}
    width={370}
    height={296}
    viewBox="0 0 370 296"
    backgroundColor="#f3f3f3"
    foregroundColor="#E7E8F1"
    {...props}
  >
    <rect x="92" y="23" rx="3" ry="3" width="135" height="27" />
    <circle cx="46" cy="41" r="38" />
    <rect x="211" y="149" rx="0" ry="0" width="2" height="1" />
    <rect x="50" y="151" rx="0" ry="0" width="16" height="0" />
    <rect x="204" y="156" rx="0" ry="0" width="11" height="1" />
    <rect x="250" y="23" rx="3" ry="3" width="34" height="27" />
    <rect x="12" y="85" rx="0" ry="0" width="69" height="18" />
    <rect x="91" y="101" rx="0" ry="0" width="15" height="0" />
    <rect x="100" y="85" rx="0" ry="0" width="69" height="18" />
    <rect x="10" y="117" rx="0" ry="0" width="278" height="18" />
    <rect x="11" y="148" rx="0" ry="0" width="278" height="18" />
    <rect x="10" y="180" rx="0" ry="0" width="278" height="18" />
    <rect x="8" y="213" rx="0" ry="0" width="278" height="18" />
    <rect x="8" y="241" rx="0" ry="0" width="108" height="18" />
    <rect x="177" y="242" rx="0" ry="0" width="109" height="18" />
  </ContentLoader>
);

export default ThinkLoader;

export const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={400}
    height={160}
    viewBox="0 0 400 160"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="-12" y="11" rx="3" ry="3" width="52" height="6" />
  </ContentLoader>
);
