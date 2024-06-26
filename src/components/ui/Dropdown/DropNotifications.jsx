import { useState } from "react";
import { useModalActions } from "../../../context/LoginModalProvider";
import { LoadingSpin } from "../../widget/Loading/ThinkSkeleton";
import AddCommentModal from "../Modals/AddCommentModal";
import {
  useDeleteNotifyUserById,
  useFetchCommentLists,
  usePostNotify,
} from "../../../hooks/useFetch";
import _ from "lodash";

export const DropNotifications = () => {
  const { notifyRes, notifyResloading } = useModalActions();
  const [resDeleteNotify, deleteNotifiyFetch, loadingNot] =
    useDeleteNotifyUserById();
  const [dataModal, setDataModal] = useState({});
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [allComments, fetchComments, commentLoading] = useFetchCommentLists();
  const [postNotifyFetch] = usePostNotify();
  const [read, setRead] = useState([]);

  const openMessageModal = (data, notifyId) => {
    setIsCommentOpen(true);
    setDataModal(data);
    fetchComments(data.id);
    markAsRead(notifyId);
    deleteNotifiyFetch(notifyId);
  };

  const markAsRead = (key) => {
    setRead(() => [...read, key]);
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
          {_.map(notifyRes, (item, index) => (
            <div
              key={index}
              className="flex justify-between items-center pb-2  w-full "
            >
              <div className="flex items-center space-x-2 w-4/12 ">
                <figure className="size-11 shrink-0">
                  {item?.actionOwnerImage ? (
                    <img
                      className="img-cover rounded-full"
                      src={`${item?.actionOwnerImage}`}
                      alt="user"
                    />
                  ) : (
                    <span className="size-full text-2xl bg-gray-300  rounded-full border text-indigo-500 flex justify-center">
                      {item?.actionOwnerName?.charAt(0).toLowerCase() === "y"
                        ? "a"
                        : item?.actionOwnerName?.charAt(0).toLowerCase()}
                    </span>
                  )}
                </figure>
                <div
                  className={`text-[15px]  dark:text-white space-x-5 flex justify-between ${
                    read.includes(item.id) ? "text-gray-500" : "text-black"
                  }`}
                >
                  <span className=" whitespace-nowrap ">
                    {_.split(item.actionOwnerName, " ", 1)[0].toLowerCase() ===
                    "yenifikir"
                      ? "admin"
                      : _.split(item.actionOwnerName, " ", 1)[0].toLowerCase()}
                  </span>
                </div>
              </div>
              <button
                onClick={() => openMessageModal(item?.post, item.id)}
                className={`line-clamp-1 shrink-0 text-right w-7/12  ${
                  read.includes(item.id) ? "text-gray-500" : "text-black"
                }`}
              >
                {item.action === "LIKE"
                  ? "postunuzu bəyəndi bax..."
                  : item.action === "DISLIKE"
                  ? "postunuzu bəyənmədi bax..."
                  : item.action === "COMMENT"
                  ? "postunuza fikir bildirdi bax..."
                  : item.action === "COMMENTLIKE"
                  ? "rəyinizi bəyəndi bax..."
                  : item.action === "ACCEPT"
                  ? "postunuzu təsdiqlədi bax..."
                  : ""}
              </button>
            </div>
          ))}
          {isCommentOpen && (
            <AddCommentModal
              isCommentOpen={isCommentOpen}
              setIsCommentOpen={setIsCommentOpen}
              modalData={dataModal}
              allComments={allComments}
              commentLoading={commentLoading}
              postNotifyFetch={postNotifyFetch}
            />
          )}
        </>
      ),
    },
  ];

  return [notifications, notifyRes];
};
