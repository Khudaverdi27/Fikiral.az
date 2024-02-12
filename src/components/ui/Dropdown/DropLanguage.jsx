import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { Dropdown, Space } from "antd";
const items = [
  {
    label: "Aze",
    key: "0",
  },
  {
    label: "En",
    key: "1",
  },

  {
    label: "Ru",
    key: "3",
  },
];

function DropLanguage() {
  const [visible, setVisible] = useState(false);
  const [lang, setLang] = useState("Aze");

  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };

  const handleDropdownItemClick = (e) => {
    const key = e.key;
    const findLang = items.find((item) => item.key == key);
    setLang(findLang.label);
  };
  return (
    <Dropdown
      open={visible}
      onOpenChange={handleVisibleChange}
      overlayClassName="dropLanguage"
      overlayStyle={{ width: "80px", textAlign: "center", height: "96px" }}
      menu={{
        onClick: handleDropdownItemClick,
        items,
        selectable: true,
        defaultSelectedKeys: ["0"],
      }}
      trigger={["click"]}
      placement="bottom"
    >
      <a className="w-12" onClick={(e) => e.preventDefault()}>
        <Space>
          {lang}
          {visible ? <FaAngleUp /> : <FaAngleDown />}
        </Space>
      </a>
    </Dropdown>
  );
}
export default DropLanguage;
