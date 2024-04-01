import { useState } from "react";
import { Modal, Collapse } from "antd";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
function ContactFooter() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const items = [
    {
      key: "1",
      label: "Bu saytda biznes ideyamı paylaşmağın mənə nə faydası var?",
      children: (
        <p>
          Biznes ideyanızı paylaşaraq təkmilləşdirməyə kömək edə biləcək digər
          istifadəçilərdən rəy, və məsləhət almağa, tələbi müəyyən etməyə dəstək
          olacaqdır. Həmçinin potensial partnyorları, investorları və ya
          müştəriləri cəlb edə, biznes ictimayyətində nüfuzunuzu gücləndirə və
          əlaqələrin qurulmasına kömək edə bilər.
        </p>
      ),
    },
    {
      key: "2",
      label:
        "Mənim biznes ideyamın bu platformada qanunsuz surətdə təkrarlandığından və ya istifadə edildiyindən şübhələnirəmsə, mənim hansı müraciətim ola bilər?",
      children: (
        <p>
          Əgər biznes ideyanızı saytımızda paylaşdıqdan sonra oğurlandığını və
          ya təkrarlandığını aşkar etsəniz, ilk növbədə əqli mülkiyyət və
          müəllif hüquqlarının qorunması üzrə ixtisaslaşmış hüquq məsləhətçisi
          və ya vəkillə əlaqə saxlamalısınız. Onlar vəziyyəti
          qiymətləndirdirdikdən sonra hüquqlarınızı qorumağa kömək edə
          biləcəklər. Bu kimi halların baş verməməsi üçün biznes ideyanızı
          həyata keçirtmək üçün ən vacib olan nüansları qeyd etməməyə çalışın.
        </p>
      ),
    },
    {
      key: "3",
      label:
        "Mən bu veb saytdan biznes ideyamı yeniləyə və ya silə bilərəmmi və bunun üçün hansı prosedurlar var?",
      children: (
        <p>
          Əlbətdə, fikir paylaşan istifadəçilər istənilən vaxt, şəxsi
          paylaşımlarının üst sağ hissəsində yerləşən 3 nöqtəyə daxil olub,
          fikri silə və düzəliş edə bilərlər.
        </p>
      ),
    },
    {
      key: "4",
      label:
        "Bu platformada öz biznes ideyalarını paylaşan istifadəçilərin uğur hekayələri və ya rəyləri varmı? ",
      children: (
        <p>
          Uğur hekayələri rubrikamız rəsmi social şəbəkə platformalarımızda
          mütəmadi olaraq paylaşılır.
        </p>
      ),
    },
  ];

  return (
    <>
      <div className="space-y-2 ">
        <h6 className="text-sm font-semibold text-black dark:text-white">
          Dəstək
        </h6>
        <button
          onClick={showModal}
          className="text-xs text-primaryGray dark:text-white"
        >
          Tez-tez verilən suallar
        </button>
        <Link
          to={"/privacy_policy"}
          className="text-xs text-primaryGray block dark:text-white"
        >
          Məxfilik qaydaları
        </Link>
      </div>
      <Modal
        width={800}
        className="bg-zinc-50 rounded-[8px] dark:text-white"
        title={<span className="text-xl ">Tez-tez verilən suallar</span>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={true}
        closeIcon={<IoMdClose className=" text-2xl text-[#232323] " />}
        footer={false}
        centered={true}
      >
        <Collapse
          className="font-fransisco dark:border-gray-500"
          accordion
          items={items}
        />
      </Modal>
    </>
  );
}

export default ContactFooter;
