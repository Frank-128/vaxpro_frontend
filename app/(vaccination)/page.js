"use client";
import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import ChartGraph from "@/components/chart";
import globalUser from "@/store/user";
import {useEffect, useState} from "react";
import globalAllUsers from "@/store/all_users";
import axios from "../../axios";
import HealthWorker from "@/components/dashboards/HealthWorker";
import {Button} from "@material-tailwind/react";
import {FilterAltOutlined} from "@mui/icons-material";
import globalAddress from "@/store/address";
import globalVaccines from "@/store/vaccines";
import Filter from "@/components/filters/Filter";
import {useInitial} from "@/constants/functions";

function TeamCard({ name, title,bg, textColor, valueColor }) {
  return (
    <Card className={`rounded-lg ${bg} h-28}`} shadow={false}>
      <CardBody className=" w-full h-full flex flex-col items-start ">
        <Typography
          className={`w-full h-2/3 text-sm ${textColor} font-extrabold`}
        >
          {name}
        </Typography>
        <Typography
          className={` text-2xl w-full h-1/3 font-extrabold font-monte-1  ${valueColor}`}
        >
          {title}
        </Typography>
      </CardBody>
    </Card>
  );
}




export function Dashboard() {

  // const

  const children = globalAllUsers((state) => state.allChildren);
  const setAllChildren = globalAllUsers((state) => state.setAllChildren);
  const loggedInUser = globalUser((state) => state.loggedInUser);



  const members = [
    {
      name: "Vaccinated Children",
      title: children?.vaccinated_children,
      bg:"bg-[#f5edfc]/40",
      textColor:"text-[#9D86DE]",
      valueColor:"text-[#8d25df]"

    },
    {
      name: "Ongoing Vaccinations",
      title: children?.unvaccinated_children,
      bg:"bg-[#daebfe]/40",
      textColor:"text-[#0074fc]/60",
      valueColor:"text-[#0074fc]"

    },
    {
      name: "Registered Children",
      title: children?.registered_children,
      bg:"bg-[#fde28b]/20",
      textColor:"text-[#f28c07]/60",
      valueColor:"text-[#d07806]"


    },
    {
      name: "Success Rate",
      title: children?.success + "%",
      bg:"bg-[#c4c4c4]/70",
      textColor:"text-[#0c0c0c]/50",
      valueColor:"text-[#0c0c0c]"


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
    <section className="min-h-screen py-2 px-4">
      {loggedInUser && loggedInUser.role?.account_type !== "health_worker" ?
      <div className="container mx-auto">
        <Filter/>
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
      </div>:

      <HealthWorker/>
      }
    </section>
  );
}

export default Dashboard;


