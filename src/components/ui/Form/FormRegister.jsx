import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import FormContainer from "./FormContainer";
import { useModalActions } from "../../../context/LoginModalProvider";
import { LoadingSpin } from "../../widget/Loading/ThinkSkeleton";
import Input from "./input";
import { loginFacebook, loginGoogle } from "../../../utils/firebase";
import { removeStorage, saveStorage } from "../../../utils/helpers";

const FormRegister = () => {
  const {
    userLoading,
    setWithFb,
    setWithGoogle,
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

  const compeleteLoginSocial = async (social) => {
    saveStorage("social", social);
    setTimeout(() => {
      removeStorage("social");
    }, 10000);
    const dataSocial =
      social === "fb" ? await loginFacebook() : await loginGoogle();

    const mail =
      dataSocial?.user?.email ||
      `${dataSocial?.user?.displayName.split(" ")[0]}@gmail.com`;

    const formData = {
      gmail: mail,
      password: dataSocial.user.uid,
      ...(accescLogin
        ? {
            userName: dataSocial.user.displayName,
            image: dataSocial.user.photoURL,
          }
        : {}),
    };

    if (accescLogin) {
      checkMail(mail);
      checkUserName(dataSocial.user.displayName);
    }

    await onSubmit(formData);
  };

  return (
    <FormContainer>
      <h3 className="text-center text-base dark:text-white">
        Fikiral-a xoş gəlmisiz!
      </h3>
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
          {userLoading || userLoginAuthLoading ? (
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
                    showUnShow={true}
                  />
                </div>
                {!accescLogin && (
                  <button
                    type="button"
                    className="text-indigo-500 text-base mt-1 "
                    onClick={onSubModel}
                  >
                    Şifrəni unutmusan?
                  </button>
                )}
              </div>
              <button
                disabled={
                  !watchFields.password || watchFields.password?.length < 8
                }
                className="bg-indigo-500  text-white w-full disabled:opacity-40 py-[8px] rounded-[8px]"
              >
                {accescLogin ? "Qeydiyyat" : "Daxil ol"}
              </button>

              <div
                className={`${userLoading && "invisible"} visible space-y-2`}
              >
                <div className="text-center text-base dark:text-white">
                  Və ya
                </div>
                <button
                  type="button"
                  onMouseDown={() => setWithGoogle(true)}
                  onClick={() => compeleteLoginSocial("google")}
                  className="flex items-center justify-center loginInput"
                >
                  <span className="mr-3 size-6">
                    <FcGoogle className="size-full" />
                  </span>
                  Google hesabı ilə davam et
                </button>
                <button
                  type="button"
                  onMouseDown={() => setWithFb(true)}
                  onClick={() => compeleteLoginSocial("fb")}
                  className="flex items-center justify-center loginInput"
                >
                  <span className="mx-2 size-6">
                    <FaFacebook className="size-full text-[#1977F3]" />
                  </span>
                  Facebook hesabı ilə davam et
                </button>
                <div className="text-center space-x-2">
                  <span className="dark:text-white">
                    {accescLogin ? "Artıq hesabın var?" : "Hesabın yoxdur?"}
                  </span>
                  <span className="text-indigo-500">
                    <button
                      type="button"
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
            </>
          )}
        </>
      </form>
    </FormContainer>
  );
};
export default FormRegister;
