import { useState } from "react";
import { Col, Input, Modal, Row, Space } from "antd";
import { BiMessageSquareDots } from "react-icons/bi";
import { IconContext } from "react-icons";
import { HiOutlineBookmark } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import ThinkCardActions from "../../widget/Thinks/ThinkCardActions";
import { getStorage } from "../../../utils/helpers";
import { useModalActions } from "../../../context/LoginModalProvider";
import ThinkComments from "../../widget/Thinks/ThinkComment";

const AddCommentModal = ({
  comment,
  iscommentOpen,
  setIsCommentOpen,
  modalData,
  openMessageModal,
  changeTime,
}) => {
  const [bookmark, setBookmark] = useState(false);
  const [newComment, setNewComment] = useState([]);
  const [value, setValue] = useState("");
  const { switcRegisterModal } = useModalActions();

  const token = getStorage("token");

  const changeBookmark = () => {
    if (!token) {
      switcRegisterModal();
      setIsCommentOpen(false);
    } else {
      setBookmark(!bookmark);
    }
  };
  const addNewComment = (e) => {
    e.preventDefault();
    setNewComment([...newComment, value]);
    setValue("");
  };
  const closeMessageModal = () => {
    setIsCommentOpen(false);
    console.log(iscommentOpen);
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
                  <figure className="size-[52px]">
                    <img
                      className="img-cover"
                      src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1427"
                      alt=""
                    />
                  </figure>
                  <h6 className="text-[20px]">{modalData.userName}</h6>
                </div>
              </div>
              <div className="text-xs border-b-[1px] pb-2 space-x-4 border-[#DBDBDB] flex items-center">
                <span className="hover:bg-[#6C58BB] hover:text-white py-[2px] px-2 rounded-[4px] cursor-pointer">
                  {modalData.category}
                </span>
                <span className="dotForTime">
                  {changeTime(modalData.publishedAt)}
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
                {newComment.map((comment, index) => (
                  <ThinkComments key={index} comment={comment} />
                ))}
              </div>
            </div>
            <div className="space-y-3 py-1">
              <div className="border-t p-2 border-gray-300 border-b ">
                <ThinkCardActions likes={modalData.likes} disabled={false} />
              </div>
              <form onSubmit={addNewComment}>
                <Space.Compact className="w-full">
                  <Input
                    disabled={!token}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="placeholder:font-[500] disabled:cursor-not-allowed"
                    variant="borderless"
                    placeholder={
                      token
                        ? "Rəy bildir..."
                        : "Rəy yazmaq üçün hesabınıza giriş edin"
                    }
                  />
                  <button
                    disabled={!value}
                    type="submit"
                    className="text-primaryGray text-sm disabled:opacity-20 disabled:cursor-not-allowed"
                  >
                    Paylaş
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
