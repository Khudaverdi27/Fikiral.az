import { useClickAway } from "@uidotdev/usehooks";
import { Input } from "antd";
import { useEffect, useState } from "react";
import { IoMdClose, IoMdSearch } from "react-icons/io";
import { getStorage } from "../../../utils/helpers";
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
  const token = getStorage("token");
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
    <form className="ml-12 mr-12 relative ">
      <Input
        onChange={(e) => onSearch(e)}
        className={`${
          token ? "w-[320px]" : "w-[420px]"
        }  max-h-[37px] bg-[#E0E0E0] rounded-[6px] border-0 outline-none 
        ${isHovered && "hover:outline-[3px] hover:outline-[#E0E0E0]"}`}
        size="large"
        placeholder="Axtar"
        prefix={
          <IoMdSearch className={`size-6 cursor-pointer text-[#999999] `} />
        }
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      {openSrch && (
        <div
          ref={ref}
          className={`${token} ? "w-[320px]" : "w-[420px]" bg-white rounded-md mt-[2px] px-5 absolute text-black overflow-auto max-h-[387px]`}
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
                className="flex items-center cursor-pointer justify-between py-[10px] hover:border-black border-b"
              >
                <div className="flex items-center ">
                  <span>
                    <IoMdSearch className="size-6 text-[#999999]" />
                  </span>
                  <p className="text-sm text-left px-[14px] line-clamp-1 ">
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
            ))) || (
            <span className="text-orange-500 text-sm">
              Axtardığınız məlumat tapılmadı...
            </span>
          )}
          {srch.length > 6 && (
            <div className="text-sm text-center p-3 text-primaryGray">
              <button>Bütün nəticələri gör</button>
            </div>
          )}
        </div>
      )}
    </form>
  );
}

export default FormSearch;
