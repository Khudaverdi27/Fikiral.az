import { Col, Row } from "antd";
import { useState } from "react";

function EditProfile() {
  const [activeBtn, setActiveBtn] = useState(false);

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
          <button
            className={`${activeBtn === "Əsas" ? "text-black" : ""}`}
            onClick={() => handleActiveBtn("Əsas")}
          >
            Əsas
          </button>
          <button
            className={`${activeBtn === "Şifrə" ? "text-black" : ""}`}
            onClick={() => handleActiveBtn("Şifrə")}
          >
            Şifrə
          </button>
          <button
            className={`${activeBtn === "Hesabdan çıxış" ? "text-black" : ""}`}
            onClick={() => handleActiveBtn("Hesabdan çıxış")}
          >
            Hesabdan çıxış
          </button>
          <hr className="w-[170px] mx-auto h-[2px] bg-[#9999]" />
          <button
            onClick={() => handleActiveBtn("Hesabı sil")}
            className="text-[#FF0000]"
          >
            Hesabı sil
          </button>
        </div>
      </Col>
      <Col span={14}>col-12</Col>
    </Row>
  );
}

export default EditProfile;
