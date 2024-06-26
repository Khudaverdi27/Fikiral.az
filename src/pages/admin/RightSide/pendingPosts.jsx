import { useEffect, useState } from "react";
import {
  useAcceptAiPostById,
  useDeleteAiPostById,
  useDeleteThink,
  useFetchAcceptThink,
  usePostNotify,
} from "../../../hooks/useFetch";
import { changeTime, getStorage } from "../../../utils/helpers";
import { Col, Row } from "antd";
import { LoadingSpin } from "../../../components/widget/Loading/ThinkSkeleton";
import IsConfirmModal from "../../../components/ui/Modals/IsConfirmModal";
import botImg from "../../../assets/img/bot.jpg";
import { toast } from "react-toastify";
import _ from "lodash";
function AllPostsPending({ inAcceptedPosts, fetchInAccepted, loading }) {
  const [deletedRes, deleteFetch, deleteLoading] = useDeleteThink();
  const [deletedAiRes, deleteAiFetch, deleteAiLoading] = useDeleteAiPostById();
  const [acceptAiRes, acceptAiFetch, acceptAiLoading] = useAcceptAiPostById();
  const [res, acceptFetch, acceptLoading] = useFetchAcceptThink();
  const [acceptedId, setAcceptedId] = useState(false);
  const [postNotifyFetch] = usePostNotify();
  const loginId = getStorage("userId");
  const notifyError = (message) => toast.error(message);
  const notifySucces = (message) => toast.success(message);
  const destroyPost = (id) => {
    deleteFetch(id);
  };

  const destroyAiPost = (id) => {
    deleteAiFetch(id);
  };

  useEffect(() => {
    if (deletedAiRes.message) {
      notifySucces(deletedAiRes.message);
      setTimeout(() => {
        location.reload();
      }, 1500);
    } else if (deletedAiRes.status === 404) {
      notifyError("Bir şeylər tərs getdi, yenidən yoxlayın!");
    }
  }, [deletedAiRes]);

  const accetPost = (id, userId) => {
    if (userId) {
      acceptFetch(id);
      setAcceptedId(id);
      postNotifyFetch({
        postId: id,
        postOwnerId: userId,
        actionOwnerId: loginId,
        action: "accept",
      });
    }
  };

  const acceptAiPost = (id) => {
    acceptAiFetch(id, {
      isApproval: true,
    });
  };

  useEffect(() => {
    if (acceptAiRes.message) {
      notifySucces(acceptAiRes.message);
      setTimeout(() => {
        location.reload();
      }, 1500);
    } else if (acceptAiRes.status === 404) {
      notifyError("Bir şeylər tərs getdi, yenidən yoxlayın!");
    }
  }, [acceptAiRes]);

  useEffect(() => {
    if (deletedRes.status === 200 || res.status === 200) {
      fetchInAccepted();
    } else if (deletedRes.status === 500 || deletedRes.status === 500) {
      notifyError("Bir şeylər tərs getdi, yenidən yoxlayın!");
    }
  }, [deletedRes, res]);

  return (
    <Row className="gap-y-5 mt-5 mx-10 bg-white rounded-lg h-screen overflow-auto">
      {loading ? (
        <Col span={24}>
          <LoadingSpin />
        </Col>
      ) : (
        <>
          {_.map(inAcceptedPosts, (inAccepted) => (
            <Col
              key={inAccepted.id}
              className="m-4 min-w-[300px] max-h-[300px]"
              xl={{
                span: 6,
              }}
              lg={{
                span: 6,
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
                        {inAccepted?.user?.image ? (
                          <img
                            className="img-cover rounded-full"
                            src={`${inAccepted?.user?.image}`}
                            alt="user"
                          />
                        ) : (
                          <span className="size-full text-2xl bg-gray-300  rounded-full border text-indigo-500 flex items-center justify-center">
                            {inAccepted?.user?.userName
                              ?.charAt(0)
                              .toLowerCase() || (
                              <img
                                className="img-cover rounded-full"
                                src={botImg}
                                alt="user"
                              />
                            )}
                          </span>
                        )}
                      </figure>
                      <h6>
                        {_.split(
                          inAccepted?.user?.userName,
                          " ",
                          1
                        )[0].toLowerCase() || "Fikiral Bot"}
                      </h6>
                    </div>
                  </div>

                  <div className="text-xs border-b-[1px] dark:border-gray-500 pb-2 space-x-4 border-[#DBDBDB] flex items-center">
                    <span className="hover:bg-indigo-500 hover:text-white text-[#808080] py-[2px] px-1 rounded-[4px] line-clamp-1">
                      {inAccepted?.category?.name
                        ?.split(" ")
                        .slice(0, 3)
                        .join(" ")}
                    </span>
                    <span className="dotForTime whitespace-nowrap">
                      {changeTime(inAccepted?.publishedAt)}
                    </span>
                  </div>
                  <p className="text-base line-clamp-5 cursor-pointer">
                    {inAccepted?.content}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <IsConfirmModal
                    title={"Bu postu silmək istəyirsinizmi?"}
                    dangerBtn={
                      <span className=" text-base border border-primaryGray text-primaryGray py-[6px] px-8 rounded-xl">
                        {deleteLoading ? "Silinir..." : " Sil"}
                      </span>
                    }
                    destroyProfile={() =>
                      inAccepted?.user?.id
                        ? destroyPost(inAccepted.id)
                        : destroyAiPost(inAccepted.id)
                    }
                    destroyBtn={"Sil"}
                  />
                  <button
                    onClick={() => {
                      if (inAccepted.user && inAccepted.user.id) {
                        accetPost(inAccepted.id, inAccepted.user.id);
                      } else {
                        acceptAiPost(inAccepted.id);
                      }
                    }}
                    className="text-base bg-indigo-500 text-white py-[6px] px-4 rounded-xl font-sans"
                  >
                    {acceptLoading && acceptedId === inAccepted.id
                      ? "Qəbul edilir..."
                      : "Qəbul et"}
                  </button>
                </div>
              </div>
            </Col>
          ))}
        </>
      )}
    </Row>
  );
}

export default AllPostsPending;
