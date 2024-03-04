import { BsHeart } from "react-icons/bs";

function ThinkReplyComment() {
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex-1 pl-10 ">
          <div>
            <div>
              <div className="flex justify-between ">
                <div className="flex items-center space-x-2 ">
                  <figure className="size-11 ">
                    {/* {comment?.user?.image ? (
                      <img
                        className="img-cover"
                        src={`${comment?.user?.image}`}
                        alt="user"
                      />
                    ) : ( */}
                    <span className="size-full text-2xl bg-gray-300 border-gray-500 rounded-full border text-indigo-500 flex  justify-center">
                      J
                    </span>
                    {/* )} */}
                  </figure>
                  <div className="mb-[-5px]">
                    <h6 className="font-bold">user</h6>
                    <span className="text-xs text-[#999999]">2g</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-1 pl-[50px] pr-10">
              <p className="text-wrap">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Voluptatum, fugiat!
              </p>
              <button className="text-sm text-[#999999]">Cavabla</button>
            </div>
          </div>
        </div>
        <div>
          <button className="mb-[-5px] disabled:opacity-40 disabled:cursor-not-allowed">
            <BsHeart className="size-6 " />

            <span>0</span>
          </button>
        </div>
      </div>

      <button className="commentLineReply ">
        Rəylərə bax<span className="ml-1">(0)</span>
      </button>
    </div>
  );
}

export default ThinkReplyComment;
