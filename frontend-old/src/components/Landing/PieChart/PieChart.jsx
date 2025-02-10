import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import PropTypes from "prop-types";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = ({ data, options, width, height }) => {
  return (
    <div style={{ width: `${width}px`, height: `${height}px` }}>
      <Pie
        data={data}
        options={{ ...options, maintainAspectRatio: false }}
        width={width}
        height={height}
      />
    </div>
  );
};

PieChart.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
};

export default PieChart;
