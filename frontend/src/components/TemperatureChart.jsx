import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const TemperatureChart = ({ data }) => {
  return (
    <div className="mt-10 bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-center">
        Grafik Suhu Per Jam
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
          <XAxis dataKey="time" stroke="#fff" />
          <YAxis stroke="#fff" domain={["auto", "auto"]} />
          <Tooltip
            contentStyle={{ backgroundColor: "#333", border: "none" }}
            labelStyle={{ color: "#fff" }}
            itemStyle={{ color: "#fff" }}
          />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#facc15"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureChart;
