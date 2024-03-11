import { Col, Row } from "antd";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import Input from "../../components/ui/Form/input";
import { getStorage, removeStorage } from "../../utils/helpers";
import { useModalActions } from "../../context/LoginModalProvider";
import DropdownMenu from "../../components/ui/Dropdown";
import { useCategories } from "../../hooks/useCategories";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from "react-router-dom";
import LogoutModal from "../../components/ui/Modals/LogoutModal";

function EditProfile() {
  const [activeBtn, setActiveBtn] = useState("main");
  const [selectedImage, setSelectedImage] = useState(null);
  const [emailValue, setEmailValue] = useState("");
  const [userValue, setUserValue] = useState("");
  const { category, selectedIds, loading } = useCategories(false, "checkbox");
  const [editedData, setEditedData] = useState({});
  // console.log(selectedIds);
  // console.log(emailValue);
  // console.log(userValue);
  // console.log(selectedImage);
  const {
    handleSubmit,
    onSubmit,
    checkUserName,
    authCheckUserNameLoading,
    checkMail,
    authCheckLoading,
  } = useModalActions();
  const user = getStorage("user");
  const inputRef = useRef(null);

  const logoutProfile = () => {
    removeStorage("token");
    removeStorage("user");
    removeStorage("selectedCategories");
    location.reload();
    location.href = "/";
  };

  const deleteProfile = () => {
    console.log("Delete");
  };

  const getEmailValue = (e) => {
    checkMail(e);
    setEmailValue(e);
  };

  const getUserName = (e) => {
    checkUserName(e);
    setUserValue(e);
  };

  const editBtns = [
    { name: "Əsas", key: "main" },
    { name: "Şifrə", key: "password" },
    {
      name: (
        <LogoutModal
          title={"Hesabdan çıxmaq istəyirsiz?"}
          dangerBtn={"Hesabdan çıxış"}
          destroyBtn={"Çıxış"}
          destroyProfile={logoutProfile}
          dangerBtnClass={true}
        />
      ),
      key: "logout",
    },
    {
      name: (
        <LogoutModal
          title={"Hesabı silmək istədiyinizə əminsiz?"}
          dangerBtn={"Hesabı sil"}
          destroyBtn={"Silin"}
          destroyProfile={deleteProfile}
        />
      ),
      key: "deleteAccount",
    },
  ];
  const handleActiveBtn = (btn) => {
    setActiveBtn(btn);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    const formData = new FormData();
    formData.append("image", file);
  };

  const clearFileInput = () => {
    setSelectedImage(null);
    inputRef.current.value = "";
  };

  useEffect(() => {
    setEditedData({
      userName: userValue,
      gmail: emailValue,
      categoryIds: selectedIds,
      image: selectedImage,
    });
    console.log(editedData);
  }, [userValue, selectedIds, emailValue, selectedImage]);

  return (
    <Row>
      <Col span={24}>
        <h3 className="text-[32px] font-semibold mb-7">Profili redaktə edin</h3>
      </Col>
      <Col span={10}>
        <div className=" editProfile">
          {editBtns.map((btn) => (
            <span
              className={classNames(
                {
                  "cursor-pointer": true,
                  "text-black":
                    activeBtn === btn.key && activeBtn !== "deleteAccount",
                },
                btn.key === "deleteAccount" && ["text-[#FF0000]"]
              )}
              onClick={() => handleActiveBtn(btn.key)}
              key={btn.key}
            >
              {btn.name}
            </span>
          ))}
        </div>
      </Col>
      <Col span={10} className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex relative space-x-7 mb-10 items-center ">
            <figure className="size-24 mt-2 rounded-full editImage">
              {selectedImage || user.image ? (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  className="img-cover rounded-full "
                  alt="user"
                />
              ) : (
                <span className="size-full text-5xl bg-gray-300  rounded-full border text-indigo-500 flex  justify-center items-center pb-2">
                  {user?.userResponse?.userName?.charAt(0).toLowerCase()}
                </span>
              )}
              {(selectedImage || user.image) && (
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
            required={true}
            label={"İstifadəçi adı"}
            placeholder={"İstifadəçi adı"}
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
            label={"E-poçt"}
            placeholder={"E-poçt daxil edin"}
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
          {emailValue && (
            <Input
              required={true}
              label={"Şifrə"}
              placeholder={"Şifrəni daxil edin"}
              type={"password"}
              maxLength={20}
              minLength={{
                value: 8,
                message: "Min 8 max 20 simvol",
              }}
              registerName={"password"}
            />
          )}

          <div className="mt-5">
            <p className="mb-2 text-base text-[#4C4B4E]">Maraqlarınızı seçin</p>
            <DropdownMenu
              loading={loading}
              dropName={
                <p className="text-[#4C4B4E] loginInput flex justify-between !font-normal !w-[434px] !py-[9px] ">
                  <span> Kateqoriya</span>
                  <FaAngleDown className="mt-1 text-gray-400" />
                </p>
              }
              dropDownItems={category}
              classes={
                "w-[314px] !top-[155px] max-h-[424px] overflow-x-hidden "
              }
            />
          </div>
          <div className=" !mt-16 flex justify-evenly">
            <Link
              to={"/home"}
              className=" whitespace-nowrap  text-indigo-500 py-2 px-4 rounded-xl 
        hover:outline outline-indigo-500 outline-[0.2px]"
            >
              Ləğv et
            </Link>
            <button
              type="submit"
              className=" border   bg-indigo-500 text-white py-2 px-4 rounded-xl"
            >
              Yadda saxla
            </button>
          </div>
        </form>
      </Col>
    </Row>
  );
}

export default EditProfile;
