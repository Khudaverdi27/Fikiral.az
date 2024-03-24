import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import DropdownMenu from "../Dropdown";
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import { useCategories } from "../../../hooks/useCategories";
import { useModalActions } from "../../../context/LoginModalProvider";
import { usePostThink } from "../../../hooks/useFetch";
import { findFuckingWords } from "../../../utils/helpers";
import { LoadingSpin } from "../../widget/Loading/ThinkSkeleton";
import { toast } from "react-toastify";

const AddModal = () => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState({});
  const { category, checkboxStates, allCategories } = useCategories(
    false,
    "radio"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const [postedThink, fetchPost, loading] = usePostThink();
  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);

  const { userByIdData } = useModalActions();

  useEffect(() => {
    const updatedContent = checkboxStates.reduce((acc, state, i) => {
      if (state === true) {
        acc["category"] = allCategories[i];
      }
      return acc;
    }, {});

    setContent(updatedContent);
  }, [checkboxStates]);

  // for post
  const handleFormSubmit = (data) => {
    const trimmedComment = data.content.trim();

    if (trimmedComment !== "" && content.category) {
      const updatedContent = { ...content, comment: trimmedComment };

      const requestData = {
        content: updatedContent.comment,
        categoryId: updatedContent.category.id,
        userId: userByIdData.id,
      };

      fetchPost(requestData).then(() => {
        reset();
        setContent((content[category] = false));
        checkboxStates.fill(false);
      });
    }
  };
  const textArea = watch("content");
  const result = findFuckingWords(textArea);

  useEffect(() => {
    if (postedThink.status === 200) {
      notifySuccess("Postunuz təsdiq üçün göndərildi");
    } else if (postedThink.status === 500) {
      notifyError("Paylaşımınız uğursuz oldu");
    }
  }, [postedThink]);

  useEffect(() => {
    if (!loading) {
      setOpen(false);
    }
  }, [loading]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className=" bg-indigo-500 text-white w-full whitespace-nowrap px-4 py-2 rounded-[12px]"
      >
        İdeyanı paylaş
      </button>

      <Modal
        title={
          <div className="flex items-center space-x-2 bg-neutral-100 dark:bg-[#22303c]">
            <figure className="size-11 rounded-full shrink-0 ">
              {userByIdData?.image ? (
                <img
                  className="img-cover rounded-full"
                  src={`${userByIdData?.image}`}
                  alt="user"
                />
              ) : (
                <span className="size-full text-3xl bg-gray-300  rounded-full border text-indigo-500 flex justify-center ">
                  {userByIdData?.userName?.charAt(0).toLowerCase()}
                </span>
              )}
            </figure>
            <span className="text-black dark:text-white">
              {userByIdData?.userName?.split(" ")[0].toLowerCase()}
            </span>
          </div>
        }
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={603}
        closable={true}
        className="bg-neutral-100 rounded-md"
        style={{
          top: 50,
        }}
        footer={false}
        closeIcon={<IoMdClose className="text-black " />}
      >
        {loading ? (
          <LoadingSpin />
        ) : (
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <DropdownMenu
              placement={"bottomLeft"}
              dropName={
                <button
                  type="button"
                  className="rounded text-[#636363] md hover:text-white px-2 py-[5px] mb-2 bg-zinc-50 hover:bg-indigo-500"
                >
                  <span className="text-red-500 mr-1 font-bold">*</span>
                  Kateqoriya seç
                </button>
              }
              dropDownItems={category}
              classes={
                "w-[314px] max-h-[365px] overflow-x-hidden mt-[105px] ml-9 !top-[80px]"
              }
            />
            <span className="text-red-500 ml-2 font-bold block">*</span>
            <textarea
              {...register("content", { required: true })}
              className="resize-none w-full text-base outline-none p-2 rounded-md dark:bg-gray-300"
              rows={9}
              placeholder="Minimum 5 maximum 250 simvol"
              minLength={5}
              maxLength={250}
            />
            {errors.content && (
              <p className="text-red-500 font-[500] ">
                Zəhmət olmasa fikrinizi yazın
              </p>
            )}

            <button
              disabled={(!errors.content && !content.category) || result}
              className={`w-full mt-3 rounded-lg text-base  text-white  px-6 py-[10px] disabled:opacity-40 disabled:cursor-not-allowed ${
                result ? "bg-red-500 " : "bg-indigo-500"
              }`}
              type="submit"
              key={"btn"}
            >
              {result
                ? "Qadağan olunmuş sözlərdən istifadə etməyin !!!"
                : "Paylaş"}
            </button>
          </form>
        )}
      </Modal>
    </>
  );
};
export default AddModal;
