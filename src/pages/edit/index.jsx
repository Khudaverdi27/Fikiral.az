import { Col, Row } from "antd";
import classNames from "classnames";
import { useState } from "react";
import { removeStorage } from "../../utils/helpers";
import LogoutModal from "../../components/ui/Modals/LogoutModal";
import EditWithPhoto from "./editWithPhoto";

function EditProfile() {
  const [activeBtn, setActiveBtn] = useState("main");

  const logoutProfile = () => {
    removeStorage("token");
    removeStorage("user");
    removeStorage("selectedCategories");
    location.reload();
    location.href = "/";
  };

  const deleteProfile = () => {
    // console.log("Delete");
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
      <EditWithPhoto />
    </Row>
  );
}

export default EditProfile;
