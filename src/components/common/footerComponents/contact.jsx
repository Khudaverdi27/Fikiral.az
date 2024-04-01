import { useState } from "react";
import { Modal, Collapse } from "antd";
import { IoMdClose } from "react-icons/io";
function ContactFooter() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const items = [
    {
      key: "1",
      label: "This is panel header 1",
      children: <p>{text}</p>,
    },
    {
      key: "2",
      label: "This is panel header 2",
      children: <p>{text}</p>,
    },
    {
      key: "3",
      label: "This is panel header 3",
      children: <p>{text}</p>,
    },
  ];

  return (
    <>
      <div className="space-y-2 ">
        <h6 className="text-sm font-semibold text-black dark:text-white">
          Dəstək
        </h6>
        <p className="text-xs text-primaryGray dark:text-white">Yardım</p>
        <button
          onClick={showModal}
          className="text-xs text-primaryGray dark:text-white"
        >
          Tez-tez verilən suallar
        </button>
        <p className="text-xs text-primaryGray dark:text-white">
          Məxfilik qaydaları
        </p>
      </div>
      <Modal
        width={800}
        className="bg-zinc-50 rounded-[8px] dark:text-white"
        title={<span className="text-xl">Tez-tez verilən suallar</span>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={true}
        closeIcon={<IoMdClose className=" text-2xl text-[#232323] " />}
        footer={false}
        centered={true}
      >
        <Collapse
          className="font-fransisco dark:border-gray-500"
          accordion
          items={items}
        />
      </Modal>
    </>
  );
}

export default ContactFooter;
