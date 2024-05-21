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
import { Fragment } from "react";

function TeamCard({ name, title }) {
  return (
    <Card className="rounded-lg bg-[#212B36]" shadow={false}>
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

const members = [
  {
    name: "Vaccinated Children",
    title: "102",
  },
  {
    name: "Unvaccinated Children",
    title: "298",
  },
  {
    name: "Registered Children",
    title: "289",
  },
  {
    name: "Success Rate",
    title: "12%",
  },
];

export function TeamSection12() {

  return (
    <section className="min-h-screen py-8 px-8 lg:py-12">      
      <div className="container mx-auto">
        
          <div className="mb-3 text-center ">
            <Typography
              variant="h1"
              color="blue-gray"
              className="my-2 !text-2xl lg:!text-4xl"
            >
              VaxPro
            </Typography>
          </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {members.map((props, key) => (
            <TeamCard key={key} {...props} />
          ))}
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

export default TeamSection12;
