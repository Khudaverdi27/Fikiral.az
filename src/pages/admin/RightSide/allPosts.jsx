import { Col, Row } from "antd";
import IsConfirmModal from "../../../components/ui/Modals/IsConfirmModal";
import { useDeleteAiPostById, useDeleteThink } from "../../../hooks/useFetch";
import { useEffect } from "react";
import { LoadingSpin } from "../../../components/widget/Loading/ThinkSkeleton";
import { toast } from "react-toastify";
import { FaRegTrashAlt } from "react-icons/fa";
import _ from "lodash";

function AllPosts({ thinks, thinksLoading, getThinkFetch }) {
  const [deletedRes, deleteFetch] = useDeleteThink();
  const [deletedAiRes, deleteAiFetch] = useDeleteAiPostById();

  const destroyCategory = (id) => {
    deleteFetch(id);
  };

  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);

  useEffect(() => {
    if (deletedRes.status === 200) {
      notifySuccess("Əməliyyat uğurludur!");
      setTimeout(() => {
        getThinkFetch();
      }, 2000);
    } else if (deletedRes.status === 500) {
      notifyError("Bir şeylər tərs getdi, yenidən yoxlayın!");
    }
  }, [deletedRes]);
  return (
    <>
      {thinksLoading ? (
        <LoadingSpin />
      ) : (
        <section className="px-20 mt-10 ">
          <Row className="p-3 text-black">
            <Col className="text-[20px] font-[500]" span={4}>
              İstifadəçi adı
            </Col>
            <Col className="text-center text-[20px] font-[500]" span={5}>
              E-poçt
            </Col>
            <Col className="text-center text-[20px] font-[500]" span={13}>
              Postun Contenti
            </Col>
            <Col className="text-end text-[20px] font-[500]" span={2}>
              Postu sil
            </Col>
          </Row>
          <div className="h-screen overflow-auto">
            {thinks.map((think) => (
              <Row
                key={think.id}
                className="mt-6 bg-white flex items-center rounded-md space-y-2 p-3 border border-gray-100 text-black"
              >
                <Col className="text-base " span={4}>
                  <span>{think?.user?.userName || "Fikiral Bot"}</span>
                </Col>
                <Col className="text-center text-base " span={5}>
                  <span>{think?.user?.gmail || "info@fikiral.com"}</span>
                </Col>
                <Col className="text-base text-center" span={13}>
                  <p>
                    {think?.content?.split(" ").splice(0, 5).join(" ") + "..."}
                  </p>
                </Col>
                <Col className="text-end text-base " span={2}>
                  <IsConfirmModal
                    title={"Bu postu silmək istəyirsinizmi?"}
                    dangerBtn={<FaRegTrashAlt className="size-5" />}
                    destroyProfile={() =>
                      think?.user
                        ? destroyCategory(think.id)
                        : deleteAiFetch(think.id)
                    }
                    destroyBtn={"Sil"}
                  />
                </Col>
              </Row>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default AllPosts;
