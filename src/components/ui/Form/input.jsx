import { useEffect, useState } from "react";
import { useModalActions } from "../../../context/LoginModalProvider";
import { Spin } from "antd";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Input({
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
}) {
  const [changeType, setChangeType] = useState(false);
  const { register, accescLogin, errors, reset, clearErrors } =
    useModalActions();

  useEffect(() => {
    clearErrors();
    reset();
  }, [accescLogin]);

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
          autoComplete="off"
          placeholder={placeholder}
          type={!changeType ? type : changeType && "text"}
          maxLength={maxLength}
          className="w-full bg-[#F6F7FB] outline-none "
          {...register(
            registerName,
            required && {
              required: "Boş buraxıla bilməz",
              minLength: minLength,
              pattern: patterns,
            }
          )}
          aria-invalid={errors.registerName ? "true" : "false"}
          onBlur={onBlur}
        />
        {label === "Şifrə" && (
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
    </div>
  );
}

export default Input;
