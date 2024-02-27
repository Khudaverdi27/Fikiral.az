import { useState } from "react";
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

const AddCommentModal = ({
  postId,
  allComments,
  comment,
  iscommentOpen,
  setIsCommentOpen,
  modalData,
  openMessageModal,
}) => {
  const [bookmark, setBookmark] = useState(false);
  const [value, setValue] = useState("");
  const { switcRegisterModal, setIsCommented } = useModalActions();
  const [data, postComment, postLoading] = usePostComments();

  const token = getStorage("token");
  const user = getStorage("user");

  const changeBookmark = () => {
    if (token.length <= 0) {
      switcRegisterModal();
      setIsCommentOpen(false);
    } else {
      setBookmark(!bookmark);
    }
  };

  const addNewComment = (e) => {
    const prettyComment = findFuckingWords(value);
    e.preventDefault();
    const postData = {
      content: value,
      userId: user.userResponse.id,
      postId,
    };
    if (!prettyComment) {
      postComment(postData).then(() => setIsCommented(true));
      setValue("");
    } else {
      setValue("Qadağan olunmuş sözlərdən istifadə etməyin!");
      setTimeout(() => {
        setValue("");
      }, 1000);
    }
  };
  const closeMessageModal = () => {
    setIsCommentOpen(false);
  };

  return (
    <div className="commentModal">
      <div className="flex items-center justify-center ">
        <button onClick={openMessageModal}>
          <BiMessageSquareDots className="size-[22px] hover:text-black text-[#636363] cursor-pointer" />
        </button>
        <span className="text-sm hover:text-black font-bold text-[#636363] ml-2">
          {comment ? comment : 0}
        </span>
      </div>
      <Modal
        centered
        footer={false}
        width={772}
        className="bg-zinc-50 rounded-[8px]"
        closable={true}
        closeIcon={<IoMdClose className=" text-2xl text-[#232323] " />}
        open={iscommentOpen}
        onOk={closeMessageModal}
        onCancel={closeMessageModal}
      >
        <Row className="relative" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="border-r border-primaryGray mr-1" span={11}>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex space-x-2 items-center">
                  <figure className="size-[52px] ">
                    {modalData?.user?.image ? (
                      <img
                        className="img-cover"
                        src={`${modalData?.user?.image}`}
                        alt="user"
                      />
                    ) : (
                      <span className="size-full text-4xl bg-gray-300 border-gray-500 rounded-full border text-indigo-500 flex justify-center">
                        {modalData?.user?.userName?.charAt(0).toLowerCase()}
                      </span>
                    )}
                  </figure>
                  <h6 className="text-[20px]">{modalData?.user?.userName}</h6>
                </div>
              </div>
              <div className="text-xs border-b-[1px] pb-2 space-x-4 border-[#DBDBDB] flex items-center">
                <Link
                  to={`/categories/${modalData?.category?.slug}`}
                  className="hover:bg-[#6C58BB] hover:text-white py-[2px] px-2 rounded-[4px] cursor-pointer"
                >
                  {modalData?.category?.name}
                </Link>
                <span className="dotForTime">
                  {changeTime(modalData?.publishedAt)}
                </span>
              </div>
              <p className="font-Manrope text-sm ">{modalData.content}</p>
            </div>
          </Col>

          <Col span={12}>
            <div className="overflow-auto max-h-[370px] h-[370px] mt-16 pr-4">
              <div className="flex items-center justify-end space-x-2">
                <IconContext.Provider
                  value={{
                    color: "#636363",
                    className: `hover:stroke-black  ${
                      bookmark && "fill-[#FFA524]"
                    } `,
                  }}
                ></IconContext.Provider>

                <IconContext.Provider
                  value={{
                    color: "#636363",
                    className: `hover:stroke-black  ${
                      bookmark && "fill-primaryGray"
                    } `,
                  }}
                >
                  <HiOutlineBookmark
                    onClick={changeBookmark}
                    className={`size-5  cursor-pointer absolute right-3 top-0 `}
                  />
                </IconContext.Provider>
              </div>

              <div className="space-y-3 ">
                {allComments?.map((comment, index) => (
                  <ThinkComments key={index} comment={comment} />
                ))}
              </div>
            </div>
            <div className="space-y-3 py-1">
              <div className="border-t p-2 border-gray-300 border-b ">
                <ThinkCardActions
                  postId={postId}
                  likeCount={modalData.likeCount}
                  disabled={false}
                />
              </div>
              <form onSubmit={addNewComment}>
                <Space.Compact className="w-full">
                  <Input
                    maxLength={250}
                    disabled={token.length == 0}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="placeholder:font-[500] disabled:cursor-not-allowed"
                    variant="borderless"
                    placeholder={
                      token.length !== 0
                        ? "Rəy bildir..."
                        : "Rəy yazmaq üçün hesabınıza giriş edin"
                    }
                  />
                  <button
                    disabled={!value || value.includes("Qadağan")}
                    type="submit"
                    className={`text-primaryGray text-sm disabled:opacity-20 disabled:cursor-not-allowed ${
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
      </Modal>
    </div>
  );
};
export default AddCommentModal;
