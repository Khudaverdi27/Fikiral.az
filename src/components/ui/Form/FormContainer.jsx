import { Button, Modal } from "antd";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import FormLogin from "./FormLogin";

const FormContainer = ({
  children,
  modalName,
  classs = false,
  isMainModel,
  setMainModel,
  isSubModel,
  setSubModel,
  onSubModel,
}) => {
  return (
    <>
      <button
        onClick={setMainModel}
        className={`${classs ? classs : "bg-indigo-500"} py-2 px-4 rounded-xl`}
      >
        {modalName}
      </button>
      <Modal
        width={652}
        centered
        footer={false}
        closable={true}
        closeIcon={<IoMdClose className="text-bold text-black" />}
        className="bg-[#FBFBFB] rounded-[20px]"
        open={isMainModel}
        onOk={() => setMainModel(false)}
        onCancel={() => setMainModel(false)}
      >
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex justify-center items-center pt-10"
        >
          <div className="w-[300px] space-y-3">{children}</div>
        </form>
      </Modal>
      <Modal
        centered
        footer={false}
        closable={true}
        closeIcon={<IoMdClose className="text-bold text-black" />}
        className="bg-[#FBFBFB] rounded-[20px]"
        title="Sub Modal"
        open={isSubModel}
        onOk={(e) => onSubModel(e, false)}
        onCancel={(e) => onSubModel(e, false)}
      >
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex justify-center items-center pt-10"
        >
          <div className="w-[300px] space-y-3">
            <FormLogin />
          </div>
        </form>
      </Modal>
    </>
  );
};
export default FormContainer;
