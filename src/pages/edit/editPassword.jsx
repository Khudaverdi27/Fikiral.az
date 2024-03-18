import Input from "../../components/ui/Form/input";
import { useEffect, useState } from "react";
import { useModalActions } from "../../context/LoginModalProvider";

function EditPassword({
  setPassValue,
  userLoginAuthLoading,
  errMsg,
  setCompeleteEdit,
}) {
  const [newPass, setNewPass] = useState("");
  const [confrimPass, setConfrimPass] = useState("");
  const { onSubModel, userByIdData } = useModalActions();
  const [confrimPassValue, setConfrimPassValue] = useState("");

  const getNewPass = (e) => {
    setConfrimPassValue(e);
  };

  useEffect(() => {
    setCompeleteEdit({
      id: userByIdData.id,
      newPassword: confrimPassValue,
    });
  }, [confrimPassValue]);

  return (
    <>
      <div>
        <Input
          label={"Hazırkı şifrə"}
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
          onBlur={(e) => setPassValue(e.target.value)}
          checkLoading={userLoginAuthLoading}
        />
        <span className="text-red-500 block">{errMsg}</span>
        <button
          type="button"
          className="text-indigo-500 text-base mt-1"
          onClick={onSubModel}
        >
          Şifrəni unutmuşam
        </button>
      </div>
      <Input
        onKeyDown={(e) => setNewPass(e.target.value)}
        label={"Yeni şifrə"}
        placeholder={"Şifrəni daxil edin"}
        required={true}
        type={"password"}
        maxLength={20}
        minLength={{
          value: 8,
          message: "Min 8 max 20 simvol",
        }}
        registerName={"newPassword"}
        showUnShow={true}
        validate={newPass === confrimPass ? false : true}
      />
      {!newPass && <span className="text-red-500 ">Min 8 max 20 simvol</span>}
      <Input
        label={"Yeni şifrəni təkrar daxil edin"}
        onKeyDown={(e) => setConfrimPass(e.target.value)}
        placeholder={"Şifrəni daxil edin"}
        required={true}
        type={"password"}
        maxLength={20}
        minLength={{
          value: 8,
          message: "Min 8 max 20 simvol",
        }}
        registerName={"confirmPassword"}
        showUnShow={true}
        validate={newPass === confrimPass ? false : true}
        onBlur={(e) => getNewPass(e.target.value)}
      />
      {!newPass && <span className="text-red-500 ">Min 8 max 20 simvol</span>}
    </>
  );
}

export default EditPassword;
