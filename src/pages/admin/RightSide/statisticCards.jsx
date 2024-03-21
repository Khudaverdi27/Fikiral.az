import { MdShowChart } from "react-icons/md";
import { Skeleton } from "antd";
function StatisticsCard({ name, count, loading }) {
  return (
    <div className="w-[330px]  bg-white p-9 space-y-7 rounded-xl mx-5 mt-5 shadow-sm border-gray-100 border">
      {loading ? (
        <Skeleton active />
      ) : (
        <>
          <span className="text-2xl font-[500]">{name}</span>
          <div className="flex justify-between">
            <span className="text-[44px] font-semibold">{count}</span>
            <span className=" flex space-x-2 items-center">
              <span className="bg-[#FFE4DE] p-2 rounded-lg">
                <MdShowChart className="text-[#FE562F]" />
              </span>
              <span>-3,2%</span>
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export default StatisticsCard;
