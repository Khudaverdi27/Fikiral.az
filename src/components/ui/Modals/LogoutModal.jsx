import { Modal } from "antd";
import classNames from "classnames";
import { useState } from "react";

function LogoutModal({
  title,
  dangerBtn,
  destroyBtn,
  destroyProfile,
  dangerBtnClass = false,
}) {
  const [isOpenModal, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {dangerBtn === "Hesabı sil" && (
        <div className="bg-[#9999] w-36 ml-[-12px] h-[1px]"></div>
      )}
      <button
        className={classNames(
          { "text-[#9F9999] ": isOpenModal ? false : false },
          { "text-[#FF0000]": isOpenModal ? true : false },
          { "text-[#FF0000] text-base": !dangerBtnClass },
          {
            "text-black": isOpenModal,
          }
        )}
        type="button"
        onClick={showModal}
      >
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
