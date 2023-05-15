import { useBreakpointValue } from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { ActivationFunctions } from "../services/perceptron";

interface Props {
  index: number;
}

const FunctionGraph = ({ index }: Props) => {
  const chartWidth = useBreakpointValue({
    base: 300,
    sm: 400,
    md: 600,
    xl: 800,
  });

  const data = Array.from({ length: 100 }, (_, i) => ({
    name: i - 50,
    value: ActivationFunctions[index as keyof typeof ActivationFunctions](
      i - 50
    ),
  }));

  return (
    <LineChart
      width={chartWidth}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="value"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
        strokeWidth={3}
      />
    </LineChart>
  );
};

export default FunctionGraph;
