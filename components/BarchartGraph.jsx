import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BarchartGraph = () => {
  const data = [
    {
      name: "PCV",
      male: 4000,
      female: 2400,
      amt: 2400,
    },
    {
      name: "OPV",
      male: 3000,
      female: 1398,
      amt: 2210,
    },
    {
      name: "Pentavalent",
      male: 2000,
      female: 5800,
      amt: 2290,
    },
    {
      name: "Rota",
      male: 2780,
      female: 3908,
      amt: 2000,
    },
    {
      name: "MR",
      male: 1890,
      female: 4800,
      amt: 2181,
    },
    {
      name: "BCG",
      male: 2390,
      female: 3800,
      amt: 2500,
    },
    {
      name: "HPV",
      male: 0,
      female: 4300,
      amt: 2100,
    },
  ];

  return (
    <main className="w-full h-96 mt-20">
      <span className="flex w-full text-xs lg:text-base mt-12 font-monte-1 underline items-center justify-center">A Graph Showing The Vaccination Trend for All Vaccines</span>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="female"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            dataKey="male"
            fill="#82ca9d"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </main>
  );
};

export default BarchartGraph;
