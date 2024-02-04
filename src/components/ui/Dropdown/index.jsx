import React from "react";
import { Dropdown, Space } from "antd";

const DropdownMenu = ({
  dropName,
  profilImg = false,
  name1 = "name1",
  name2 = "name2",
}) => {
  const items = [
    {
      key: "1",
      label: (
        <a rel="noopener noreferrer" href="#">
          {name1}
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a rel="noopener noreferrer" href="#">
          {name2}
        </a>
      ),
    },
  ];

  return (
    <div className="flex items-center pl-5">
      {profilImg && (
        <figure className="size-7 mr-2">
          <img className="img-cover rounded-full" src={`${profilImg}`} alt="" />
        </figure>
      )}
      <Dropdown
        menu={{
          items,
        }}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space className="whitespace-nowrap">{dropName}</Space>
        </a>
      </Dropdown>
    </div>
  );
};
export default DropdownMenu;
