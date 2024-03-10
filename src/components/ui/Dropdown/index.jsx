import React, { useState } from "react";
import { Dropdown, Space } from "antd";
import { GrClose } from "react-icons/gr";
import { LineLoading } from "../../widget/Loading/ThinkSkeleton";

const DropdownMenu = ({
  dropName,
  loading,
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
    label:
      loading && !profilImg ? (
        <LineLoading />
      ) : (
        <span key={index}>
          {!item.id && index === 0 && (
            <div className="flex items-center justify-between pt-2 pb-5  text-[15px] font-[500] ">
              <h1 className="cursor-auto">{item.name}</h1>
              <button onClick={() => setOpen(false)}>
                <GrClose className="!text-black" />
              </button>
            </div>
          )}

          {item.title}
        </span>
      ),
  }));

  return (
    <div className="flex items-center">
      <Dropdown
        trigger={["click"]}
        overlayClassName={`${classes} bg-white rounded-md fixed `}
        placement={placement ? placement : "bottom"}
        menu={{
          items,
        }}
        onOpenChange={handleOpenChange}
        open={open}
      >
        <span>
          <Space className="whitespace-nowrap font-[500]">
            {profilImg && (
              <figure className="size-11">
                {typeof profilImg === "string" ? (
                  <span className="size-full text-2xl bg-gray-300 border-gray-500 rounded-full border text-indigo-500 flex items-center justify-center">
                    {profilImg}
                  </span>
                ) : (
                  <img className="img-cover" src={`${profilImg}`} alt="" />
                )}
              </figure>
            )}
            {dropName}
          </Space>
        </span>
      </Dropdown>
    </div>
  );
};
export default DropdownMenu;
