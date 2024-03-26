import { useClickAway, useMediaQuery } from "@uidotdev/usehooks";
import { Input, Spin } from "antd";
import { useState } from "react";
import { IoMdClose, IoMdSearch } from "react-icons/io";
import AddCommentModal from "../Modals/AddCommentModal";
import { useSearchActions } from "../../../context/FormSearchProvider";
import { useFetchCommentLists, usePostNotify } from "../../../hooks/useFetch";
import classNames from "classnames";
import { getStorage } from "../../../utils/helpers";

function FormSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const { onSearch, searchResponse, loadings, setOpenSrch, openSrch } =
    useSearchActions();
  const [postNotifyFetch] = usePostNotify();
  const [allComments, fetchComments, commentLoading] = useFetchCommentLists();
  const isMobile = useMediaQuery("only screen and (max-width : 480px)");
  const searchItems = showFull ? searchResponse : searchResponse.slice(0, 5);
  const token = getStorage("token");
  const ref = useClickAway(() => {
    setOpenSrch(false);
  });

  const showAllResults = () => {
    setShowFull(!showFull);
  };

  const openMessageModal = (data) => {
    setIsCommentOpen(true);
    setDataModal(data);
    fetchComments(data.id);
  };
  const toggleSearch = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  const inputClasses = classNames(
    "max-h-[37px]",
    "focus-within:shadow-none",
    "focus-within:border",
    "bg-[#E8E8E8]",
    "rounded-[6px]",
    "border-0",
    "outline-none",
    "transition-width",
    "duration-300",

    {
      "w-0": isMobile && !isOpen,
      "!w-[320px]": !isMobile && !isOpen,
      "w-[228px]": !isMobile || isOpen,
      "focus-within:border-white": isMobile && !isOpen,
      "bg-transparent": isMobile && !isOpen,
      "focus-within:border-[#e0e0e0]": !isMobile || isOpen,
      "hover:outline-[3px] hover:outline-[#E0E0E0]": isHovered,
    }
  );
  return (
    <>
      <div
        className={classNames("mx-6", {
          "left-[140px]": isOpen,
          "left-[50px]": isOpen && token.length > 0,
          "absolute -translate-x-3/4": isMobile,
          relative: !isMobile,
          "right-8": isMobile && !isOpen,
        })}
      >
        <Input
          onChange={(e) => onSearch(e)}
          className={inputClasses}
          size="large"
          placeholder="Axtar"
          prefix={
            <IoMdSearch
              onClick={toggleSearch}
              className={`size-6 cursor-pointer text-[#999999] inline`}
            />
          }
          suffix={loadings && <Spin />}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
        {openSrch && (
          <div
            ref={ref}
            className="w-[320px] border px-1 dark:bg-[#22303c]
          bg-white rounded-md mt-[2px] dark:border-gray-600 absolute text-black overflow-auto max-h-[387px]"
          >
            <div className="flex justify-between items-center py-5 px-1 font-[500] ">
              <span className="text-[15px] dark:text-white">
                {loadings ? "Axtarılır..." : "Axtarış"}
              </span>
              <button
                onClick={() => setOpenSrch(false)}
                className="cursor-pointer"
              >
                <IoMdClose className="size-6 dark:text-white" />
              </button>
            </div>

            {searchResponse.length > 0 &&
              searchItems.map((res) => (
                <div
                  key={res.id}
                  className="flex items-center cursor-pointer justify-between py-[10px] hover:border-black border-b "
                >
                  <button
                    onClick={() => openMessageModal(res)}
                    className="flex items-center"
                  >
                    <span>
                      <IoMdSearch className="size-6 text-[#999999]" />
                    </span>
                    <p className="text-sm text-left px-[14px] line-clamp-1 dark:text-white">
                      {res.content}
                    </p>
                  </button>

                  <div className="flex items-center space-x-2">
                    <figure className="size-9">
                      {res?.user?.image ? (
                        <img
                          className="img-cover rounded-full"
                          src={`${res?.user?.image}`}
                          alt="user"
                        />
                      ) : (
                        <span className="size-full text-2xl bg-gray-300  rounded-full border text-indigo-500 flex justify-center">
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
      {isCommentOpen && (
        <AddCommentModal
          isCommentOpen={isCommentOpen}
          setIsCommentOpen={setIsCommentOpen}
          modalData={dataModal}
          allComments={allComments}
          commentLoading={commentLoading}
          postNotifyFetch={postNotifyFetch}
        />
      )}
    </>
  );
}

export default FormSearch;
