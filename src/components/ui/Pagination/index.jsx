import { Pagination } from "antd";

const itemRender = (_, type, originalElement) => {
  if (type === "prev" && _ > 0) {
    return (
      <button className="py-[6px] px-[10px] bg-[#AFAFAF] rounded-[4px] !text-white disabled:opacity-50 max-h-[30px] flex items-center justify-center hover:bg-[#6366F1]">
        Əvvəlki
      </button>
    );
  }
  if (type === "next") {
    return (
      <button className="py-[6px] px-[10px] bg-[#AFAFAF] rounded-[4px] !text-white disabled:opacity-50 max-h-[30px] flex items-center justify-center mr-0 hover:bg-[#6366F1]">
        Sonrakı
      </button>
    );
  }
  return originalElement;
};

function ChangePage() {
  return (
    <Pagination
      className="flex justify-center mt-5"
      defaultCurrent={1}
      total={30}
      itemRender={itemRender}
    />
  );
}

export default ChangePage;
