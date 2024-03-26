import { Spin } from "antd";
import { getLocaleStorage } from "../../utils/helpers";
import Input from "../../components/ui/Form/input";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useChangeUserPassword } from "../../hooks/useFetch";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
function AuthWait() {
  const [pass, setPass] = useState("");
  const [confrimPass, setConfrimPass] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [changedPassRes, newPasswordFetch, loading] = useChangeUserPassword();
  const [resData, setResData] = useState({});
  const [storageData, setStorageData] = useState("");
  const { handleSubmit } = useForm();
  const auth = getLocaleStorage("gmail");
  useEffect(() => {
    console.log(auth);
    if (auth?.length > 0) {
      setStorageData(auth);
    }
  }, [auth]);

  const notify = () =>
    toast.success("Məlumatlar yeniləndi.Yenidən giriş edin!");
  const errorNotify = () => toast.error("Xəta baş verdi yenidən yoxlayın!");

  useEffect(() => {
    if (!(pass === confrimPass && pass !== "" && confrimPass !== "")) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [pass, confrimPass]);

  const newPassword = () => {
    setResData({ email: storageData, newPassword: confrimPass });
  };

  useEffect(() => {
    if (resData.newPassword) {
      newPasswordFetch(resData);
    }
  }, [resData]);

  const navigate = useNavigate();

  useEffect(() => {
    if (changedPassRes.status == 200) {
      notify();
      setResData({});
      setTimeout(() => {
        setStorageData("");
        navigate("/");
      }, [2000]);
    } else if (changedPassRes.status == 500) {
      errorNotify();
      setResData({});
    }
  }, [changedPassRes]);

  return (
    <>
      <ToastContainer />
      {!storageData ? (
        <div className="font-mono">
          Zəhmət olmasa gözləyin ana səhifəyə yönləndirlirsiniz...
          <Spin size="small" />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(newPassword)}
          className="flex h-screen justify-center items-center"
        >
          <div className="w-1/3 space-y-3">
            <h5 className="text-center text-2xl font-semibold">
              Şifrənizi sıfırlayın
            </h5>
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
            <button
              disabled={disabled}
              type="submit"
              className="bg-indigo-500 disabled:opacity-50 text-white w-full py-[8px] rounded-[8px]"
            >
              {loading ? "Gözləyin..." : " Təsdiqlə"}
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default AuthWait;
