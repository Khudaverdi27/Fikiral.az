import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import FormContainer from "./FormContainer";
import { useModalActions } from "../../../context/LoginModalProvider";
import { LoadingSpin } from "../../widget/Loading/ThinkSkeleton";
import Input from "./input";

const FormRegister = () => {
  const {
    handleSubmit,
    accescLogin,
    setAccesLogin,
    onSubModel,
    reset,
    onSubmit,
    checkMail,
    checkUserName,
    clearErrors,
    authCheckLoading,
    authCheckUserNameLoading,
    userLoginAuthLoading,
    watch,
  } = useModalActions();

  const watchFields = watch();

  return (
    <FormContainer>
      <h3 className="text-center text-base">Fikiral-a xoş gəlmisiz!</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        {accescLogin && (
          <Input
            label={"İstifadəçi adı"}
            required={true}
            placeholder={"İstifadəçi adı"}
            type={"text"}
            maxLength={15}
            registerName={"userName"}
            patterns={{
              value: /\s*/,
              message: "Zəhmət olmasa boşluqlardan istifadə etməyin",
            }}
            onBlur={(e) => checkUserName(e.target.value)}
            checkLoading={authCheckUserNameLoading}
          />
        )}
        <>
          {userLoginAuthLoading ? (
            <LoadingSpin />
          ) : (
            <>
              <Input
                label={"Email"}
                placeholder={"Email daxil edin"}
                type={"email"}
                maxLength={45}
                registerName={"gmail"}
                required={true}
                patterns={{
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}(?:\.[a-zA-Z]{2,})?$/,
                  message: "Yazdığınız mail düzgün formatda deyil!",
                }}
                onBlur={
                  accescLogin ? (e) => checkMail(e.target.value) : undefined
                }
                checkLoading={authCheckLoading}
              />
              <div>
                <div>
                  <Input
                    label={"Şifrə"}
                    placeholder={"Şifrəni daxil edin"}
                    required={true}
                    type={"password"}
                    maxLength={20}
                    minLength={{
                      value: 8,
                      message: "Min 8 max 20 simvol",
                    }}
                    registerName={"password"}
                  />
                </div>
                {!accescLogin && (
                  <button
                    type="button"
                    className="text-indigo-500 text-base mt-1"
                    onClick={onSubModel}
                  >
                    Şifrəni unutmusan?
                  </button>
                )}
              </div>
              <button
                disabled={!watchFields.gmail && !watchFields.password}
                className="bg-indigo-500 text-white w-full disabled:opacity-40 py-[8px] rounded-[8px]"
              >
                {accescLogin ? "Qeydiyyat" : "Daxil ol"}
              </button>
            </>
          )}
        </>
      </form>

      <div
        className={`${userLoginAuthLoading && "invisible"} visible space-y-2`}
      >
        <div className="text-center text-base">Və ya</div>
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
          <span className="text-indigo-500">
            <button
              onClick={() => {
                setAccesLogin(!accescLogin);

                reset();
                clearErrors();
              }}
            >
              {accescLogin ? "Daxil ol" : "Qeydiyyatdan keç"}
            </button>
          </span>
        </div>
      </div>
    </FormContainer>
  );
};
export default FormRegister;
