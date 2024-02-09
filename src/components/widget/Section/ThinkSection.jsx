import { Col, Row } from "antd";
import { HiOutlineBookmark } from "react-icons/hi2";
import { AiOutlineClose } from "react-icons/ai";
import { BsFillHeartFill } from "react-icons/bs";
import { BiMessageSquareDots } from "react-icons/bi";
import { VscLink } from "react-icons/vsc";
import ChangePage from "../../ui/Pagination";
import { useState } from "react";
import { IconContext } from "react-icons";

function ThinkSection({ title, thinks = false }) {
  const [bookmark, setBookmark] = useState(false);
  return (
    <article>
      <h4 className="text-2xl text-white font-semibold mt-5 mb-6">{title}</h4>
      <Row
        className="gap-y-5  min-w-[352px] min-h-[280px]  overflow-hidden"
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
          <div className="gutter-row  hover:shadow-[0_10px_10px_rgba(22,_22,_24,_0.8)]">
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
                    className={`size-5  cursor-pointer `}
                  />
                </IconContext.Provider>
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
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center justify-center gap-x-[17px] group">
                <span>
                  <AiOutlineClose className="size-[22px] group-hover:opacity-70 hover:!opacity-100 hover:size-7 text-[#292D32] hover:text-black cursor-pointer" />
                </span>
                <span className="text-[17px] font-bold">32</span>
                <span>
                  <BsFillHeartFill className="size-[22px] group-hover:opacity-70 hover:!opacity-100 text-[#FF0000] hover:size-7 cursor-pointer" />
                </span>
              </div>
              <div className="flex items-center  gap-x-[25px]">
                <div className="flex items-center justify-center space-x-1 ">
                  <span>
                    <BiMessageSquareDots className="size-[22px] hover:text-black text-[#5E6268] cursor-pointer" />
                  </span>
                  <span className="text-[17px] hover:text-black font-bold text-[#5E6268]">
                    12
                  </span>
                </div>

                <span>
                  <VscLink className="size-[22px] text-[#5E6268] hover:text-black cursor-pointer" />
                </span>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {title === "Sizin üçün" ? (
        <div className="flex justify-end text-white mt-2 text-sm ">
          <button className="hover:bg-[#280069] rounded-[4px] py-2 px-4">
            Daha Çox
          </button>
        </div>
      ) : (
        <ChangePage />
      )}
    </article>
  );
}

export default ThinkSection;
