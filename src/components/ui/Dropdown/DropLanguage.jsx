import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { Dropdown, Space } from "antd";
const items = [
  {
    label: "AZE",
    key: "0",
  },
  {
    label: "EN",
    key: "1",
  },

  {
    label: "RU",
    key: "3",
  },
];

function DropLanguage() {
  const [visible, setVisible] = useState(false);
  const [lang, setLang] = useState("Aze");

  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };

  // const handleLangChange = (e) => {
  //   console.log(e);
  // };
  return (
    <Dropdown
      open={visible}
      onOpenChange={handleVisibleChange}
      overlayClassName="dropLanguage"
      overlayStyle={{ width: "80px", textAlign: "center", height: "96px" }}
      menu={{
        items,
        selectable: true,
        defaultSelectedKeys: ["0"],
      }}
      trigger={["click"]}
      placement="bottom"
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          {lang}
          {visible ? <FaAngleDown /> : <FaAngleUp />}
        </Space>
      </a>
    </Dropdown>
  );
}
export default DropLanguage;
