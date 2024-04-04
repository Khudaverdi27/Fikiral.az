import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { useEffect, useState } from "react";
import {
  removeStorage,
  getStorage,
  removeLocaleStorage,
} from "../../utils/helpers";
import IsConfirmModal from "../../components/ui/Modals/IsConfirmModal";
import EditWithPhoto from "./editWithPhoto";
import EditPassword from "./editPassword";
import { postImage } from "../../utils/request";
import { useModalActions } from "../../context/LoginModalProvider";
import {
  useUpdateUserById,
  useDeleteUserById,
  useFetchAuthLogin,
  useChangeUserPassword,
} from "../../hooks/useFetch";
import { LoadingSpin } from "../../components/widget/Loading/ThinkSkeleton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMediaQuery } from "@uidotdev/usehooks";
import { FloatButton } from "antd";
import { RxReset } from "react-icons/rx";
import {
  RiCloseLine,
  RiDeleteBin6Line,
  RiLockPasswordLine,
  RiLogoutCircleLine,
} from "react-icons/ri";
import { FiEdit } from "react-icons/fi";

function EditProfile() {
  const [activeBtn, setActiveBtn] = useState("main");
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [compeleteEdit, setCompeleteEdit] = useState(false);
  const [userImg, setUserImg] = useState(false);
  const [editDisable, setEditDisable] = useState(true);
  const { userByIdData, getUserFetch, userLoading, watch } = useModalActions();
  const [userLoginAuth, loginFetch, userLoginAuthLoading] = useFetchAuthLogin();
  const [updatedRes, fetchUpdateUser] = useUpdateUserById();
  const [deletedUser, deletedUserFetch] = useDeleteUserById();
  const [passValue, setPassValue] = useState(false);
  const [errMsg, setErrMsg] = useState(false);
  const [changedPassRes, newPasswordFetch] = useChangeUserPassword();
  const isMobile = useMediaQuery("only screen and (max-width : 578px)");

  const logoutProfile = () => {
    removeStorage("token");
    removeStorage("userId");
    removeStorage("selectedCategories");
    removeStorage("social");
    removeLocaleStorage("gmail");
    location.reload();
    location.href = "/";
  };

  const userId = getStorage("userId");
  const watchPass = watch("password");
  const notify = () => toast.success("Məlumatlarınız uğurla yeniləndi!");

  useEffect(() => {
    if (watchPass?.length > 7) {
      loginFetch({ gmail: userByIdData.gmail, password: watchPass });
    }
  }, [watchPass]);

  useEffect(() => {
    if (userLoginAuth.userResponse) {
      setErrMsg("");
    } else if (userLoginAuth.status === 500) {
      setErrMsg("Şifrə səhvdir!");
      setTimeout(() => {
        setErrMsg("");
      }, 3000);
    } else {
      setErrMsg("Min 8 max 20 simvol");
    }
  }, [userLoginAuth]);

  useEffect(() => {
    if (userLoginAuth.userResponse) {
      setEditDisable(false);
    } else {
      setEditDisable(true);
    }
  }, [userLoginAuth]);

  useEffect(() => {
    getUserFetch(userId);
  }, []);

  const deleteProfile = () => {
    deletedUserFetch(userId);
  };

  useEffect(() => {
    if (deletedUser.status === 200) {
      logoutProfile();
    }
  }, [deletedUser]);

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

  const editIcons = (key) => {
    const editIcons = {
      main: <RxReset />,
      password: <RiLockPasswordLine />,
      logout: (
        <IsConfirmModal
          title={"Hesabdan çıxmaq istəyirsiz?"}
          dangerBtn={<RiLogoutCircleLine />}
          destroyBtn={"Çıxış"}
          destroyProfile={logoutProfile}
          dangerBtnClass={true}
        />
      ),
      deleteAccount: (
        <IsConfirmModal
          title={"Hesabı silmək istədiyinizə əminsiz?"}
          dangerBtn={<RiDeleteBin6Line className="text-red-500" />}
          destroyBtn={"Silin"}
          destroyProfile={deleteProfile}
        />
      ),
    };
    return editIcons[key];
  };

  const handleWithoutPassword = () => {
    if (userImg && compeleteEdit) {
      postImage(userImg, userByIdData.id).then(() =>
        fetchUpdateUser(userId, compeleteEdit)
      );
    } else if (userImg) {
      postImage(userImg, userByIdData.id).then(() => {
        setTimeout(() => {
          location.href = "/home";
        }, 2200);
      });
    } else if (compeleteEdit) {
      fetchUpdateUser(userId, compeleteEdit);
    }
  };

  const handleChangePassword = () => {
    newPasswordFetch(compeleteEdit);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setEditDisable(true);

    if (!showEditPassword) {
      handleWithoutPassword();
    } else {
      handleChangePassword();
    }
  };

  useEffect(() => {
    if (updatedRes.status === 200 || changedPassRes.status === 200) {
      notify();
      setTimeout(() => {
        location.href = "/home";
      }, 2200);
    }
  }, [updatedRes]);

  return (
    <>
      {userLoading ? (
        <LoadingSpin />
      ) : (
        <Row>
          <Col span={24}>
            <h3
              className={`font-semibold mb-7 ${
                isMobile ? "text-2xl text-center" : "text-[32px] "
              }`}
            >
              Profili redaktə edin
            </h3>
          </Col>
          {!isMobile && (
            <Col
              lg={{
                span: 10,
              }}
              xl={{
                span: 10,
              }}
              md={{
                span: 12,
              }}
              sm={{ span: 12 }}
              xs={{ span: 24 }}
            >
              <div
                className={`space-y-3 flex flex-col text-[16px] text-[#999999] font-[500] w-1/4 ml-5 items-start`}
              >
                {editBtns.map((btn) => (
                  <span
                    className={classNames(
                      {
                        "cursor-pointer": true,
                        "text-black dark:text-white":
                          activeBtn === btn.key &&
                          activeBtn !== "deleteAccount",
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
          )}
          <Col
            lg={{
              span: 10,
            }}
            xl={{
              span: 10,
            }}
            md={{
              span: 12,
            }}
            sm={{ span: 12 }}
            xs={{ span: 24 }}
          >
            <form className="space-y-5" onSubmit={(e) => handleSaveEdit(e)}>
              {showEditPassword ? (
                <EditPassword
                  setPassValue={setPassValue}
                  setCompeleteEdit={setCompeleteEdit}
                  userLoginAuthLoading={userLoginAuthLoading}
                  errMsg={errMsg}
                />
              ) : (
                <EditWithPhoto
                  setUserImg={setUserImg}
                  setCompeleteEdit={setCompeleteEdit}
                  setEditDisable={setEditDisable}
                  editDisable={editDisable}
                  passValue={passValue}
                  setPassValue={setPassValue}
                  userLoginAuth={userLoginAuth}
                  loginFetch={loginFetch}
                  userLoginAuthLoading={userLoginAuthLoading}
                  errMsg={errMsg}
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
                  className=" border disabled:opacity-35 dark:border-none  bg-indigo-500 text-white py-2 px-4 rounded-xl"
                >
                  Yadda saxla
                </button>
              </div>
            </form>
          </Col>
          {isMobile && (
            <>
              <FloatButton.Group
                trigger="click"
                type="primary"
                style={{
                  right: 24,
                  bottom: 100,
                }}
                icon={<FiEdit />}
              >
                {editBtns.map((btn) => (
                  <FloatButton
                    icon={editIcons(btn.key)}
                    onClick={() => handleActiveBtn(btn.key)}
                    key={btn.key}
                  />
                ))}
              </FloatButton.Group>
            </>
          )}
        </Row>
      )}
    </>
  );
}

export default EditProfile;
