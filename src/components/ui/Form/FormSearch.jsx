import { useClickAway } from "@uidotdev/usehooks";
import { Input } from "antd";
import { useEffect, useState } from "react";
import { IoMdClose, IoMdSearch } from "react-icons/io";

function FormSearch() {
  const [isHovered, setIsHovered] = useState(false);
  const [text, setText] = useState("");
  const [searchRes, setSearch] = useState(text.trim());
  const [openSrch, setOpenSrch] = useState(false);

  const ref = useClickAway(() => {
    setOpenSrch(false);
  });
  const srch = [
    "Yaxın ərazidə siqaret çəkmək üçün rahat məkan ( mobil tətbiq)",
    "lorem lorem",
    "siqaret çəkmək üçün",
  ];
  const onSearch = (e) => {
    setText(e.target.value);
    if (openSrch === false) {
      setOpenSrch(true);
    }
  };

  useEffect(() => {
    const trimmed = text.trim() !== "";
    if (trimmed) {
      const res = srch.filter((item) =>
        item.toLowerCase().includes(text.toLowerCase())
      );
      setSearch(res);
    }
    setOpenSrch(trimmed);
  }, [text]);

  return (
    <form className="ml-20 mr-14 relative">
      <Input
        onChange={(e) => onSearch(e)}
        className={`w-[465px] max-h-[37px] rounded-[6px] border-0 outline-none 
        ${isHovered ? "hover:outline-[3px] hover:outline-[#858585]" : ""}`}
        size="large"
        placeholder="Axtar"
        prefix={
          <IoMdSearch
            className={`size-[36px] cursor-pointer ${
              isHovered ? "text-black" : "text-[#858585]"
            }`}
          />
        }
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      {openSrch && (
        <div
          ref={ref}
          className="w-[465px] bg-white rounded-md mt-[2px] px-5 absolute text-black overflow-auto max-h-[487px]"
        >
          <div className="flex justify-between items-center py-5 px-1 font-[500]">
            <span className="text-[15px]">Axtarış</span>
            <button
              onClick={() => setOpenSrch(false)}
              className="cursor-pointer"
            >
              <IoMdClose className="size-6" />
            </button>
          </div>

          {(searchRes.length > 0 &&
            searchRes.map((res, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-[10px] hover:border-black border-b"
              >
                <div className="flex items-center">
                  <span>
                    <IoMdSearch className="size-9" />
                  </span>
                  <p className="text-sm text-left px-[14px] line-clamp-1 cursor-pointer">
                    {res}
                  </p>
                </div>
                <figure className="size-9 rounded-full shrink-0">
                  <img
                    className="img-cover"
                    src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1427"
                    alt=""
                  />
                </figure>
              </div>
            ))) || <span>Axtardiginiz xeber tapilmadi</span>}
        </div>
      )}
    </form>
  );
}

export default FormSearch;
