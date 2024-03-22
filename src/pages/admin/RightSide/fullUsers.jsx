import { MdBlockFlipped } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";
import { Col, Row } from "antd";
import IsConfirmModal from "../../../components/ui/Modals/IsConfirmModal";
import moment from "moment";
import { useBlockUserById } from "../../../hooks/useFetch";
import { useEffect, useState } from "react";
import { LoadingSpin } from "../../../components/widget/Loading/ThinkSkeleton";
import { ToastContainer, toast } from "react-toastify";
function FullUsers({ allUsers, allUserLoading }) {
  const [blockedUser, blockedUserFetch] = useBlockUserById();
  const [blockedId, setBlockedId] = useState([]);

  const blockProfile = (userId) => {
    blockedUserFetch(userId);
    if (blockedId.includes(userId)) {
      setBlockedId(blockedId.filter((id) => id !== userId));
    } else {
      setBlockedId(() => [...blockedId, userId]);
    }
  };

  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);

  useEffect(() => {
    if (blockedUser.status === 200) {
      notifySuccess("Əməliyyat uğurludur!");
    } else if (blockedUser.status === 500) {
      notifyError("Bir şeylər tərs getdi, yenidən yoxlayın!");
    }
  }, [blockedUser]);
  return (
    <>
      {allUserLoading ? (
        <LoadingSpin />
      ) : (
        <section className="px-20 mt-10 ">
          <ToastContainer autoClose={2000} />
          <Row className="p-3">
            <Col className="text-[20px] font-[500]" span={5}>
              İstifadəçi adı
            </Col>
            <Col className="text-center text-[20px] font-[500]" span={5}>
              E-poçt
            </Col>
            <Col className="text-center text-[20px] font-[500]" span={5}>
              Qeydiyyat tarixi
            </Col>
            <Col className="text-center text-[20px] font-[500]" span={4}>
              Post sayı
            </Col>
            <Col className="text-end text-[20px] font-[500]" span={5}>
              Blok et
            </Col>
          </Row>
          <div className="h-screen overflow-auto">
            {allUsers.map((user) => (
              <Row
                key={user.id}
                className="mt-6 bg-white flex items-center rounded-md space-y-2 p-3 border border-gray-100"
              >
                <Col className="text-base " span={5}>
                  <span>{user.userName}</span>
                </Col>
                <Col className="text-center text-base " span={5}>
                  <span>{user.gmail}</span>
                </Col>
                <Col className="text-base text-center" span={5}>
                  <span>
                    {user.registeredAt ? (
                      <>
                        {moment(user.registeredAt, "DD.MM.YYYY").format(
                          "YYYY-MM-DD"
                        )}
                      </>
                    ) : (
                      "Tarix bilinmir"
                    )}
                  </span>
                </Col>
                <Col className="text-center text-base " span={4}>
                  <span>{user.postCount || 0}</span>
                </Col>
                {blockedId.includes(user.id) ? (
                  <Col className="flex justify-end " span={5}>
                    <CgUnblock
                      onClick={() => blockProfile(user.id)}
                      className="size-6 !text-green-500"
                    />
                  </Col>
                ) : (
                  <Col className="flex justify-end " span={5}>
                    <IsConfirmModal
                      title={"Bu istifadəçini bloklamaq istəyirsinizmi?"}
                      dangerBtn={<MdBlockFlipped className="size-5" />}
                      destroyProfile={() => blockProfile(user.id)}
                      destroyBtn={"Blokla"}
                    />
                  </Col>
                )}
              </Row>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default FullUsers;
