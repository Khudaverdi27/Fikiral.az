import { Input } from "antd";
import { useState } from "react";
import { IoMdSearch } from "react-icons/io";

function FormSearch() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <form className="ml-20 mr-14 ">
      <Input
        className={`w-[465px] max-h-[37px] rounded-[6px] border-0 outline-none 
        ${isHovered ? "hover:outline-[3px] hover:outline-[#858585]" : ""}`}
        size="large"
        placeholder="Axtar"
        prefix={
          <IoMdSearch
            className={`size-[36px] cursor-pointer ${
              isHovered ? "text-black" : "text-[#858585]"
            }`}
          />
        }
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </form>
  );
}

export default FormSearch;
