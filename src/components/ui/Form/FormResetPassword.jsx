import { useState } from "react";
import { useForm } from "react-hook-form";
import { useModalActions } from "../../../context/LoginModalProvider";

function FormResetPassword() {
  const [resetPassword, setResetPassword] = useState(false);
  const { setMainModel, setSubModel } = useModalActions();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const newPassword = (data) => {
    setResetPassword(true);
    console.log(data);
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
                  type="password"
                  className="loginInput !border-0"
                />
              </div>
              {errors.password && (
                <span className="text-[#EA3829]" role="alert">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>
        </>
      )}
      <button
        type="submit"
        className="bg-[#6366F1] text-white w-full py-[8px] rounded-[8px]"
      >
        {!resetPassword ? " Bərpa e-maili göndərin" : "Şifrəni təsdiq edin"}
      </button>
    </form>
  );
}

export default FormResetPassword;
