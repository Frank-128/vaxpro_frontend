"use client";
import { Option, Select } from "@material-tailwind/react";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function Reports() {
  const data = [
    {
      name: "Jan",
      uv: 400,
    },
    {
      name: "Feb",
      uv: 300,
    },
    {
      name: "Mar",
      uv: 200,
    },
    {
      name: "Apr",
      uv: 278,
    },
    {
      name: "May",
      uv: 189,
    },
    {
      name: "Jun",
      uv: 239,
    },
    {
      name: "July",
      uv: 349,
    },
    {
      name: "Aug",
      uv: 400,
    },
    {
      name: "Sept",
      uv: 300,
    },
    {
      name: "Oct",
      uv: 200,
    },
    {
      name: "Nov",
      uv: 278,
    },
    {
      name: "Dec",
      uv: 189,
    },
  ];
  return (
    <div className=" space-y-2 text-gray-700">
      <div className="flex divide-x  w-full h-[20rem]">
        <div className="basis-1/6 bg-gray-200">
          <p className="text-center">System users </p>
          <div className="flex p-2 gap-x-2">
            <Select
              label="user"
              containerProps={{ className: "min-w-[10rem]" }}
            >
              <Option>Ministry</Option>
              <Option>Regional</Option>
              <Option>District</Option>
              <Option>Health Worker</Option>
              <Option>Community Health Worker</Option>
            </Select>
            <Select
              label="region"
              containerProps={{ className: "min-w-[10rem]" }}
            >
              <Option>All</Option>
              <Option>Arusha</Option>
              <Option>Dar es salaam</Option>
              <Option>Mwanza</Option>
              <Option>Kagera</Option>
              <Option>Dodoma</Option>
            </Select>
          </div>
          <div className="flex p-2 gap-x-2">
            <Select
              label="filter by"
              containerProps={{ className: "min-w-[10rem]" }}
            >
              <Option>Date Added</Option>
              <Option>Name</Option>
              <Option>Location</Option>
            </Select>
            <Select
              label="Order by"
              containerProps={{ className: "min-w-[10rem]" }}
            >
              <Option>None</Option>
              <Option>Ascending</Option>
              <Option>Descending</Option>
            </Select>
          </div>
        </div>
        <div className="basis-5/6 bg-gray-100">
          <BarChart
            width={630}
            height={300}
            data={data}
            margin={{ top: 50, right: 30, left: 30, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickLine={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>

      <div className="flex divide-x  w-full h-[20rem]">
        <div className="basis-1/6 bg-gray-200">
          <p className="text-center">Registered Children</p>
          <div className="flex p-2 gap-x-2">
            <Select
              label="children"
              containerProps={{ className: "min-w-[10rem]" }}
            >
              <Option>Vaccinated</Option>
              <Option>Unvaccinated</Option>
            </Select>
            <Select
              label="region"
              containerProps={{ className: "min-w-[10rem]" }}
            >
              <Option>All</Option>
              <Option>Arusha</Option>
              <Option>Dar es salaam</Option>
              <Option>Mwanza</Option>
              <Option>Kagera</Option>
              <Option>Dodoma</Option>
            </Select>
          </div>
          <div className="flex p-2 gap-x-2">
            <Select
              label="filter by"
              containerProps={{ className: "min-w-[10rem]" }}
            >
              <Option>Date Added</Option>
              <Option>Name</Option>
              <Option>Location</Option>
            </Select>
            <Select 
              label="Order by"
              containerProps={{ className: "min-w-[10rem]" }}
            >
              <Option>None</Option>
              <Option>Ascending</Option>
              <Option>Descending</Option>
            </Select>
          </div>
        </div>
        <div className="basis-5/6 bg-gray-100">
          <BarChart
            width={630}
            height={300}
            data={data}
            margin={{ top: 50, right: 30, left: 30, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickLine={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}

export default Reports;
