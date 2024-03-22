import { changeTime } from "../../../utils/helpers";
import { Col, Row } from "antd";
function AllPostsPending() {
  return (
    <Row className="gap-y-5 mt-5 mx-10 min-w-[352px] min-h-[280px] bg-white overflow-hidden rounded-lg">
      <Col
        className="m-5 "
        xl={{
          span: 7,
        }}
        lg={{
          span: 12,
        }}
        md={{ span: 12 }}
        sm={{ span: 24 }}
        xs={{ span: 24 }}
      >
        <div className="gutter-row !min-h-[266px]">
          <div className="space-y-2 mb-2 ">
            <div className="flex items-center">
              <div className="flex space-x-1 items-center">
                <figure className="size-11 ">
                  {/* {thinks?.user?.image ? (
          <img
            className="img-cover rounded-full"
            src={`${thinks?.user?.image}`}
            alt="user"
          />
        ) : ( */}
                  <span className="size-full text-2xl bg-gray-300  rounded-full border text-indigo-500 flex items-center justify-center">
                    {/* {thinks?.user?.userName?.charAt(0).toLowerCase()} */} U
                  </span>
                  {/* )} */}
                </figure>
                <h6>
                  User
                  {/* {thinks?.user?.userName.split(" ")[0].toLowerCase()} */}
                </h6>
              </div>
            </div>

            <div className="text-xs border-b-[1px] dark:border-gray-500 pb-2 space-x-4 border-[#DBDBDB] flex items-center">
              <span className="hover:bg-indigo-500 hover:text-white text-[#808080] py-[2px] px-1 rounded-[4px]">
                Elm
                {/* {thinks.category.name.split(" ").slice(0, 3).join(" ")} */}
              </span>
              <span className="dotForTime">
                2 gun evvel
                {/* {changeTime(thinks.publishedAt)} */}
              </span>
            </div>
            <p className="text-base line-clamp-5 cursor-pointer">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
              eos eum saepe magni rerum officiis, quidem voluptates! Libero, nam
              aliquam?
              {/* {thinks.content} */}
            </p>
          </div>
          <div className="flex items-center justify-between mt-3">
            <button
              type="button"
              className=" text-base border border-primaryGray text-primaryGray py-[6px] px-8 rounded-xl"
            >
              Sil
            </button>
            <button className=" text-base bg-indigo-500 text-white py-[6px] px-4 rounded-xl font-sans">
              Qəbul et
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default AllPostsPending;
