import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { useSelector } from "react-redux";

const MetricsChart = ({ metricsSet }) => {
  const reduxData = useSelector((state) => state.global);
  // eslint-disable-next-line no-unused-vars
  const { isResponsive, themeColor } = reduxData;
  const data = {
    labels: metricsSet.labels,
    datasets: [
      // {
      //   label: "Landed",
      //   data: metricsSet.Landed,
      //   borderColor: "rgba(34, 197, 94, 1)",
      //   backgroundColor: "rgba(34, 197, 94, 1)",
      //   fill: false,
      // },
      {
        label: "Interactions",
        data: metricsSet.Interacted,
        borderColor: "rgba(249, 115, 22, 1)",
        backgroundColor: "rgba(249, 115, 22, 1)",
        fill: false,
      },
      {
        label: "Answers",
        data: metricsSet.Answers,
        borderColor: "rgba(129, 98, 255, 1)",
        backgroundColor: "rgba(129, 98, 255, 1)",
        fill: false,
      },
      {
        label: "Completed",
        data: metricsSet.Completed,
        borderColor: "rgba(1, 126, 250, 1)",
        backgroundColor: "rgba(1, 126, 250, 1)",
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
        max:
          Math.max(
            ...[
              metricsSet.Interacted,
              metricsSet.Answers,
              metricsSet.Completed,
            ].flat()
          ) + 2,
      },
    },
  };

  return (
    <div>
      <div className="mb-10 p-10 chart-card-header container-fluid row">
        <div className="chart-det-card col-lg-3 col-sm-6 col-6">
          <div className="text-16-500" style={{ color: "rgba(0,0,0,0.5)" }}>
            Landed
          </div>
          <h3
            className={`p-0 m-0 ${
              isResponsive ? "text-35-600" : "text-50-600"
            }`}
          >
            0
          </h3>
          <div style={{ color: "rgba(34, 197, 94, 1)", fontSize: "16px" }}>
            +0
          </div>
        </div>
        <div className="chart-det-card col-lg-3 col-sm-6 col-6">
          <div className="text-16-500" style={{ color: "rgba(0,0,0,0.5)" }}>
            Interactions
          </div>
          <h3
            className={`p-0 m-0 ${
              isResponsive ? "text-35-600" : "text-50-600"
            }`}
          >
            {(metricsSet?.Interacted || []).reduce(
              (acc, count) => (acc = acc + count),
              0
            )}
          </h3>
          <div style={{ color: "rgba(34, 197, 94, 1)", fontSize: "16px" }}>
            +0
          </div>
        </div>
        <div className="chart-det-card col-lg-3 col-sm-6 col-6">
          <div className="text-16-500" style={{ color: "rgba(0,0,0,0.5)" }}>
            Answers
          </div>
          <h3
            className={`p-0 m-0 ${
              isResponsive ? "text-35-600" : "text-50-600"
            }`}
          >
            {(metricsSet?.Answers || []).reduce(
              (acc, count) => (acc = acc + count),
              0
            )}
          </h3>
          <div style={{ color: "rgba(255, 56, 34, 1)", fontSize: "16px" }}>
            -20%
          </div>
        </div>
        <div className="chart-det-card col-lg-3 col-sm-6 col-6">
          <div className="text-16-500" style={{ color: "rgba(0,0,0,0.5)" }}>
            Completed
          </div>
          <h3
            className={`p-0 m-0 ${
              isResponsive ? "text-35-600" : "text-50-600"
            }`}
          >
            {(metricsSet?.Completed || []).reduce(
              (acc, count) => (acc = acc + count),
              0
            )}
          </h3>
          <div style={{ color: "rgba(34, 197, 94, 1)", fontSize: "16px" }}>
            +10s
          </div>
        </div>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default MetricsChart;

[
  [0, 2, 4, 1],
  [0, 1, 4, 5],
  [0, 1, 6, 0],
];
