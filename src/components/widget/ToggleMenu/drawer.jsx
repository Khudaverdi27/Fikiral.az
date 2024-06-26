import React, { useState } from "react";
import { Drawer, Space } from "antd";
import { FaBars } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import DropLanguage from "../../ui/Dropdown/DropLanguage";
import MenuActions from "../../ui/MenuActions";
import { getStorage } from "../../../utils/helpers";
import Logo from "../../common/Logo";
import SaveBookmark from "../../ui/MenuActions/saveBookmark";
import DropProfile from "../../ui/Dropdown/DropProfile";
import { LoadingSpin } from "../Loading/ThinkSkeleton";
import { useMediaQuery } from "@uidotdev/usehooks";

const DrawerToggle = ({ loading, category }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const isMobile = useMediaQuery("only screen and (max-width : 480px)");
  const showDrawer = () => {
    setOpenDrawer(true);
  };
  const onClose = () => {
    setOpenDrawer(false);
  };
  const token = getStorage("token");

  // hide scrolling when drawer is opened
  document
    .querySelector("body")
    .classList.toggle("overflow-y-hidden", openDrawer && isMobile);

  return (
    <>
      <Space>
        <button
          className="flex items-center ml-5"
          type="primary"
          onClick={showDrawer}
        >
          <FaBars className="size-5" />
        </button>
      </Space>
      <Drawer
        size="large"
        className="dark:bg-[#22303c] "
        title={
          <div
            className={`flex w-full items-center  ${
              token.length !== 0 ? "justify-around" : "justify-center"
            }`}
          >
            <button onClick={onClose}>
              <Logo />
            </button>
            {token.length !== 0 && (
              <DropProfile
                openDrawer={openDrawer}
                onClick={onClose}
                top={"!top-[65px]"}
              />
            )}
          </div>
        }
        placement={"right"}
        closable={true}
        closeIcon={<IoMdClose className=" closeDrawerIcon" />}
        onClose={onClose}
        open={openDrawer}
        key={"right"}
        footer={
          <div className="flex justify-between">
            <MenuActions />
            {token.length !== 0 && (
              <button onClick={onClose}>
                <SaveBookmark />
              </button>
            )}
            <DropLanguage />
          </div>
        }
      >
        {loading ? (
          <LoadingSpin />
        ) : (
          <div>
            <h4 className="font-semibold text-lg text-center">Kateqoriyalar</h4>
            {category?.map((item, index) => (
              <div key={index}>{item.title}</div>
            ))}
          </div>
        )}
      </Drawer>
    </>
  );
};
export default DrawerToggle;
