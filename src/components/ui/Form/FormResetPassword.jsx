import { useState } from "react";
import { useForm } from "react-hook-form";
import { useModalActions } from "../../../context/LoginModalProvider";
import { FiEye, FiEyeOff } from "react-icons/fi";

function FormResetPassword() {
  const [type, setType] = useState(false);
  const [typecConfrim, setTypeConfrim] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const { setMainModel, setSubModel } = useModalActions();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm();
  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  const newPassword = (data) => {
    setResetPassword(true);

    reset();
    if (data.password) {
      setResetPassword(false);
      setSubModel(false);
      setMainModel(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(newPassword)}
      className="space-y-4 text-[16px]"
    >
      {!resetPassword ? (
        <>
          <h5>Şifrəni unutmusunuz?</h5>
          <p className="!mb-5">
            Narahat olmayın! Sadəcə e-mailinizi daxil edin və biz sizə şifrə
            yeniləmə linki göndərəcəyik.
          </p>
          <label>Email</label>
          <input
            placeholder="gmail daxil edin"
            {...register("gmail", {
              required: "Boş buraxıla bilməz",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Yazdığınız mail düzgün formatda deyil!",
              },
            })}
            aria-invalid={errors.mail ? "true" : "false"}
            className="loginInput"
            type="email"
          />
          {errors.gmail && (
            <span className="text-[#EA3829]" role="alert">
              {errors.gmail.message}
            </span>
          )}
        </>
      ) : (
        <>
          <h5>Şifrənizi sıfırlayın</h5>
          <label className="block text-[#4C4B4E] ">Yeni şifrə</label>
          <div>
            <div className="space-y-3">
              <div className=" bg-[#F6F7FB] items-center border border-[#999999] flex rounded-[8px] ">
                <input
                  maxLength={20}
                  placeholder="Şifrəni daxil edin"
                  {...register("password", {
                    required: "Boş buraxıla bilməz",
                    minLength: {
                      value: 8,
                      message: "Min 8 max 20 simvol",
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
              <div className=" bg-[#F6F7FB] items-center border border-[#999999] flex rounded-[8px] ">
                <input
                  maxLength={20}
                  placeholder="Şifrəni yenidən daxil edin"
                  {...register("confirmPassword", {
                    required: "Boş buraxıla bilməz",
                    validate: (value) =>
                      value === password || "Şifrə uyğunlaşmır",
                  })}
                  type={typecConfrim ? "password" : "text"}
                  className="loginInput !border-0"
                />
                <button
                  type="button"
                  onClick={() => setTypeConfrim(!typecConfrim)}
                  className="w-11 h-8 "
                >
                  {!typecConfrim ? (
                    <FiEye className="size-full px-2 text-[#BCBCBE]" />
                  ) : (
                    <FiEyeOff className="size-full px-2 text-[#BCBCBE]" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="text-[#EA3829]" role="alert">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>
        </>
      )}
      <button
        disabled={resetPassword && password !== confirmPassword}
        type="submit"
        className="bg-[#6366F1] disabled:opacity-50 text-white w-full py-[8px] rounded-[8px]"
      >
        {!resetPassword ? " Bərpa e-maili göndərin" : "Şifrəni təsdiq edin"}
      </button>
    </form>
  );
}

export default FormResetPassword;
