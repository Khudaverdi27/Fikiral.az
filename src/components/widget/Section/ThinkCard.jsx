import { HiOutlineBookmark } from "react-icons/hi2";
import { IconContext } from "react-icons";
import { useState } from "react";
import ThinkCardActions from "./ThinkCardActions";
import { HiDotsVertical } from "react-icons/hi";
function ThinkCard() {
  const [bookmark, setBookmark] = useState(false);

  return (
    <div className="gutter-row  hover:shadow-[0_10px_10px_rgba(22,_22,_24,_0.8)]">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex space-x-1 items-center">
            <figure className="size-11">
              <img
                className="img-cover"
                src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1427"
                alt=""
              />
            </figure>
            <h6>Samir N.</h6>
          </div>
          <div className="flex items-center">
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
            <HiDotsVertical className="ml-2 size-5 cursor-pointer " />
          </div>
        </div>

        <div className="text-xs border-b-[1px] pb-2 space-x-4 border-[#DBDBDB] flex items-center">
          <span className="hover:bg-[#6C58BB] hover:text-white text-[#808080] py-[2px] px-2 rounded-[4px] cursor-pointer">
            Lifestyle
          </span>
          <span className="text-[#808080] relative  before:content-[''] before:absolute before:left-[-15px] before:top-[7px] before:size-1 before:rounded-full before:bg-primaryGray">
            2 gün əvvəl
          </span>
        </div>
        <p className="font-Manrope text-sm ">
          Yaxın ərazidə siqaret çəkmək üçün rahat məkan ( mobil tətbiq)
        </p>
      </div>
      <ThinkCardActions disabled={true} />
    </div>
  );
}

export default ThinkCard;
