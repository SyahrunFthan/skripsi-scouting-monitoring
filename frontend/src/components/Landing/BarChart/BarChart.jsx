import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import PropTypes from "prop-types";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController
);

const BarChart = ({ data, options, width, height }) => {
  return (
    <div style={{ width: `${width}px`, height: `${height}px` }}>
      {/* Pastikan meneruskan width dan height ke Bar */}
      <Bar
        data={data}
        options={{ ...options, maintainAspectRatio: false }}
        width={width}
        height={height}
      />
    </div>
  );
};

BarChart.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
};

export default BarChart;
