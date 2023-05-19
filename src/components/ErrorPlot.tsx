import { useBreakpointValue } from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface Props {
  errors: number[];
}

const ErrorPlot = ({ errors }: Props) => {
  const data = errors.map((error, index) => ({
    epoch: index,
    error,
  }));

  const chartWidth = useBreakpointValue({
    base: 300,
    sm: 400,
    md: 600,
    xl: 800,
  });

  return (
    <LineChart
      data={data}
      width={chartWidth}
      height={400}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="epoch" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="error"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
        strokeWidth={3}
      />
    </LineChart>
  );
};

export default ErrorPlot;
