import { FaArrowRightLong } from "react-icons/fa6";
import { MdShowChart } from "react-icons/md";

function StatisticsCard({ name, count }) {
  return (
    <div className="w-[350px] bg-white p-9 space-y-7 rounded-xl mx-5 mt-5 shadow-sm border-gray-100 border">
      <div className="flex justify-between">
        <span className="text-2xl font-[500]">{name}</span>
        <button className="text-indigo-500 flex space-x-2 items-center">
          <span>Bax</span> <FaArrowRightLong />
        </button>
      </div>
      <div className="flex justify-between">
        <span className="text-[44px] font-semibold">{count}</span>
        <span className=" flex space-x-2 items-center">
          <span className="bg-[#FFE4DE] p-2 rounded-lg">
            <MdShowChart className="text-[#FE562F]" />
          </span>
          <span>-3,2%</span>
        </span>
      </div>
    </div>
  );
}

export default StatisticsCard;
