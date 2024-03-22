import { useState } from "react";
import { useModalActions } from "../../../context/LoginModalProvider";
import { LoadingSpin } from "../../widget/Loading/ThinkSkeleton";
import AddCommentModal from "../Modals/AddCommentModal";
import { useFetchCommentLists } from "../../../hooks/useFetch";

export const DropNotifications = () => {
  const { notifyRes, notifyResloading } = useModalActions();
  const [dataModal, setDataModal] = useState({});
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [allComments, fetchComments, commentLoading] = useFetchCommentLists();

  const openMessageModal = (data) => {
    setIsCommentOpen(true);
    setDataModal(data);
    fetchComments(data.id);
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
                    ? "postunuzu bəyəndi baxmaq..."
                    : item.action === "dislike"
                    ? "postunuzu bəyənmədi baxmaq ..."
                    : item.action === "comment"
                    ? "postunuza fikir bildirdi baxmaq..."
                    : item.action === "commentlike"
                    ? "rəyinizi bəyəndi baxmaq..."
                    : ""}
                </button>
              </div>
            </div>
          ))}
          {isCommentOpen && (
            <AddCommentModal
              isCommentOpen={isCommentOpen}
              setIsCommentOpen={setIsCommentOpen}
              modalData={dataModal}
              allComments={allComments}
              commentLoading={commentLoading}
            />
          )}
        </>
      ),
    },
  ];

  return [notifications, notifyRes];
};
