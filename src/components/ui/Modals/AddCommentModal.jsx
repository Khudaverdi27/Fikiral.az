import { useEffect, useRef, useState } from "react";
import { Col, Input, Modal, Row, Space, Spin } from "antd";
import { BiMessageSquareDots } from "react-icons/bi";
import { IconContext } from "react-icons";
import { HiOutlineBookmark } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import ThinkCardActions from "../../widget/Thinks/ThinkCardActions";
import {
  changeTime,
  findFuckingWords,
  getStorage,
} from "../../../utils/helpers";
import { useModalActions } from "../../../context/LoginModalProvider";
import ThinkComments from "../../widget/Thinks/ThinkComment";
import { Link } from "react-router-dom";
import { usePostComments } from "../../../hooks/useFetch";
import { LoadingSpin } from "../../widget/Loading/ThinkSkeleton";
import { useClickAway, useMediaQuery } from "@uidotdev/usehooks";

const AddCommentModal = ({
  postNotifyFetch,
  userByIdData,
  bookmark,
  sendToSaveds,
  postId,
  commentLoading,
  allComments,
  comment,
  isCommentOpen,
  setIsCommentOpen,
  modalData,
  openMessageModal,
}) => {
  const [value, setValue] = useState("");
  const { setIsCommented } = useModalActions();
  const [data, postComment, postLoading] = usePostComments();
  const isMobile = useMediaQuery("only screen and (max-width : 480px)");
  const token = getStorage("token");

  const addNewComment = (e) => {
    e.preventDefault();
    const prettyComment = findFuckingWords(value);
    const postData = {
      content: value,
      userId: userByIdData.id,
      postId,
    };

    if (!prettyComment) {
      postComment(postData).then(() =>
        setTimeout(() => setIsCommented(true), 1500)
      );
      setValue("");
      postNotifyFetch({
        postId,
        postOwnerId: modalData?.user?.id,
        actionOwnerId: userByIdData.id,
        action: "comment",
      });
    } else {
      setValue("Qadağan olunmuş sözlərdən istifadə etməyin!");
      setTimeout(() => setValue(""), 1000);
    }
  };

  const closeMessageModal = () => {
    setIsCommentOpen(false);
  };

  // const inputRef = useRef();
  const refModal = useClickAway(() => {
    setIsCommentOpen(false);
  });

  return (
    <div className="commentModal">
      <div className="flex items-center justify-center ">
        <button onClick={openMessageModal}>
          <BiMessageSquareDots className="size-[22px] hover:text-black text-[#636363] cursor-pointer" />
        </button>
        <span className="text-sm hover:text-black dark:text-white font-bold text-[#636363] ml-2">
          {comment ?? 0}
        </span>
      </div>
      <Modal
        centered
        footer={false}
        width={772}
        className="bg-zinc-50 rounded-[8px]"
        closable={true}
        closeIcon={<IoMdClose className=" text-2xl text-[#232323] " />}
        open={isCommentOpen}
        onOk={closeMessageModal}
        onCancel={closeMessageModal}
      >
        <div ref={refModal}>
          <Row className="relative" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col
              className={`${
                isMobile ? "border-b pb-4" : "border-r"
              } " border-primaryGray mr-1"`}
              span={isMobile ? 24 : 11}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2 items-center">
                    <figure className="size-[52px] ">
                      {modalData?.user?.image ? (
                        <img
                          className="img-cover rounded-full"
                          src={`${modalData?.user?.image}`}
                          alt="user"
                        />
                      ) : (
                        <span className="size-full text-4xl bg-gray-300  rounded-full border text-indigo-500 flex justify-center">
                          {modalData?.user?.userName?.charAt(0).toLowerCase()}
                        </span>
                      )}
                    </figure>
                    <h6 className="text-[20px] dark:text-white font-fransisco">
                      {modalData?.user?.userName.split(" ")[0].toLowerCase()}
                    </h6>
                    {isMobile && (
                      <IconContext.Provider
                        value={{
                          color: "#636363",
                          className: `hover:stroke-black dark:hover:stroke-gray-300 ${
                            bookmark && "fill-primaryGray dark:fill-white"
                          } `,
                        }}
                      >
                        <HiOutlineBookmark
                          onClick={sendToSaveds}
                          className={`size-5 dark:!text-white cursor-pointer absolute right-7 top-[-2px] `}
                        />
                      </IconContext.Provider>
                    )}
                  </div>
                </div>
                <div className="text-xs border-b-[1px] pb-2 space-x-4 border-[#DBDBDB] flex items-center">
                  <Link
                    to={`/categories/${modalData?.category?.slug}`}
                    className="hover:bg-[#6C58BB] hover:text-white py-[2px] px-2 rounded-[4px] cursor-pointer text-[#808080] font-fransisco"
                  >
                    {modalData?.category?.name}
                  </Link>
                  <span className="dotForTime whitespace-nowrap font-fransisco">
                    {changeTime(modalData?.publishedAt)}
                  </span>
                </div>
                <p className="font-Manrope text-sm dark:text-white font-fransisco">
                  {modalData.content}
                </p>
              </div>
            </Col>

            <Col span={isMobile ? 24 : 11}>
              <div
                className={`overflow-auto max-h-[370px] h-[370px] ${
                  isMobile ? "mt-5" : "mt-16"
                } pr-4`}
              >
                {!isMobile && (
                  <div className="flex items-center justify-end space-x-2">
                    <IconContext.Provider
                      value={{
                        color: "#636363",
                        className: `hover:stroke-black dark:hover:stroke-gray-300 ${
                          bookmark && "fill-primaryGray dark:fill-white"
                        } `,
                      }}
                    >
                      <HiOutlineBookmark
                        onClick={sendToSaveds}
                        className={`size-5 dark:!text-white cursor-pointer absolute right-3 top-0 `}
                      />
                    </IconContext.Provider>
                  </div>
                )}

                {commentLoading ? (
                  <LoadingSpin />
                ) : (
                  <div className="space-y-3 ">
                    {allComments?.map((comment) => (
                      <ThinkComments
                        postNotifyFetch={postNotifyFetch}
                        key={comment.id}
                        comment={comment}
                        postId={postId}
                        postOwnerId={modalData?.user?.id}
                        // inputRef={inputRef}
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="space-y-3 py-1">
                <div className="border-t p-2 border-gray-300 border-b ">
                  <ThinkCardActions
                    thinksContent={modalData.content}
                    postId={postId}
                    likeCount={modalData.likeCount}
                    userByIdData={userByIdData}
                    disabled={false}
                  />
                </div>
                <form onSubmit={addNewComment}>
                  <Space.Compact className="w-full">
                    <Input
                      // ref={inputRef}
                      maxLength={250}
                      disabled={token.length == 0}
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      className="placeholder:font-[500] disabled:cursor-not-allowed placeholder:dark:text-white placeholder:dark:font-normal dark:text-white"
                      variant="borderless"
                      placeholder={
                        token.length !== 0
                          ? "Rəy bildir... (maximum 250 simvol)"
                          : "Rəy yazmaq üçün hesabınıza giriş edin"
                      }
                    />
                    <button
                      disabled={!value || value.includes("Qadağan")}
                      type="submit"
                      className={`text-primaryGray dark:text-white text-sm disabled:opacity-20 disabled:cursor-not-allowed ${
                        postLoading && "disabled:opacity-100"
                      }`}
                    >
                      {postLoading ? <Spin /> : "Paylaş"}
                    </button>
                  </Space.Compact>
                </form>
              </div>
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  );
};
export default AddCommentModal;
