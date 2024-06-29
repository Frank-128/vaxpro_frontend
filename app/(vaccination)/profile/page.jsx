"use client";
import globalUser from "@/store/user";
import axios from "../../../axios";
import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Avatar,
  Spinner,
} from "@material-tailwind/react";

const Profile = () => {
  const loggedInUser = globalUser((state) => state.loggedInUser);
  console.log(loggedInUser);
  const [ward_name, setWardName] = useState();
  const [district_name, setDitrictName] = useState();
  const [region_name, setRegionName] = useState();

  console.log(loggedInUser);

  useEffect(() => {
    axios
      .get(`/ward/${loggedInUser?.facilities?.ward_id}`)
      .then((res) => {
        setWardName(res.data.ward_name);
        axios.get(`/district/${res.data.district_id}`).then((res) => {
          setDitrictName(res.data.district_name);
          axios.get(`/region/${res.data.region_id}`).then((res) => {
            setRegionName(res.data.region.region_name);
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedInUser?.facilities?.ward_id]);

  return (
    <main className="w-full items-center justify-center flex flex-col">
      {!loggedInUser ? (
        <Spinner className="mt-12" />
      ) : (
        <div className="w-full items-center  justify-center xs:w-3/4 lg:w-1/2 flex flex-col">
          <Avatar
            className="mb-4"
            src="https://www.freeiconspng.com/uploads/person-icon-8.png"
            alt="avatar"
            size={'lg'?'xxl':'xl'}
          />
          <span className="mb-4 font-bold">User ID: {loggedInUser?.uid}</span>
          <Card
            className="rounded-lg w-full shadow-lg bg-[#ffffff] xs:w-2/3   "
            shadow={true}
          >
            <CardBody className=" flex flex-col gap-3">
              {loggedInUser?.health_workers?.length > 0 &&
                loggedInUser?.health_workers.map((worker) => (
                  <div key={worker.staff_id}>
                    <div className="flex justify-between">
                      <Typography
                        color="blue-gray"
                        className="text-black font-bold text-xs lg:text-sm"
                      >
                        Name:
                      </Typography>
                      <Typography
                        color="blue-gray"
                        className="text-black text-xs lg:text-sm"
                      >
                        {worker.first_name} {worker.last_name}
                      </Typography>
                    </div>
                  </div>
                ))}

              {loggedInUser?.health_workers?.length > 0 &&
                loggedInUser?.health_workers.map((worker) => (
                  <div key={worker.staff_id}>
                    <div className="flex justify-between">
                      <Typography
                        color="blue-gray"
                        className="text-black font-bold text-xs lg:text-sm"
                      >
                        Staff ID:
                      </Typography>
                      <Typography
                        color="blue-gray"
                        className="text-black text-xs lg:text-sm"
                      >
                        {worker.staff_id}
                      </Typography>
                    </div>
                  </div>
                ))}

              {loggedInUser?.role?.role && (
                <div className="flex justify-between">
                  <Typography
                    color="blue-gray"
                    className="text-black font-bold text-xs lg:text-sm"
                  >
                    Role:
                  </Typography>
                  <Typography
                    color="blue-gray"
                    className="text-black text-xs lg:text-sm"
                  >
                    {loggedInUser?.role?.role}
                  </Typography>
                </div>
              )}

              {loggedInUser?.role?.account_type && (
                <div className="flex justify-between">
                  <Typography
                    color="blue-gray"
                    className="text-black font-bold text-xs lg:text-sm"
                  >
                    Account Type:
                  </Typography>
                  <Typography
                    color="blue-gray"
                    className="text-black text-xs lg:text-sm"
                  >
                    {loggedInUser?.role?.account_type}
                  </Typography>
                </div>
              )}

              {loggedInUser?.contacts && (
                <div className="flex justify-between">
                  <Typography
                    color="blue-gray"
                    className="text-black font-bold text-xs lg:text-sm"
                  >
                    Contacts:
                  </Typography>
                  <Typography
                    color="blue-gray"
                    className="text-black text-xs lg:text-sm"
                  >
                    {loggedInUser?.contacts}
                  </Typography>
                </div>
              )}

              {ward_name && district_name && region_name && (
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between ">
                    <Typography
                      color="blue-gray"
                      className="text-black font-bold text-xs md:text-md"
                    >
                      Ward:
                    </Typography>
                    <Typography
                      color="blue-gray"
                      className="text-black text-xs md:text-md"
                    >
                      {ward_name}
                    </Typography>
                  </div>
                  <div className="flex justify-between ">
                    <Typography
                      color="blue-gray"
                      className="text-black font-bold text-xs md:text-md"
                    >
                      District:
                    </Typography>
                    <Typography
                      color="blue-gray"
                      className="text-black text-xs md:text-md"
                    >
                      {district_name}
                    </Typography>
                  </div>
                  <div className="flex justify-between ">
                    <Typography
                      color="blue-gray"
                      className="text-black font-bold text-xs md:text-md"
                    >
                      Region:
                    </Typography>
                    <Typography
                      color="blue-gray"
                      className="text-black text-xs md:text-md"
                    >
                      {region_name}
                    </Typography>
                  </div>
                </div>
              )}

              {loggedInUser?.region?.region_name && (
                <div className="flex justify-between">
                  <Typography
                    color="blue-gray"
                    className="text-black font-bold text-xs lg:text-sm"
                  >
                    Region:
                  </Typography>
                  <Typography
                    color="blue-gray"
                    className="text-black text-xs lg:text-sm"
                  >
                    {loggedInUser?.region?.region_name}
                  </Typography>
                </div>
              )}

              {loggedInUser?.district?.district_name &&
                loggedInUser?.district?.region?.region_name && (
                  <div className="flex justify-between">
                    <Typography
                      color="blue-gray"
                      className="text-black font-bold text-xs lg:text-sm"
                    >
                      District:
                    </Typography>
                    <Typography
                      color="blue-gray"
                      className="text-black text-xs lg:text-sm"
                    >
                      {loggedInUser?.district?.district_name} -{" "}
                      {loggedInUser?.district?.region?.region_name}
                    </Typography>
                  </div>
                )}

              {loggedInUser?.facilities?.facility_reg_no && (
                <div className="flex justify-between">
                  <Typography
                    color="blue-gray"
                    className="text-black font-bold text-xs lg:text-sm"
                  >
                    Facility Registration No:
                  </Typography>
                  <Typography
                    color="blue-gray"
                    className="text-black text-xs lg:text-sm"
                  >
                    {loggedInUser?.facilities?.facility_reg_no}
                  </Typography>
                </div>
              )}

              {loggedInUser?.facilities?.facility_name && (
                <div className="flex justify-between">
                  <Typography
                    color="blue-gray"
                    className="text-black font-bold text-xs lg:text-sm"
                  >
                    Facility Name:
                  </Typography>
                  <Typography
                    color="blue-gray"
                    className="text-black text-xs lg:text-sm"
                  >
                    {loggedInUser?.facilities?.facility_name}
                  </Typography>
                </div>
              )}

              {loggedInUser?.facilities?.contacts && (
                <div className="flex justify-between">
                  <Typography
                    color="blue-gray"
                    className="text-black font-bold text-xs lg:text-sm"
                  >
                    Facility Contacts:
                  </Typography>
                  <Typography
                    color="blue-gray"
                    className="text-black text-xs lg:text-sm"
                  >
                    {loggedInUser?.facilities?.contacts}
                  </Typography>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      )}
    </main>
  );
};

export default Profile;
