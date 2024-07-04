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
      male: 400,
      female: 240,
      amt: 240,
    },
    {
      name: "OPV",
      male: 300,
      female: 139,
      amt: 221,
    },
    {
      name: "Pentavalent",
      male: 200,
      female: 580,
      amt: 220,
    },
    {
      name: "Rota",
      male: 270,
      female: 398,
      amt: 200,
    },
    {
      name: "MR",
      male: 189,
      female: 480,
      amt: 211,
    },
    {
      name: "BCG",
      male: 230,
      female: 380,
      amt: 250,
    },
    {
      name: "HPV",
      male: 0,
      female: 430,
      amt: 210,
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
