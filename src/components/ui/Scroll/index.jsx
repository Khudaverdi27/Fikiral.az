import React from "react";
import { FloatButton } from "antd";
import { FaArrowUp } from "react-icons/fa6";

const Scrollup = () => (
  <FloatButton.BackTop
    className="bg-white "
    visibilityHeight={50}
    icon={<FaArrowUp className="text-primaryGray text-bold hover:text-black" />}
  />
);
export default Scrollup;
