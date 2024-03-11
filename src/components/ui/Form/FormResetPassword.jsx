import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useModalActions } from "../../../context/LoginModalProvider";
import Input from "./input";

function FormResetPassword() {
  const [resetPassword, setResetPassword] = useState(false);
  const [pass, setPass] = useState("");
  const [confrimPass, setConfrimPass] = useState("");
  const [disabled, setDisabled] = useState(true);
  const {
    setMainModel,
    setSubModel,
    checkMail,
    authCheckMail,
    authCheckLoading,
  } = useModalActions();
  const { handleSubmit } = useForm();

  const newPassword = (data) => {
    setResetPassword(true);

    if (data.password) {
      setResetPassword(false);
      setSubModel(false);
      setMainModel(true);
    }
  };

  useEffect(() => {
    if (authCheckMail == true && !resetPassword) {
      setDisabled(false);
    }
  }, [authCheckMail]);

  useEffect(() => {
    if (resetPassword) {
      if (!(pass === confrimPass && pass !== "" && confrimPass !== "")) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    }
  }, [pass, confrimPass, resetPassword]);
  return (
    <form
      onSubmit={handleSubmit(newPassword)}
      className="space-y-4 text-base py-7"
    >
      {!resetPassword ? (
        <>
          <h5>Şifrəni unutmusunuz?</h5>
          <p className="!mb-5">
            Narahat olmayın! Sadəcə e-mailinizi daxil edin və biz sizə şifrə
            yeniləmə linki göndərəcəyik.
          </p>

          <Input
            label={"Email"}
            placeholder={"Email daxil edin"}
            type={"email"}
            maxLength={45}
            registerName={"gmailReset"}
            required={true}
            patterns={{
              value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}(?:\.[a-zA-Z]{2,})?$/,
              message: "Yazdığınız mail düzgün formatda deyil!",
            }}
            onBlur={(e) => checkMail(e.target.value)}
            checkLoading={authCheckLoading}
          />
        </>
      ) : (
        <>
          <h5>Şifrənizi sıfırlayın</h5>

          <div>
            <div className="space-y-3">
              <Input
                onKeyDown={(e) => setPass(e.target.value)}
                label={"Yeni şifrə"}
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
                validate={pass === confrimPass ? false : true}
              />
              <Input
                onKeyDown={(e) => setConfrimPass(e.target.value)}
                placeholder={"Şifrəni yenidən daxil edin"}
                required={true}
                type={"password"}
                maxLength={20}
                minLength={{
                  value: 8,
                  message: "Min 8 max 20 simvol",
                }}
                registerName={"confirmPassword"}
                showUnShow={true}
                validate={pass === confrimPass ? false : true}
              />
            </div>
          </div>
        </>
      )}
      <button
        disabled={disabled}
        type="submit"
        className="bg-indigo-500 disabled:opacity-50 text-white w-full py-[8px] rounded-[8px]"
      >
        {!resetPassword ? " Bərpa e-maili göndərin" : "Şifrəni təsdiq edin"}
      </button>
    </form>
  );
}

export default FormResetPassword;
