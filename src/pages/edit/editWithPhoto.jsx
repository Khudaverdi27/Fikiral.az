import Input from "../../components/ui/Form/input";
import { FaAngleDown } from "react-icons/fa6";
import DropdownMenu from "../../components/ui/Dropdown";
import { useCategories } from "../../hooks/useCategories";
import { useModalActions } from "../../context/LoginModalProvider";
import { useEffect, useRef, useState } from "react";
import { useFetchAuthLogin } from "../../hooks/useFetch";

function EditWithPhoto({
  setCompeleteEdit,
  setEditDisable,
  editDisable,
  setUserImg,
}) {
  const inputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [emailValue, setEmailValue] = useState("");
  const [userValue, setUserValue] = useState("");
  const { category, loading, selectedIds } = useCategories(false, "checkbox");
  const {
    authCheckUserNameLoading,
    authCheckLoading,
    userByIdData,
    authCheckMail,
    errors,
    checkUserName,
    checkMail,
    watch,
  } = useModalActions();

  const [userLoginAuth, loginFetch, userLoginAuthLoading] = useFetchAuthLogin();
  const watchPass = watch("password");
  const watchName = watch("userName");
  const watchGmail = watch("gmail");
  const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}(?:\.[a-zA-Z]{2,})?$/;
  useEffect(() => {
    if (watchPass?.length > 7) {
      setEditDisable(false);
    } else {
      setEditDisable(true);
    }
  }, [watchPass]);

  useEffect(() => {
    setCompeleteEdit({
      userName: userValue,
      gmail: emailValue,
      categories: selectedIds,
    });
    if (selectedImage) {
      setEditDisable(false);
    }
  }, [userValue, selectedIds, emailValue, selectedImage]);

  const getEmailValue = (e) => {
    checkMail(e);
    setEmailValue(e);
  };

  const getUserName = (e) => {
    checkUserName(e);
    setUserValue(e);
  };

  useEffect(() => {
    if (
      !errors.userName &&
      watchName?.length > 3 &&
      userByIdData.userName !== watchName
    ) {
      setEditDisable(false);
    } else {
      setEditDisable(true);
    }
  }, [errors.userName, watchName]);

  useEffect(() => {
    if (
      !errors.gmail &&
      mailRegex.test(watchGmail) &&
      userByIdData.gmail !== watchGmail
    ) {
      setEditDisable(false);
    } else {
      setEditDisable(true);
    }
  }, [errors.gmail, watchGmail]);

  useEffect(() => {
    if (selectedIds.length > 0) {
      setEditDisable(false);
    } else if (!editDisable && selectedIds.length < 0) {
      setEditDisable(true);
    }
  }, [selectedIds.length]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    const formData = new FormData();
    formData.append("image", file);
    setUserImg(formData);
  };

  const clearFileInput = () => {
    setEditDisable(true);
    setSelectedImage(null);
    inputRef.current.value = "";
  };

  return (
    <>
      <div className="flex relative space-x-7 mb-10 items-center ">
        <figure className="size-24 mt-2 rounded-full editImage">
          {selectedImage || userByIdData?.image ? (
            <img
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : userByIdData?.image
              }
              className="img-cover rounded-full "
              alt="user"
            />
          ) : (
            <span className="size-full text-5xl bg-gray-300  rounded-full border text-indigo-500 flex  justify-center items-center pb-2">
              {userByIdData?.userName?.charAt(0).toLowerCase()}
            </span>
          )}
          {selectedImage && (
            <button
              type="button"
              onClick={clearFileInput}
              className="editImage-overlay "
            >
              Sil
            </button>
          )}
        </figure>

        <button
          type="button"
          className="relative  border font-[500] text-base border-indigo-500 text-indigo-500 py-2 px-4 rounded-xl"
        >
          Şəkil yüklə
          <input
            ref={inputRef}
            onChange={(e) => handleFileUpload(e)}
            className=" right-1 opacity-0  rounded-xl  absolute w-full bg-slate-950"
            type="file"
          />
        </button>
      </div>

      <Input
        label={"Yeni istifadəçi adı"}
        placeholder={"Yeni İstifadəçi adı"}
        type={"text"}
        maxLength={15}
        registerName={"userName"}
        patterns={{
          value: /\s*/,
          message: "Zəhmət olmasa boşluqlardan istifadə etməyin",
        }}
        onBlur={(e) => getUserName(e.target.value)}
        checkLoading={authCheckUserNameLoading}
      />
      <Input
        value={emailValue}
        label={"Yeni e-poçt"}
        placeholder={"Yeni e-poçt daxil edin"}
        type={"email"}
        maxLength={45}
        registerName={"gmail"}
        patterns={{
          value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}(?:\.[a-zA-Z]{2,})?$/,
          message: "Yazdığınız mail düzgün formatda deyil!",
        }}
        onBlur={(e) => getEmailValue(e.target.value)}
        checkLoading={authCheckLoading}
      />
      {!authCheckMail && emailValue.length > 0 && (
        <>
          <Input
            required={true}
            label={"Şifrə"}
            placeholder={"Şifrənizi daxil edin"}
            type={"password"}
            maxLength={20}
            minLength={{
              value: 8,
              message: "Min 8 max 20 simvol",
            }}
            registerName={"password"}
            showUnShow={true}
          />
          {watchPass?.length < 8 && (
            <span className="text-red-500">Min 8 max 20 simvol</span>
          )}
        </>
      )}

      <div className="mt-5">
        <p className="mb-2 text-base text-[#4C4B4E]">Maraqlarınızı seçin</p>
        <div className="loginInput flex justify-between items-center">
          <DropdownMenu
            loading={loading}
            dropName={
              <p className="text-[#4C4B4E] !font-normal w-[300px]">
                Kateqoriya
              </p>
            }
            dropDownItems={category}
            classes={
              "w-[434px] !left-[590px] !top-[157px] max-h-[424px] overflow-x-hidden "
            }
          />
          <FaAngleDown className="text-[#4C4B4E]" />
        </div>
      </div>
    </>
  );
}

export default EditWithPhoto;
