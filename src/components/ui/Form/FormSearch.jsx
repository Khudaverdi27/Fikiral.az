import { Input } from "antd";
import { CiSearch } from "react-icons/ci";

function FormSearch() {
  return (
    <form>
      <Input
        className="w-[465px] rounded-[20px]  placeholder:text-[#959595] border-0"
        size="large"
        placeholder="Axtar"
        prefix={<CiSearch className="size-[24px] text-[#959595]" />}
      />
    </form>
  );
}

export default FormSearch;
