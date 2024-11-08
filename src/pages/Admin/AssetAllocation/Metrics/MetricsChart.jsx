import { Line } from "react-chartjs-2";
import "chart.js/auto";

const MetricsChart = () => {
  const data = {
    labels: [
      "11 AM",
      "12 PM",
      "3 PM",
      "4 PM",
      "5 PM",
      "6 PM",
      "7 PM",
      "8 PM",
      "9 PM",
      "10 PM",
    ],
    datasets: [
      {
        label: "Landed",
        data: [40, 45, 50, 60, 65, 70, 80, 90, 100, 110],
        borderColor: "green",
        backgroundColor: "green",
        fill: false,
      },
      {
        label: "Interactions",
        data: [0, 90, 85, 80, 70, 100, 95, 90, 85, 80],
        borderColor: "orange",
        backgroundColor: "orange",
        fill: false,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: "orange",
      },
      {
        label: "Answers",
        data: [0, 0, 0, 50, 60, 75, 90, 80, 110],
        borderColor: "purple",
        backgroundColor: "purple",
        fill: false,
      },
      {
        label: "Completed",
        data: [10, 20, 30, 40, 50, 60],
        borderColor: "blue",
        backgroundColor: "blue",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          usePointStyle: true, // This will change the legend markers to circles
          pointStyle: "circle", // Ensure the point style is set to 'circle'
          padding: 20, // Add padding between legend labels
          boxWidth: 12, // Adjust the size of the legend marker boxes
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Value",
        },
        min: 0,
        max: 120,
      },
    },
  };

  return (
    <div>
      <div className="mb-10 p-10 chart-card-header">
        <div className="w-300">
          <div className="text-16-500" style={{ color: "rgba(0,0,0,0.5)" }}>
            Landed
          </div>
          <h3 className="p-0 m-0 text-50-600">1002</h3>
          <div style={{ color: "green", fontSize: "16px" }}>+400</div>
        </div>
        <div className="w-300">
          <div className="text-16-500" style={{ color: "rgba(0,0,0,0.5)" }}>
            Interactions
          </div>
          <h3 className="p-0 m-0 text-50-600">40</h3>
          <div style={{ color: "green", fontSize: "16px" }}>+400</div>
        </div>
        <div className="w-300">
          <div className="text-16-500" style={{ color: "rgba(0,0,0,0.5)" }}>
            Answers
          </div>
          <h3 className="p-0 m-0 text-50-600">1002</h3>
          <div style={{ color: "red", fontSize: "16px" }}>-20%</div>
        </div>
        <div className="w-300">
          <div className="text-16-500" style={{ color: "rgba(0,0,0,0.5)" }}>
            Completed
          </div>
          <h3 className="p-0 m-0 text-50-600">1002</h3>
          <div style={{ color: "green", fontSize: "16px" }}>+10s</div>
        </div>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default MetricsChart;
