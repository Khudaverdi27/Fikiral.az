import { Col, Row } from "antd";
import classNames from "classnames";
import { useState } from "react";
import Input from "../../components/ui/Form/input";
import { getStorage } from "../../utils/helpers";
import { useModalActions } from "../../context/LoginModalProvider";

function EditProfile() {
  const [activeBtn, setActiveBtn] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { handleSubmit, onSubmit, checkUserName, authCheckUserNameLoading } =
    useModalActions();
  const editBtns = [
    { name: "Əsas", key: "main" },
    { name: "Şifrə", key: "password" },
    { name: "Hesabdan çıxış", key: "logout" },
    { name: "Hesabı sil", key: "deleteAccount" },
  ];
  const handleActiveBtn = (btn) => {
    setActiveBtn(btn);
  };
  const user = getStorage("user");

  return (
    <Row>
      <Col span={24}>
        <h3 className="text-[32px] font-semibold mb-7">Profili redaktə edin</h3>
      </Col>
      <Col span={10}>
        <div className=" editProfile">
          {editBtns.map((btn) => (
            <button
              className={classNames(
                {
                  "text-black":
                    activeBtn === btn.key && activeBtn !== "deleteAccount",
                },
                btn.key === "deleteAccount" && ["text-[#FF0000]"]
              )}
              onClick={() => handleActiveBtn(btn.key)}
              key={btn.key}
            >
              {btn.name}
            </button>
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
                  className="img-cover "
                  alt="user"
                />
              ) : (
                <span className="size-full text-3xl bg-gray-300 border-gray-500 rounded-full border text-indigo-500 flex  justify-center items-center">
                  U
                </span>
              )}
              <button
                onClick={() => setSelectedImage(null)}
                className="editImage-overlay "
              >
                Sil
              </button>
            </figure>

            <button className="relative  border font-[500] text-base border-indigo-500 text-indigo-500 py-2 px-4 rounded-xl">
              Şəkil yüklə
              <input
                onChange={(event) => {
                  console.log(event.target.files[0]);
                  setSelectedImage(event.target.files[0]);
                }}
                className=" right-1 opacity-0  rounded-xl  absolute w-full bg-slate-950"
                type="file"
              />
            </button>
          </div>

          <Input
            label={"İstifadəçi adı"}
            placeholder={"İstifadəçi adı"}
            type={"text"}
            maxLength={15}
            registerName={"userName"}
            patterns={{
              value: /\s*/,
              message: "Zəhmət olmasa boşluqlardan istifadə etməyin",
            }}
            onBlur={(e) => checkUserName(e.target.value)}
            checkLoading={authCheckUserNameLoading}
          />
          <Input
            label={"E-poçt"}
            placeholder={"E-poçt daxil edin"}
            type={"email"}
            maxLength={45}
            registerName={"gmail"}
            patterns={{
              value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}(?:\.[a-zA-Z]{2,})?$/,
              message: "Yazdığınız mail düzgün formatda deyil!",
            }}
          />
          <Input
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
          <div className=" !mt-16 flex justify-evenly">
            <button
              type="button"
              className=" whitespace-nowrap  text-indigo-500 py-2 px-4 rounded-xl 
        hover:outline outline-indigo-500 outline-[0.2px]"
            >
              Ləğv et
            </button>
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
