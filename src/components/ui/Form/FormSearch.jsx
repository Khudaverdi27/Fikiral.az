import { useClickAway } from "@uidotdev/usehooks";
import { Input, Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import { IoMdClose, IoMdSearch } from "react-icons/io";
import AddCommentModal from "../Modals/AddCommentModal";
import { useSearchActions } from "../../../context/FormSearchProvider";

function FormSearch() {
  const [isHovered, setIsHovered] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const [iscommentOpen, setIsCommentOpen] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const { onSearch, searchResponse, loadings, setOpenSrch, openSrch } =
    useSearchActions();

  const searchItems = showFull ? searchResponse : searchResponse.slice(0, 5);

  const ref = useClickAway(() => {
    setOpenSrch(setOpenSrch(false));
  });

  const showAllResults = () => {
    setShowFull(!showFull);
  };

  const openMessageModal = (data) => {
    setIsCommentOpen(true);
    setDataModal(data);
  };

  // for clearing input fields
  const inputRef = useRef(null);
  let timeoutId = null;

  const handleKeyDown = (e) => {
    if (e.key === "Backspace") {
      timeoutId = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.select();
        }
      }, 1000);
    }
  };

  const handleKeyUp = () => {
    clearTimeout(timeoutId);
  };

  return (
    <>
      <div className="ml-8 mr-10 relative ">
        <Input
          ref={inputRef}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onChange={(e) => onSearch(e)}
          className={`max-h-[37px] focus-within:shadow-none focus-within:border focus-within:border-[#e0e0e0] bg-[#E8E8E8] rounded-[6px] border-0 outline-none w-[320px]
        ${isHovered && "hover:outline-[3px] hover:outline-[#E0E0E0]"}`}
          size="large"
          placeholder="Axtar"
          prefix={
            <IoMdSearch className={`size-6 cursor-pointer text-[#999999] `} />
          }
          suffix={loadings && <Spin />}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
        {openSrch && (
          <div
            ref={ref}
            className="w-[320px] border px-1
          bg-white rounded-md mt-[2px] absolute text-black overflow-auto max-h-[387px]"
          >
            <div className="flex justify-between items-center py-5 px-1 font-[500]">
              <span className="text-[15px]">
                {loadings ? "Axtarılır..." : "Axtarış"}
              </span>
              <button
                onClick={() => setOpenSrch(false)}
                className="cursor-pointer"
              >
                <IoMdClose className="size-6" />
              </button>
            </div>

            {searchResponse.length > 0 &&
              searchItems.map((res) => (
                <div
                  key={res.id}
                  className="flex items-center cursor-pointer justify-between py-[10px] hover:border-black border-b"
                >
                  <button
                    onClick={() => openMessageModal(res)}
                    className="flex items-center"
                  >
                    <span>
                      <IoMdSearch className="size-6 text-[#999999]" />
                    </span>
                    <p className="text-sm text-left px-[14px] line-clamp-1">
                      {res.content}
                    </p>
                  </button>

                  <div className="flex items-center space-x-2">
                    <figure className="size-9">
                      {res?.user?.image ? (
                        <img
                          className="img-cover"
                          src={`${res?.res?.image}`}
                          alt="user"
                        />
                      ) : (
                        <span className="size-full text-2xl bg-gray-300 border-gray-500 rounded-full border text-indigo-500 flex justify-center">
                          {res?.user?.userName?.charAt(0).toLowerCase()}
                        </span>
                      )}
                    </figure>
                  </div>
                </div>
              ))}

            {searchResponse.length > 4 && (
              <div className="text-sm text-center p-3 text-primaryGray">
                <button onClick={showAllResults}>
                  {showFull ? "Daha az" : "Bütün nəticələri gör"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {iscommentOpen && (
        <AddCommentModal
          iscommentOpen={iscommentOpen}
          setIsCommentOpen={setIsCommentOpen}
          modalData={dataModal}
        />
      )}
    </>
  );
}

export default FormSearch;
