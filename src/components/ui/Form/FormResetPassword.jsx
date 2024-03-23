import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useModalActions } from "../../../context/LoginModalProvider";
import Input from "./input";
import { ToastContainer, toast } from "react-toastify";
import { useChangeUserPassword } from "../../../hooks/useFetch";

function FormResetPassword() {
  const [resetPassword, setResetPassword] = useState(false);
  const [pass, setPass] = useState("");
  const [confrimPass, setConfrimPass] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [gmail, setGmail] = useState("");
  const [resData, setResData] = useState({});
  const [changedPassRes, newPasswordFetch] = useChangeUserPassword();
  const {
    setMainModel,
    setSubModel,
    checkMail,
    authCheckMail,
    authCheckLoading,
    watch,
  } = useModalActions();
  const { handleSubmit } = useForm();

  const wathGmail = watch("gmailReset");

  const notify = () => toast.success("Məlumatlarınız uğurla yeniləndi!");
  const errorNotify = () => toast.error("Xəta baş verdi yenidən yoxlayın!");

  const newPassword = () => {
    setResData({ gmail, newPassword: confrimPass });
    setResetPassword(true);
    if (resetPassword) {
      newPasswordFetch(resData);
    }
  };

  useEffect(() => {
    if (resData.newPassword) {
      if (changedPassRes.satus == 200) {
        notify();
        setSubModel(false);
        setMainModel(true);
        setResData({});
        setResetPassword(false);
      } else if (changedPassRes.status == 500) {
        errorNotify();
        setResData({});
        setResetPassword(false);
      }
    }
  }, [changedPassRes, resData]);

  useEffect(() => {
    if (authCheckMail == true && wathGmail) {
      setGmail(wathGmail);
      setTimeout(() => setDisabled(false), 1000);
    } else {
      setDisabled(true);
    }
  }, [authCheckMail, wathGmail]);

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
                onBlur={(e) => setPass(e.target.value)}
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
                onBlur={(e) => setConfrimPass(e.target.value)}
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
