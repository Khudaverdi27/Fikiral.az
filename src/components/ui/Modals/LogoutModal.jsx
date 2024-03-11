import { Modal } from "antd";
import { removeStorage } from "../../../utils/helpers";
import { useState } from "react";

function LogoutModal({ title, dangerBtn, destroyBtn, destroyProfile }) {
  const [isOpenModal, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className="text-[#FF0000]" type="button" onClick={showModal}>
        {dangerBtn}
      </button>
      <Modal
        closable={false}
        footer={false}
        centered
        className="bg-white rounded-[20px]"
        title={title}
        open={isOpenModal}
      >
        <div className="space-y-3 mt-10 text-base font-[500]">
          <button
            onClick={handleCancel}
            type="button"
            className=" border block w-full bg-indigo-500 text-white py-2 px-4 rounded-xl"
          >
            Ləğv et
          </button>
          <button
            onClick={destroyProfile}
            type="button"
            className=" border block w-full border-primaryGray py-2 px-4 rounded-xl "
          >
            {destroyBtn}
          </button>
        </div>
      </Modal>
    </>
  );
}

export default LogoutModal;
