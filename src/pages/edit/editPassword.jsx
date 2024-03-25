import Input from "../../components/ui/Form/input";
import { useEffect, useState } from "react";
import { useModalActions } from "../../context/LoginModalProvider";

function EditPassword({
  setPassValue,
  userLoginAuthLoading,
  setCompeleteEdit,
}) {
  const [newPass, setNewPass] = useState("");
  const [confrimPass, setConfrimPass] = useState("");
  const { onSubModel, userByIdData, watch } = useModalActions();
  const [confrimPassValue, setConfrimPassValue] = useState("");
  const [isEqual, setIsEqual] = useState(false);

  const getNewPass = (e) => {
    setConfrimPassValue(e);
  };
  const watchNewPass = watch("newPassword");
  const watchConfrim = watch("confirmPassword");

  useEffect(() => {
    setCompeleteEdit({
      email: userByIdData.gmail,
      newPassword: confrimPassValue,
    });
  }, [confrimPassValue]);

  useEffect(() => {
    if (watchNewPass === watchConfrim) {
      setIsEqual(false);
    } else {
      setIsEqual(true);
    }
  }, [watchNewPass, watchConfrim]);

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

        {/* <button
          type="button"
          className="text-indigo-500 text-base mt-1"
          onClick={onSubModel}
        >
          Şifrəni unutmuşam
        </button> */}
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
        validate={isEqual}
      />
      {!newPass ||
        (isEqual && <span className="text-red-500 ">Min 8 max 20 simvol</span>)}
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
        validate={isEqual}
        onBlur={(e) => getNewPass(e.target.value)}
      />
      {!confrimPass ||
        (isEqual && <span className="text-red-500 ">Min 8 max 20 simvol</span>)}
    </>
  );
}

export default EditPassword;
