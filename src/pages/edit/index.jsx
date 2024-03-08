import { Col, Row } from "antd";
import classNames from "classnames";
import { useState } from "react";

function EditProfile() {
  const [activeBtn, setActiveBtn] = useState(false);
  const editBtns = [
    { name: "Əsas", key: "main" },
    { name: "Şifrə", key: "password" },
    { name: "Hesabdan çıxış", key: "logout" },
    { name: "Hesabı sil", key: "deleteAccount" },
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
      <Col span={14}>col-12</Col>
    </Row>
  );
}

export default EditProfile;
