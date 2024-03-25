import React, { useState } from "react";
import { Drawer, Space } from "antd";
import { FaBars } from "react-icons/fa6";

const DrawerToggle = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const showDrawer = () => {
    setOpenDrawer(true);
  };
  const onClose = () => {
    setOpenDrawer(false);
  };

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
        title="Basic Drawer"
        placement={"right"}
        closable={true}
        closeIcon={"X"}
        onClose={onClose}
        open={openDrawer}
        key={"right"}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};
export default DrawerToggle;
