import React, { useState } from "react";
import { Drawer, Space } from "antd";
import { FaBars } from "react-icons/fa6";
import DropdownMenu from "../../ui/Dropdown";
import { BiCategory } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import FormRegister from "../../ui/Form/FormRegister";
import DropLanguage from "../../ui/Dropdown/DropLanguage";
import MenuActions from "../../ui/MenuActions";
import { getStorage } from "../../../utils/helpers";
import Logo from "../../common/Logo";
import SaveBookmark from "../../ui/MenuActions/saveBookmark";
import DropProfile from "../../ui/Dropdown/DropProfile";

const DrawerToggle = ({ loading, category }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const showDrawer = () => {
    setOpenDrawer(true);
  };
  const onClose = () => {
    setOpenDrawer(false);
  };
  const token = getStorage("token");

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
        className="dark:bg-[#22303c]"
        title={
          token.length == 0 ? (
            <div>
              <FormRegister />
            </div>
          ) : (
            <button
              onClick={onClose}
              className="flex w-full items-center justify-center"
            >
              <Logo />
            </button>
          )
        }
        placement={"right"}
        closable={true}
        closeIcon={<IoMdClose className=" closeDrawerIcon" />}
        onClose={onClose}
        open={openDrawer}
        key={"right"}
        footer={
          <div className="flex justify-between">
            <div className="text-base">
              <span className="font-semibold mr-1">Dil Seçimi:</span>
              <DropLanguage />
            </div>
            <div className="text-base flex">
              <span className="font-semibold mr-1">Görüntü rejimi</span>
              <MenuActions />
            </div>
          </div>
        }
      >
        <div className="flex flex-col items-end space-y-5">
          {token.length !== 0 && (
            <div className="flex flex-col items-end space-y-5">
              <DropProfile onClick={onClose} top={"!top-[150px]"} />
              <button onClick={onClose}>
                <SaveBookmark
                  title={
                    <span className="text-base font-semibold ">
                      Yadda Saxlanılanlar
                    </span>
                  }
                />
              </button>
            </div>
          )}
          <DropdownMenu
            loading={loading}
            dropName={
              <div className="text-primaryGray flex items-center text-base  dark:text-white space-x-3">
                <span>Kateqoriyalar</span> <BiCategory className="size-5" />
              </div>
            }
            dropDownItems={category}
            classes={`w-screen  overflow-x-hidden ${
              token.length == 0
                ? "!top-[160px] max-h-[380px]"
                : "!top-[230px] max-h-[254px]"
            } `}
          />
        </div>
      </Drawer>
    </>
  );
};
export default DrawerToggle;
