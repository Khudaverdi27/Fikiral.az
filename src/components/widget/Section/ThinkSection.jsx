import { Col, Row } from "antd";
import { CiBookmark } from "react-icons/ci";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { BiMessageSquareDots } from "react-icons/bi";
import { VscLink } from "react-icons/vsc";

function ThinkSection({ title, thinks = false }) {
  return (
    <article>
      <h4 className="text-2xl font-bold mt-14 mb-6">{title}</h4>
      <Row
        className="gap-y-5  min-w-[352px] min-h-[280px]"
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Col
          xl={{
            span: 8,
          }}
          lg={{
            span: 12,
          }}
          md={{ span: 12 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <div className="gutter-row ">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex space-x-1 items-center">
                  <figure className="size-8">
                    <img
                      className="img-cover"
                      src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1427"
                      alt=""
                    />
                  </figure>
                  <h6>Samir N.</h6>
                </div>

                <div className="space-x-2 flex items-center cursor-pointer">
                  <span>
                    <CiBookmark className="size-5" />
                  </span>
                  <span>
                    <HiOutlineDotsVertical className="size-5" />
                  </span>
                </div>
              </div>
              <div className="text-xs border-b-[1px] pb-2 space-x-4 border-[#DBDBDB] flex items-center">
                <span className="bg-[#6C58BB] text-white py-[2px] px-2 rounded-[4px] cursor-pointer">
                  Life style
                </span>
                <span className="text-[#808080] relative before:absolute before:size-[2px] before:bg-[#808080] before:rounded-full before:left-[-8px] before:bottom-[6px]">
                  2 gün əvvəl
                </span>
              </div>
              <p className="font-Manrope text-sm ">
                Yaxın ərazidə siqaret çəkmək üçün rahat məkan ( mobil tətbiq)
              </p>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center justify-center gap-x-[6px] ">
                <span>
                  <AiOutlineClose className="size-[22px] text-[#292D32] cursor-pointer" />
                </span>
                <span className="text-[17px] font-bold">32</span>
                <span>
                  <CiHeart className="size-[22px] text-[#292D32] cursor-pointer" />
                </span>
              </div>
              <div className="flex items-center  gap-x-[25px]">
                <div className="flex items-center justify-center space-x-1">
                  <span>
                    <BiMessageSquareDots className="size-[22px] text-[#5E6268] cursor-pointer" />
                  </span>
                  <span className="text-[17px] font-bold text-[#5E6268]">
                    12
                  </span>
                </div>

                <span>
                  <VscLink className="size-[22px] text-[#5E6268] cursor-pointer" />
                </span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </article>
  );
}

export default ThinkSection;
