import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { formatDate } from "./formatters/dateTickFormatter";

interface Props {
  data?: any;
  xKey: string;
  yKey: string;
}

export const LineChartVis: React.FC<Props> = ({ data, xKey, yKey }) => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{ top: 20, right: 10, bottom: 40, left: -0 }}
      >
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis dataKey={xKey} tick={<CustomizedAxisTick />} />
        <YAxis
          domain={[
            (dataMin) => Math.round(dataMin * 0.6),
            (dataMax) => Math.round(dataMax * 1.1),
          ]}
        />
        <Tooltip />

        <Line type="linear" dataKey={yKey} stroke="#82ca9d" strokeWidth="3" />
      </LineChart>
    </ResponsiveContainer>
  );
};

class CustomizedAxisTick extends PureComponent {
  render() {
    const { x, y, stroke, payload } = this.props as any;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-20)"
        >
          {formatDate(payload.value)}
        </text>
      </g>
    );
  }
}