import { MdShowChart } from "react-icons/md";
import { Skeleton, Card } from "antd";
function StatisticsCard({ name, count, loading, increase }) {
  return (
    <div className="relative">
      {loading ? (
        <div className="w-[330px] mr-5">
          <Skeleton active />
        </div>
      ) : (
        <>
          <Card
            bordered={false}
            style={{
              width: 330,
              padding: 10,
            }}
          >
            <span className="text-2xl font-[500]">{name}</span>
            <div className="flex justify-between">
              <span className="text-[44px] font-semibold">{count}</span>
              <span className=" flex space-x-2 items-center">
                <span className="bg-[#FFE4DE] p-2 rounded-lg">
                  <MdShowChart className="text-[#FE562F]" />
                </span>
                <span>{increase + "%"}</span>
              </span>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}

export default StatisticsCard;
