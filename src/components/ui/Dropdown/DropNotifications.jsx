import { useState } from "react";
import { useModalActions } from "../../../context/LoginModalProvider";
import { LoadingSpin } from "../../widget/Loading/ThinkSkeleton";
import AddCommentModal from "../Modals/AddCommentModal";

export const DropNotifications = () => {
  const { notifyRes, notifyResloading } = useModalActions();
  const [dataModal, setDataModal] = useState({});
  const [iscommentOpen, setIsCommentOpen] = useState(false);

  const openMessageModal = (data) => {
    setIsCommentOpen(true);
    setDataModal(data);
  };

  const notifications = [
    {
      name: "Bildirşlər",
      title: "",
    },
    {
      title: notifyResloading ? (
        <LoadingSpin />
      ) : (
        <>
          {notifyRes?.map((item, index) => (
            <div
              key={index}
              className="flex  items-center space-x-2 mb-5 pb-2   "
            >
              <figure className="size-11 shrink-0">
                {item?.actionOwnerImage ? (
                  <img
                    className="img-cover rounded-full"
                    src={`${item?.actionOwnerImage}`}
                    alt="user"
                  />
                ) : (
                  <span className="size-full text-2xl bg-gray-300  rounded-full border text-indigo-500 flex justify-center">
                    {item?.actionOwnerName?.charAt(0).toLowerCase()}
                  </span>
                )}
              </figure>
              <div className="text-sm text-black dark:text-white space-x-5 flex justify-between">
                <span className=" whitespace-nowrap ">
                  {item.actionOwnerName}
                </span>
                <button
                  onClick={() => openMessageModal(item?.post)}
                  className="line-clamp-1 shrink-0 "
                >
                  {item.action === "like"
                    ? "postunuzu bəyəndi baxmaq üçün toxun"
                    : item.action === "dislike"
                    ? "postunuzu bəyənmədi baxmaq üçün toxun"
                    : item.action === "comment"
                    ? "postunuza fikir bildirdi baxmaq üçün toxun"
                    : item.action === "commentlike"
                    ? "rəyinizi bəyəndi baxmaq üçün toxun"
                    : ""}
                </button>
              </div>
            </div>
          ))}
          {iscommentOpen && (
            <AddCommentModal
              iscommentOpen={iscommentOpen}
              setIsCommentOpen={setIsCommentOpen}
              modalData={dataModal}
            />
          )}
        </>
      ),
    },
  ];

  return [notifications, notifyRes];
};
