import { Chart, CategoryScale } from "chart.js/auto";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { LoadingSpin } from "../../../components/widget/Loading/ThinkSkeleton";

function ChartGraphic({ chartLabels, byLoad }) {
  const [categoryNames, setCategoryNames] = useState([]);
  const [postByCategoryCount, setPostByCategoryCount] = useState([]);

  useEffect(() => {
    if (chartLabels) {
      const names = chartLabels.map((label) => label.name);
      const postCount = chartLabels.map((count) => count.postCount);
      setCategoryNames(names);
      setPostByCategoryCount(postCount);
    }
  }, [chartLabels]);

  const data = {
    labels: categoryNames,
    datasets: [
      {
        data: postByCategoryCount,
        backgroundColor: ["#6366F1"],
        borderColor: ["#6366F1"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        max: 50,
        min: 0,
        ticks: {
          maxRotation: 100,
          minRotation: 90,
          color: "#00000",
          font: { weight: "600" },
        },
        grid: {
          display: false,
        },
      },
      y: {
        max: 10,
        min: 0,
        border: {
          dash: [2, 4],
        },
        grid: {
          color: "grey",
        },
      },
    },
    barThickness: 15,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        font: { weight: "500", size: "28px" },
        padding: 20,
        display: true,
        color: "#00000",
        align: "start",
        position: "top",
        text: "Kateqoriya üzrə post sayı",
      },
    },
  };

  return (
    <div className="mt-10 w-11/12 px-24 bg-white mx-auto rounded-lg mb-4">
      {byLoad ? <LoadingSpin /> : <Bar data={data} options={options} />}
    </div>
  );
}

export default ChartGraphic;
