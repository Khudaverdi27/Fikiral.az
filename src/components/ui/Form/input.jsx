import { useEffect, useState } from "react";
import { useModalActions } from "../../../context/LoginModalProvider";
import { Spin } from "antd";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Input({
  showUnShow = false,
  value = false,
  placeholder,
  label,
  type,
  maxLength,
  minLength = {},
  registerName,
  patterns,
  required = false,
  checkLoading = false,
  onBlur,
  validate = false,
  onKeyDown = () => {},
}) {
  const [changeType, setChangeType] = useState(false);
  const [error, setError] = useState(false);
  const { register, accescLogin, errors, reset } = useModalActions();

  useEffect(() => {
    reset();
  }, [accescLogin]);

  useEffect(() => {
    if (validate) {
      setError(true);
    } else {
      setError(false);
    }
  }, [validate]);

  return (
    <div>
      <label className="outline-none block text-[#4C4B4E] text-base mb-1">
        {label}
      </label>
      <div
        className={`bg-[#F6F7FB] items-center loginInput  flex rounded-[8px] 
          
        `}
      >
        <input
          onKeyDown={onKeyDown}
          defaultValue={value || ""}
          autoComplete="off"
          placeholder={placeholder}
          type={changeType ? "text" : type}
          maxLength={maxLength}
          className="w-full bg-[#F6F7FB] outline-none "
          {...register(
            registerName,

            required && {
              required: "Boş buraxıla bilməz",
              minLength: minLength,
              pattern: patterns,
              validate: validate,
            }
          )}
          aria-invalid={errors.registerName ? "true" : "false"}
          onBlur={onBlur}
        />

        {showUnShow && (
          <button type="button" onClick={() => setChangeType(!changeType)}>
            {changeType ? (
              <FiEye className="size-6  text-[#BCBCBE]" />
            ) : (
              <FiEyeOff className="size-6 text-[#BCBCBE]" />
            )}
          </button>
        )}
        {checkLoading && <Spin size="small" />}
      </div>
      {errors[registerName] && (
        <span className="text-[#EA3829]" role="alert">
          {errors[registerName].message}
        </span>
      )}
      {error && <p className="text-sm text-[#EA3829]">Şifrə uyğunlaşmır</p>}
    </div>
  );
}

export default Input;
