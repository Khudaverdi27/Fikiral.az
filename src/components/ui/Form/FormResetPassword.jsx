import { useState } from "react";
import { useForm } from "react-hook-form";

function FormResetPassword() {
  const [resetPassword, setResetPassword] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const sendMailforPassword = (data) => {
    console.log(data);
    reset();
    setResetPassword(true);
  };
  return (
    <form
      onSubmit={handleSubmit(sendMailforPassword)}
      className="space-y-4 text-[16px]"
    >
      {!resetPassword ? (
        <>
          <h5>Şifrəni unutmusunuz?</h5>
          <p className="!mb-5">
            Narahat olmayın! Sadəcə e-mailinizi daxil edin və biz sizə şifrə
            yeniləmə linki göndərəcəyik.
          </p>
          <label cla>Email</label>
          <input
            placeholder="Email daxil edin"
            {...register("email", {
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
          {errors.email && (
            <span className="text-[#EA3829]" role="alert">
              {errors.email.message}
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
        className="bg-[#111A6E] text-white w-full py-[8px] rounded-[8px]"
      >
        {!resetPassword ? " Bərpa e-maili göndərin" : "Şifrəni təsdiq edin"}
      </button>
    </form>
  );
}

export default FormResetPassword;
