import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import DropdownMenu from "../Dropdown";
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import { useCategories } from "../../../hooks/useCategories";
const AddModal = () => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState([]);
  const [category, checkboxStates, allCategories] = useCategories(
    false,
    "radio"
  );

  useEffect(() => {
    const updatedContent = checkboxStates.reduce((acc, state, i) => {
      if (state === true) {
        acc["category"] = allCategories[i];
      }
      return acc;
    }, {});

    setContent(updatedContent);
  }, [checkboxStates]);

  // for comments
  const handleFormSubmit = (data) => {
    const trimmedComment = data.content.trim();

    if (trimmedComment !== "" && content.category) {
      const updatedContent = { ...content, comment: trimmedComment };
      setContent(updatedContent);
      setOpen(false);
      console.log(updatedContent);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className=" bg-[#6366F1] text-white w-full whitespace-nowrap px-4 py-2 rounded-[12px]"
      >
        İdeyanı paylaş
      </button>

      <Modal
        title={
          <div className="flex items-center space-x-2 bg-[#999999]">
            <figure className="size-11 rounded-full shrink-0">
              <img
                className="img-cover"
                src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1427"
                alt=""
              />
            </figure>
            <span className="text-zinc-50">Samir N</span>
          </div>
        }
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={603}
        closable={true}
        className="bg-[#999999] rounded-md"
        style={{
          top: 50,
        }}
        footer={false}
        closeIcon={<IoMdClose className="text-zinc-50 text-2xl" />}
      >
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <DropdownMenu
            placement={"bottomLeft"}
            dropName={
              <button className="rounded md hover:text-white px-2 py-[5px] mb-2 bg-zinc-50 hover:bg-[#6366F1]">
                <span className="text-red-500 mr-1 font-bold">*</span>Kateqoriya
                seç
              </button>
            }
            dropDownItems={category}
            classes={
              "w-[314px] max-h-[365px] overflow-x-hidden mt-[105px] ml-9 "
            }
          />
          <span className="text-red-500 ml-2 font-bold">*</span>
          <textarea
            {...register("content", { required: true })}
            className="resize-none w-full text-[16px] outline-none p-2 rounded-md"
            rows={9}
            placeholder="maxLength is 500"
            maxLength={500}
          />
          {errors.content && !content.category && (
            <p className="text-red-500 font-[500] ">
              Zəhmət olmasa kategoriya seçimi edin və fikrinizi yazın
            </p>
          )}

          <button
            className="w-full mt-3 rounded-lg text-[16px] text-white hover:bg-[#F16367] px-6 py-[10px] bg-[#6366F1]"
            type="submit"
            key={"btn"}
          >
            Paylaş
          </button>
        </form>
      </Modal>
    </>
  );
};
export default AddModal;
