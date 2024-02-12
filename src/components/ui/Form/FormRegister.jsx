import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import FormContainer from "./FormContainer";
import FormLogin from "./FormLogin";

const FormRegister = () => {
  const [type, setType] = useState(false);

  return (
    <FormContainer modalName={"Qeydiyyat"}>
      <h3 className="text-center text-[16px]">Fikiral-a xoş gəlmisiz!</h3>
      <label className="block text-[#4C4B4E]">Ad Soyad</label>
      <input
        type="text"
        className="outline-none border w-full bg-[#F6F7FB] border-[#999999] rounded-[8px] py-[8px] px-4"
      />
      <label className="outline-none block text-[#4C4B4E]">Email</label>
      <input
        type="email"
        className="outline-none border w-full bg-[#F6F7FB] border-[#999999] rounded-[8px] py-[8px] px-4"
      />
      <label className="block text-[#4C4B4E] ">Şifrə</label>
      <div className=" bg-[#F6F7FB] items-center border border-[#999999] flex rounded-[8px] ">
        <input
          type={type ? "password" : "text"}
          className="outline-none rounded-[8px] bg-[#F6F7FB] w-full  py-[8px] px-4"
        />
        <button onClick={() => setType(!type)} className="w-11 h-8 ">
          {!type ? (
            <FiEye className="size-full px-2 text-[#BCBCBE]" />
          ) : (
            <FiEyeOff className="size-full px-2 text-[#BCBCBE]" />
          )}
        </button>
      </div>
      <button className="bg-[#111A6E] text-white w-full py-[8px] rounded-[8px]">
        Qeydiyyat
      </button>
      <div className="text-center text-[16px]">Və ya</div>
      <button className="flex items-center justify-center border w-full border-[#999999] py-[8px] rounded-[8px]">
        <span className="mr-3 size-6">
          <FcGoogle className="size-full" />
        </span>
        Google hesabı ilə davam et
      </button>
      <button className="flex items-center justify-center border w-full border-[#999999] py-[8px] rounded-[8px]">
        <span className="mx-2 size-6">
          <FaFacebook className="size-full text-[#1977F3]" />
        </span>
        Facebook hesabı ilə davam et
      </button>
      <div className="text-center space-x-2">
        <span>Artıq hesabın var?</span>
        <span className="text-[#111A6E]">
          <FormLogin />
        </span>
      </div>
    </FormContainer>
  );
};
export default FormRegister;
