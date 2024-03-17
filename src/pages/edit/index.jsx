import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { removeStorage, getStorage } from "../../utils/helpers";
import IsConfirmModal from "../../components/ui/Modals/IsConfirmModal";
import EditWithPhoto from "./editWithPhoto";
import EditPassword from "./editPassword";
import { postImage } from "../../utils/request";
import { useModalActions } from "../../context/LoginModalProvider";
import { useUpdateUserById } from "../../hooks/useFetch";

function EditProfile() {
  const [activeBtn, setActiveBtn] = useState("main");
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [compeleteEdit, setCompeleteEdit] = useState(false);
  const [userImg, setUserImg] = useState(false);
  const [editDisable, setEditDisable] = useState(true);
  const { userByIdData } = useModalActions();
  const [updatedRes, fetchUpdateUser, updateLoading] = useUpdateUserById();
  const logoutProfile = () => {
    removeStorage("token");
    removeStorage("userId");
    removeStorage("selectedCategories");
    location.reload();
    location.href = "/";
  };

  const userId = getStorage("userId");

  const deleteProfile = () => {
    // console.log("Delete");
  };

  const editBtns = [
    { name: "Əsas", key: "main" },
    { name: "Şifrə", key: "password" },
    {
      name: (
        <IsConfirmModal
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
        <IsConfirmModal
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
    if (btn === "password") {
      setShowEditPassword(true);
    } else if (btn === "main") {
      setShowEditPassword(false);
    }
  };

  const handleSaveEdit = (e) => {
    if (
      userImg &&
      compeleteEdit.userName &&
      compeleteEdit.gmail &&
      compeleteEdit.categories.length > 0
    ) {
      postImage(userImg, userByIdData.id).then(() =>
        fetchUpdateUser(userId, compeleteEdit)
      );
      setEditDisable(true);
    } else if (userImg) {
      setEditDisable(true);
      postImage(userImg, userByIdData.id).then(() => {
        location.href = "/home";
      });
    } else if (compeleteEdit.userName) {
      setEditDisable(true);
      fetchUpdateUser(userId, { userName: compeleteEdit.userName });
    } else if (compeleteEdit.gmail) {
      fetchUpdateUser(userId, { gmail: compeleteEdit.gmail });
    } else if (compeleteEdit.categories.length > 0) {
      fetchUpdateUser(userId, { categories: compeleteEdit.categories });
    }

    e.preventDefault();
  };

  useEffect(() => {
    if (updatedRes.status === 200) {
      location.href = "/home";
    }
  }, [updatedRes]);

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
      <Col span={10}>
        <form className="space-y-5" onSubmit={(e) => handleSaveEdit(e)}>
          {showEditPassword ? (
            <EditPassword
              setCompeleteEdit={setCompeleteEdit}
              setEditDisable={setEditDisable}
            />
          ) : (
            <EditWithPhoto
              setUserImg={setUserImg}
              setCompeleteEdit={setCompeleteEdit}
              setEditDisable={setEditDisable}
              editDisable={editDisable}
            />
          )}
          <div className=" !mt-16 flex justify-evenly items-center">
            <Link to={"/home"}>
              <span
                className=" whitespace-nowrap  text-indigo-500 py-2 px-4 rounded-xl 
    hover:outline outline-indigo-500 outline-[0.2px]"
              >
                Ləğv et
              </span>
            </Link>
            <button
              disabled={editDisable}
              type="submit"
              className=" border disabled:opacity-35  bg-indigo-500 text-white py-2 px-4 rounded-xl"
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
