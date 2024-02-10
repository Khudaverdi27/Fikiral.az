import { useState } from "react";
import { BsHeart } from "react-icons/bs";

function ThinkComments({ comment }) {
  const [like, setLike] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between ">
        <div className="flex space-x-2 items-center">
          <figure className="size-8">
            <img
              className="img-cover"
              src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1427"
              alt=""
            />
          </figure>
          <div className="mt-2">
            <div className="flex space-x-2">
              <h6 className="font-bold">Samir N.</h6>
              <p> {comment}</p>
            </div>
            <div className="text-[10px] text-primaryGray space-x-2">
              <span>2g</span>
              <span>1 bəyənmə</span>
              <button>Rəy bildir</button>
            </div>
          </div>
        </div>

        <button onClick={() => setLike(!like)}>
          <BsHeart
            className={` ${
              like ? "size-6 text-[#FF0000]" : "size-[22px] text-black"
            }    cursor-pointer hover:size-6 hover:text-[#FF0000]`}
          />
        </button>
      </div>
      <button className="commentLine">
        Rəylərə bax <span>(6)</span>
      </button>
    </div>
  );
}

export default ThinkComments;
