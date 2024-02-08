import React, { useState } from "react";
import { Dropdown, Space } from "antd";
import { GrClose } from "react-icons/gr";

const DropdownMenu = ({
  dropName,
  profilImg = false,
  dropDownItems = [],
  classes = false,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (nextOpen, info) => {
    if (info.source === "trigger" || nextOpen) {
      setOpen(nextOpen);
    }
  };
  const items = dropDownItems.map((item, index) => ({
    key: index,
    label: (
      <span key={index}>
        {dropDownItems.length > 2 && index === 0 && (
          <div className="flex items-center justify-between pt-2 pb-5  text-[15px] font-[500] ">
            <h1 className="cursor-auto">{item.name}</h1>
            <button onClick={() => setOpen(false)}>
              <GrClose />
            </button>
          </div>
        )}
        <a
          rel="noopener noreferrer"
          href="#"
          className={`flex items-center space-x-4 text-[#858585] px-3 py-2 ${
            dropDownItems.length > 2
              ? "justify-between hover:bg-[#D9D9D9] rounded-[6px]"
              : ""
          }`}
        >
          {item.title}
        </a>
      </span>
    ),
  }));

  return (
    <div className="flex items-center">
      {profilImg && (
        <figure className="size-7 mr-2">
          <img className="img-cover" src={`${profilImg}`} alt="" />
        </figure>
      )}
      <Dropdown
        trigger={["click"]}
        overlayClassName={`${classes} bg-white rounded-md fixed !top-[120px]`}
        placement="bottom"
        menu={{
          items,
        }}
        onOpenChange={handleOpenChange}
        open={open}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space className="whitespace-nowrap font-[500]">{dropName}</Space>
        </a>
      </Dropdown>
    </div>
  );
};
export default DropdownMenu;
