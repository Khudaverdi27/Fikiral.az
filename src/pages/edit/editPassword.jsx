import Input from "../../components/ui/Form/input";
import { useState } from "react";
import { useModalActions } from "../../context/LoginModalProvider";

function EditPassword() {
  const [pass, setPass] = useState("");
  const [confrimPass, setConfrimPass] = useState("");
  const { onSubModel } = useModalActions();

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
        />
        <button
          type="button"
          className="text-indigo-500 text-base mt-1"
          onClick={onSubModel}
        >
          Şifrəni unutmuşam
        </button>
      </div>
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
        validate={pass === confrimPass ? false : true}
      />
    </>
  );
}

export default EditPassword;
