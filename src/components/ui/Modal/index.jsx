import React, { useState } from "react";
import { Button, Modal } from "antd";
import { GoPlus } from "react-icons/go";
import DropdownMenu from "../Dropdown";
import { Categories } from "../Dropdown/DropDownCategories";
import TextArea from "antd/es/input/TextArea";
import { IoMdClose } from "react-icons/io";
const AddModal = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative hover:bg-[#8FE4FF] hover:rounded-full  "
      >
        <span className="addPlusBtn">
          <GoPlus className="size-[32px] text-white " />
        </span>
      </button>
      <Modal
        title={
          <div className="flex items-center space-x-2 bg-[#232323]">
            <figure className="size-9 rounded-full shrink-0">
              <img
                className="img-cover"
                src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1427"
                alt=""
              />
            </figure>
            <span className="text-[#FAFAFA]">Samir N</span>
          </div>
        }
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={603}
        closable={true}
        className="bg-[#232323] rounded-md"
        style={{
          top: 50,
        }}
        footer={[
          <button
            className="w-full  rounded-lg p-2 font-[500] text-[16px] hover:bg-[#280069]  hover:text-white bg-[#FAFAFA]"
            key="submit"
            type="primary"
          >
            Paylaş
          </button>,
        ]}
        closeIcon={<IoMdClose className="text-[#FAFAFA] text-2xl" />}
      >
        <DropdownMenu
          placement={"bottomLeft"}
          dropName={
            <button className="rounded md hover:text-white px-2 py-[5px] mb-2 bg-[#FAFAFA] hover:bg-[#280069]">
              Kateqoriya seç
            </button>
          }
          dropDownItems={Categories()}
          classes={"w-[314px] max-h-[365px] overflow-x-hidden mt-[105px] ml-9 "}
        />
        <TextArea
          className="!resize-none"
          rows={12}
          placeholder="maxLength is 500"
          maxLength={500}
        />
      </Modal>
    </>
  );
};
export default AddModal;
