import { FaRegTrashAlt } from "react-icons/fa";
import { Col, Row } from "antd";
import { LoadingSpin } from "../../../components/widget/Loading/ThinkSkeleton";
import {
  useFetchAddCategory,
  useFetchDeleteCategory,
} from "../../../hooks/useFetch";
import IsConfirmModal from "../../../components/ui/Modals/IsConfirmModal";
import { useEffect, useState } from "react";
import { Modal } from "antd";
import { MdClose } from "react-icons/md";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
function FullCategories({ categories, categoryLoad, getCategories }) {
  const [res, fetchDelete, loadingById] = useFetchDeleteCategory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addCategory, setAddCategory] = useState("");
  const [addRes, addCategoryFetch, loadingAdd] = useFetchAddCategory();
  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
  } = useForm();

  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);

  const destroyCategory = (id) => {
    fetchDelete(id);
  };

  useEffect(() => {
    if (res.status === 500) {
      notifyError("Bu kateqoriyada postlar olduğu üçün silmək mümükün deyil!");
    } else if (res.status === 200) {
      notifySuccess("Uğurla silindi!");
      getCategories();
    }
  }, [loadingById]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    if (addCategory.name) {
      setIsModalOpen(false);
      addCategoryFetch(addCategory);
    }
  };

  useEffect(() => {
    if (addRes.status === 500) {
      notifyError("Bir şeylər tərs getdi, yenidən yoxlayın!");
    } else if (addRes.status === 200) {
      notifySuccess("Uğurla əlavə olundu!");
      getCategories();
    }
  }, [loadingAdd]);

  const onSubmit = (data) =>
    setAddCategory({ name: data.name, slug: `category-${data.name}` });

  const handleCancel = () => {
    setIsModalOpen(false);
    clearErrors();
  };

  return (
    <>
      {categoryLoad ? (
        <LoadingSpin />
      ) : (
        <section className="px-20 mt-10">
          <ToastContainer autoClose={2000} />
          <Row className="p-3">
            <Col className="text-[20px] font-[500]" span={8}>
              Kateqoriya adı
            </Col>
            <Col className="text-center text-[20px] font-[500]" span={8}>
              Kateqoriya üzrə post sayı
            </Col>
            <Col className="text-end text-[20px] font-[500]" span={8}>
              Sil
            </Col>
          </Row>
          {categories.map((category) => (
            <Row
              key={category.id}
              className="mt-6 bg-white flex items-center rounded-md space-y-2 p-3 border border-gray-100"
            >
              <Col className="text-base " span={8}>
                <span> {category.name}</span>
              </Col>
              <Col className="text-center text-base " span={8}>
                <span>22</span>
              </Col>
              <Col className="flex justify-end " span={8}>
                <IsConfirmModal
                  title={"Bu kateqoriyanı silmək istəyirsinizmi?"}
                  dangerBtn={<FaRegTrashAlt className="size-5" />}
                  destroyProfile={() => destroyCategory(category.id)}
                  destroyBtn={"Sil"}
                />
              </Col>
            </Row>
          ))}
          <Row className="my-4">
            <Col className="flex justify-end" span={24}>
              <button
                onClick={showModal}
                className=" text-base  bg-indigo-500 text-white py-2 px-4 rounded-xl"
              >
                Kateqoriya əlavə et
              </button>
              <Modal
                closable={true}
                onCancel={() => setIsModalOpen(false)}
                footer={false}
                closeIcon={<MdClose />}
                className="bg-white rounded-lg"
                centered={true}
                title="Kateqoriya adını yazın"
                open={isModalOpen}
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                    placeholder="Kateqoriya adı"
                    className="loginInput mt-3"
                    type="text"
                    {...register("name", {
                      required: true,
                      required: "Bu xana boş buraxıla bilməz",
                    })}
                    aria-invalid={errors.name ? "true" : "false"}
                  />
                  {errors.name?.type === "required" && (
                    <p className="text-red-500" role="alert">
                      {errors.name.message}
                    </p>
                  )}

                  <button
                    onClick={handleOk}
                    className=" text-base mt-5 block w-full bg-indigo-500 text-white py-2 px-4 rounded-xl"
                  >
                    Tamamla
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className=" text-base block w-full border border-indigo-500 text-primaryGray py-2 px-4 rounded-xl mt-2"
                  >
                    Ləğv et
                  </button>
                </form>
              </Modal>
            </Col>
          </Row>
        </section>
      )}
    </>
  );
}

export default FullCategories;
