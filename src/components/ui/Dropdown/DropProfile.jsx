import { Link } from "react-router-dom";
import { Skeleton, Space } from "antd";
import { useModalActions } from "../../../context/LoginModalProvider";
import { removeLocaleStorage, removeStorage } from "../../../utils/helpers";
import DropdownMenu from ".";
import IsConfirmModal from "../Modals/IsConfirmModal";
function DropProfile({ top, onClick, openDrawer }) {
  const { userByIdData, userLoading } = useModalActions();
  const logoutProfile = () => {
    removeStorage("token");
    removeStorage("userId");
    removeStorage("selectedCategories");
    removeStorage("social");
    removeLocaleStorage("gmail");
    location.reload();
    location.href = "/";
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <div className="!mr-2">
      {!userLoading ? (
        <DropdownMenu
          openDrawer={openDrawer}
          classes={`w-[142px] max-h-[108px] ${top || "!top-[85px]"}`}
          dropName={
            <span className="text-primaryGray dark:text-white text-base">
              {userByIdData?.userName?.split(" ")[0].toLowerCase()}
            </span>
          }
          profilImg={
            userByIdData?.image ||
            userByIdData?.userName?.charAt(0).toLowerCase()
          }
          dropDownItems={[
            {
              id: "editProfil",
              title: (
                <Link
                  onClick={handleClick}
                  to={"/edit-my-profile"}
                  className="flex items-center dark:text-white  text-base "
                >
                  Redaktə et
                </Link>
              ),
            },
            {
              id: "logoutProfile",
              title: (
                <IsConfirmModal
                  title={"Hesabdan çıxmaq istəyirsiz?"}
                  dangerBtn={"Çıxış"}
                  destroyBtn={"Çıxış"}
                  destroyProfile={logoutProfile}
                />
              ),
            },
          ]}
        />
      ) : (
        <Space>
          <Skeleton.Avatar active size={"large"} shape={"circle"} />
          <Skeleton.Button active size={"default"} shape={"square"} />
        </Space>
      )}
    </div>
  );
}

export default DropProfile;
