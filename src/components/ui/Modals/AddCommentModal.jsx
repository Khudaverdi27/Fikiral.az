import { useState } from "react";
import { Col, Input, Modal, Row, Space } from "antd";
import { BiMessageSquareDots } from "react-icons/bi";
import { IconContext } from "react-icons";
import { HiOutlineBookmark } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import ThinkComments from "../../widget/Section/ThinkComment";
import ThinkCardActions from "../../widget/Section/ThinkCardActions";
const AddCommentModal = () => {
  const comments = [
    "Çox bəyəndim bu fikri",
    "Çox bəyəndim bu fikri",
    "Çox bəyəndim bu fikri",
  ];

  const [iscommentOpen, setIsCommentOpen] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const [newComment, setNewComment] = useState(comments);
  const [value, setValue] = useState("");

  const addNewComment = (e) => {
    e.preventDefault();
    setNewComment([...newComment, value]);
  };
  return (
    <div className="commentModal">
      <div className="flex items-center justify-center ">
        <button onClick={() => setIsCommentOpen(true)}>
          <BiMessageSquareDots className="size-[22px] hover:text-black text-[#636363] cursor-pointer" />
        </button>
        <span className="text-sm hover:text-black font-bold text-[#636363] ml-2">
          {comments.length}
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
        onOk={() => setIsCommentOpen(false)}
        onCancel={() => setIsCommentOpen(false)}
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
                  <h6 className="text-[20px]">Samir N.</h6>
                </div>
              </div>
              <div className="text-xs border-b-[1px] pb-2 space-x-4 border-[#DBDBDB] flex items-center">
                <span className="hover:bg-[#6C58BB] hover:text-white py-[2px] px-2 rounded-[4px] cursor-pointer">
                  Lifestyle
                </span>
                <span className="text-[#808080]  ">2 gün əvvəl</span>
              </div>
              <p className="font-Manrope text-sm ">
                Yaxın ərazidə siqaret çəkmək üçün rahat məkan ( mobil tətbiq)
              </p>
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
                      bookmark && "fill-[#FFA524]"
                    } `,
                  }}
                >
                  <HiOutlineBookmark
                    onClick={() => setBookmark(!bookmark)}
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
                <ThinkCardActions disabled={false} />
              </div>
              <form onSubmit={addNewComment}>
                <Space.Compact className="w-full">
                  <Input
                    onChange={(e) => setValue(e.target.value)}
                    className="placeholder:font-[400]"
                    variant="borderless"
                    placeholder="Rəy bildir..."
                  />
                  <button type="submit" className="text-primaryGray text-sm">
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
