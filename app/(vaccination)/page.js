"use client";
import {
  Card,
  CardBody,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import ChartGraph from "@/components/chart";
import Link from "next/link";
import globalUser from "@/store/user";
import { Fragment, useEffect } from "react";
import globalAllUsers from "@/store/all_users";
import axios from "../../axios";

function TeamCard({ name, title,bg }) {
  return (
    <Card className={`rounded-lg ${bg}  h-28}`} shadow={false}>
      <CardBody className="text-center">
        <Typography
          variant="h5"
          color="blue-gray"
          className="!font-medium text-lg text-white"
        >
          {name}
        </Typography>
        <Typography
          color="blue-gray"
          className="mb-2 !text-base !font-semibold text-white"
        >
          {title}
        </Typography>
      </CardBody>
    </Card>
  );
}

export function Dashboard() {
  const children = globalAllUsers((state) => state.allChildren);
  const setAllChildren = globalAllUsers((state) => state.setAllChildren);

  const members = [
    {
      name: "Vaccinated Children",
      title: children?.vaccinated_children,
      bg:"bg-[#abc321]"
    },
    {
      name: "Ongoing Vaccinations",
      title: children?.unvaccinated_children,
      bg:"bg-[#acb987]"
    },
    {
      name: "Registered Children",
      title: children?.registered_children,
      bg:"bg-[#bbcd7e]"
    },
    {
      name: "Success Rate",
      title: children?.success + "%",
      bg:"bg-[#ee4caf]"
    },
  ];

  useEffect(() => {
    const fetchChildren = () => {
      axios.get("all_children").then((res) => {
        setAllChildren(res.data);
      });
    };
    fetchChildren();
  }, [setAllChildren]);

  return (
    <section className="min-h-screen py-8 px-8 lg:py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {members.map((props, key) =>
            children == null ? (
              <Card
                key={key}
                className={`rounded-lg bg-green-200  h-28 animate-pulse`}
                shadow={false}
              >
                <CardBody className="text-center">
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="!font-medium  bg-slate-800 rounded  text-lg text-white"
                  ></Typography>
                  <Typography
                    color="blue-gray"
                    className="mb-2 !text-base bg-slate-300 rounded !font-semibold text-white"
                  ></Typography>
                </CardBody>
              </Card>
            ) : (
              <TeamCard key={key} {...props} />
            )
          )}
        </div>
        <div className="grid grid-cols-1 mt-20 gap-6 md:grid-cols-2 lg:grid-cols-2">
          <ChartGraph vaccineName="Vaccine: Polio" />
          <ChartGraph vaccineName="Vaccine: BCG" />
          <ChartGraph vaccineName="Vaccine: MR" />
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
