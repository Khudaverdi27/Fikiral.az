import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import FormContainer from "./FormContainer";
import { useModalActions } from "../../../context/LoginModalProvider";

const FormRegister = () => {
  const [type, setType] = useState(false);

  const {
    handleSubmit,
    register,
    accescLogin,
    setAccesLogin,
    errors,
    onSubModel,
    reset,
    onSubmit,
    checkMail,
    chekRes,
  } = useModalActions();

  return (
    <FormContainer>
      <h3 className="text-center text-[16px]">Fikiral-a xoş gəlmisiz!</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        {accescLogin && (
          <div>
            <label className="outline-none block text-[#4C4B4E] mb-1">
              Ad soyad
            </label>
            <input
              placeholder="Ad soyad"
              type="text"
              className="loginInput"
              {...register("userName", {
                required: "Boş buraxıla bilməz",
                pattern: {
                  value: /\s*/,
                  message: "Zəhmət olmasa boşluqlardan istifadə etməyin",
                },
              })}
              aria-invalid={errors.userName ? "true" : "false"}
            />
            {errors.userName && (
              <span className="text-[#EA3829]" role="alert">
                {errors.userName.message}
              </span>
            )}
          </div>
        )}
        <div>
          <label className="outline-none block text-[#4C4B4E] mb-1">
            Email
          </label>
          <input
            placeholder="Email daxil edin"
            type="email"
            className="loginInput"
            {...register("gmail", {
              required: "Boş buraxıla bilməz",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]{3,}$/,
                message: "Yazdığınız mail düzgün formatda deyil!",
              },
            })}
            aria-invalid={errors.gmail ? "true" : "false"}
            onBlur={(e) => {
              checkMail(e.target.value);
            }}
          />
          {chekRes && accescLogin && (
            <span className="text-[#EA3829]">{chekRes}</span>
          )}
          {errors.gmail && (
            <span className="text-[#EA3829]" role="alert">
              {errors.gmail.message}
            </span>
          )}
        </div>

        <label className="block text-[#4C4B4E] ">Şifrə</label>
        <div>
          <div>
            <div className=" bg-[#F6F7FB] items-center border border-[#999999] flex rounded-[8px] ">
              <input
                placeholder="Şifrəni daxil edin"
                {...register("password", {
                  required: "Boş buraxıla bilməz",
                  minLength: {
                    value: 5,
                    message: "Minumum 5 simvol",
                  },
                })}
                type={type ? "password" : "text"}
                className="loginInput !border-0"
              />

              <button
                type="button"
                onClick={() => setType(!type)}
                className="w-11 h-8 "
              >
                {!type ? (
                  <FiEye className="size-full px-2 text-[#BCBCBE]" />
                ) : (
                  <FiEyeOff className="size-full px-2 text-[#BCBCBE]" />
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-[#EA3829]" role="alert">
                {errors.password.message}
              </span>
            )}
          </div>
          {!accescLogin && (
            <button
              type="button"
              className="text-[#6366F1] text-[16px] mt-1"
              onClick={onSubModel}
            >
              Şifrəni unutmusan?
            </button>
          )}
        </div>
        <button
          disabled={chekRes && accescLogin && true}
          className="bg-[#6366F1] text-white w-full disabled:opacity-40 py-[8px] rounded-[8px]"
        >
          {accescLogin ? "Qeydiyyat" : "Daxil ol"}
        </button>
      </form>
      <div className="text-center text-[16px]">Və ya</div>
      <button className="flex items-center justify-center loginInput">
        <span className="mr-3 size-6">
          <FcGoogle className="size-full" />
        </span>
        Google hesabı ilə davam et
      </button>
      <button className="flex items-center justify-center loginInput">
        <span className="mx-2 size-6">
          <FaFacebook className="size-full text-[#1977F3]" />
        </span>
        Facebook hesabı ilə davam et
      </button>
      <div className="text-center space-x-2">
        <span>{accescLogin ? "Artıq hesabın var?" : "Hesabın yoxdur?"}</span>
        <span className="text-[#6366F1]">
          <button
            onClick={() => {
              setAccesLogin(!accescLogin);
              reset();
            }}
          >
            {accescLogin ? "Daxil ol" : "Qeydiyyatdan keç"}
          </button>
        </span>
      </div>
    </FormContainer>
  );
};
export default FormRegister;
