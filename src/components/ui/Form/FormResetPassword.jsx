import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useModalActions } from "../../../context/LoginModalProvider";
import Input from "./input";
import { toast } from "react-toastify";
import { saveStorage } from "../../../utils/helpers";

function FormResetPassword() {
  const [disabled, setDisabled] = useState(true);
  const [gmail, setGmail] = useState("");

  const { checkMail, authCheckMail, authCheckLoading, watch, setSubModel } =
    useModalActions();
  const { handleSubmit, reset } = useForm();

  const wathGmail = watch("gmailReset");

  const notify = () => toast.success("Zəhmət olmasa mailiniz yoxlayın!");
  const errorNotify = () => toast.error("Mail tapılmadı");
  const newPassword = () => {
    saveStorage("gmail", gmail);
    if (authCheckMail == true) {
      setSubModel(false);

      notify();
    } else {
      errorNotify();
    }
    reset();
  };

  useEffect(() => {
    if (authCheckMail == true && wathGmail) {
      setGmail(wathGmail);
      setTimeout(() => setDisabled(false), 1000);
    } else {
      setDisabled(true);
    }
  }, [authCheckMail, wathGmail]);

  return (
    <form
      onSubmit={handleSubmit(newPassword)}
      className="space-y-4 text-base py-7"
    >
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

      <button
        disabled={disabled}
        type="submit"
        className="bg-indigo-500 disabled:opacity-50 text-white w-full py-[8px] rounded-[8px]"
      >
        Bərpa e-maili göndərin
      </button>
    </form>
  );
}

export default FormResetPassword;
