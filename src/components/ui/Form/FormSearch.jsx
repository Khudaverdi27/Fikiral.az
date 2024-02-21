import { useClickAway } from "@uidotdev/usehooks";
import { Input, Spin } from "antd";
import { useEffect, useState } from "react";
import { IoMdClose, IoMdSearch } from "react-icons/io";
import AddCommentModal from "../Modals/AddCommentModal";
import { useFetchThinkBySearch } from "../../../hooks/useFetch";

function FormSearch() {
  const [isHovered, setIsHovered] = useState(false);
  const [text, setText] = useState("");
  const [showFull, setShowFull] = useState(false);
  const [openSrch, setOpenSrch] = useState(false);
  const [iscommentOpen, setIsCommentOpen] = useState(false);
  const [searchResponse, fetchSearchResponse, loadings] =
    useFetchThinkBySearch();
  const [dataModal, setDataModal] = useState({});

  const searchItems = showFull ? searchResponse : searchResponse.slice(0, 5);

  const ref = useClickAway(() => {
    setOpenSrch((searchResponse.length = []));
  });

  const onSearch = (e) => {
    setText(e.target.value);
  };
  useEffect(() => {
    if (text !== "") {
      fetchSearchResponse({ content: text.trim() });
    } else {
      setOpenSrch((searchResponse.length = []));
    }
  }, [text]);

  const showAllResults = () => {
    setShowFull(!showFull);
  };

  const openMessageModal = (data) => {
    setIsCommentOpen(true);
    setDataModal(data);
  };

  return (
    <>
      <div className="ml-12 mr-12 relative ">
        <Input
          onChange={(e) => onSearch(e)}
          className={`max-h-[37px] bg-[#E8E8E8] rounded-[6px] border-0 outline-none w-[320px]
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
        {searchResponse.length > 0 && (
          <div
            ref={ref}
            className="w-[320px] border px-1
          bg-white rounded-md mt-[2px] absolute text-black overflow-auto max-h-[387px]"
          >
            <div className="flex justify-between items-center py-5 px-1 font-[500]">
              <span className="text-[15px]">Axtarış</span>
              <button
                onClick={() => setOpenSrch((searchResponse.length = []))}
                className="cursor-pointer"
              >
                <IoMdClose className="size-6" />
              </button>
            </div>

            {searchResponse.length > 0 ? (
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
                      {res?.userResponse?.image ? (
                        <img
                          className="img-cover"
                          src={`${res?.res?.image}`}
                          alt="user"
                        />
                      ) : (
                        <span className="size-full text-2xl bg-gray-300 border-gray-500 rounded-full border text-indigo-500 flex justify-center">
                          {res?.userResponse?.userName?.charAt(0)}
                        </span>
                      )}
                    </figure>
                  </div>
                </div>
              ))
            ) : (
              <span className="text-orange-500 text-sm">
                Axtardığınız məlumat tapılmadı...
              </span>
            )}

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
