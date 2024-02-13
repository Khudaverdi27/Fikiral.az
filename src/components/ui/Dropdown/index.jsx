import React, { useState } from "react";
import { Dropdown, Space } from "antd";
import { GrClose } from "react-icons/gr";

const DropdownMenu = ({
  dropName,
  profilImg = false,
  dropDownItems = [],
  classes = false,
  placement = false,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (nextOpen, info) => {
    if (info.source === "trigger" || nextOpen) {
      setOpen(nextOpen);
    }
  };

  window.addEventListener("scroll", () => {
    setOpen(false);
  });

  const items = dropDownItems.map((item, index) => ({
    key: index,
    label: (
      <span key={index}>
        {!item.id && index === 0 && (
          <div className="flex items-center justify-between pt-2 pb-5  text-[15px] font-[500] ">
            <h1 className="cursor-auto">{item.name}</h1>
            <button onClick={() => setOpen(false)}>
              <GrClose className="!text-black" />
            </button>
          </div>
        )}
        <a rel="noopener noreferrer" href="#">
          {item.title}
        </a>
      </span>
    ),
  }));

  return (
    <div className="flex items-center">
      {profilImg && (
        <figure className="size-11 mr-2">
          <img className="img-cover" src={`${profilImg}`} alt="" />
        </figure>
      )}
      <Dropdown
        trigger={["click"]}
        overlayClassName={`${classes} bg-white rounded-md fixed !top-[85px]`}
        placement={placement ? placement : "bottom"}
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
