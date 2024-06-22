"use client";

import { Button, Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";

import axios from "../../../axios";
import Link from "next/link";
import {useRouter, useSearchParams} from "next/navigation";
import { useEffect, useState } from "react";
import DateCalendarComp from "@/components/DateCalendar";
import { LongDialog } from "@/components/ScheduleUpdates";
import Certificates from "@/components/certificates/Certificate";
import {CertificateGenerator} from "@/constants/certificate_generator";



function ChildCard({ ward, date_of_birth, card_no, house_no,certificate_status,handleGenerate }) {
  return (
    <Card className="rounded-lg shadow-lg bg-[#dce1e2] lg:w-1/2 4xs:w-full " shadow={true}>
      <CardBody className="text-left flex flex-col gap-3">
        <div>
          <Typography
            color="blue-gray"
            className="text-black font-bold lg:text-md"
          >
            Card Number:
          </Typography>
          <Typography color="blue-gray" className="text-black lg:text-md">
            {card_no}
          </Typography>
        </div>
        <div>
          <Typography
            color="blue-gray"
            className="text-black font-bold lg:text-md"
          >
            Date of Birth:
          </Typography>
          <Typography color="blue-gray" className="text-black lg:text-md">
            {date_of_birth}
          </Typography>
        </div>
        <div>
          <Typography
            color="blue-gray"
            className="text-black font-bold lg:text-md"
          >
            Gender:
          </Typography>
          <Typography color="blue-gray" className="text-black lg:text-md">
            Gender here
          </Typography>
        </div>
        <div>
          <Typography
            color="blue-gray"
            className="text-black font-bold lg:text-md"
          >
            House Number:
          </Typography>
          <Typography color="blue-gray" className="text-black lg:text-md">
            {house_no}
          </Typography>
        </div>

        {ward && (
          <div>
            <Typography
              color="blue-gray"
              className="text-black font-bold lg:text-md"
            >
              Residence:
            </Typography>
            <Typography color="blue-gray" className="text-black lg:text-md">
              {ward.ward_name} - {ward.district.district_name} -{" "}
              {ward.district.region.region_name}
            </Typography>
          </div>
        )}
      </CardBody>
      <CardFooter className="flex justify-end">
        <Certificates card_no={card_no} certificate_status={certificate_status} handleGenerate={handleGenerate} />
      </CardFooter>
    </Card>
  );
}

function ParentCard({ parents_guardians }) {
  return (
    <Card
      className="rounded-lg shadow-lg border-gray-200 bg-[#dce1e2] lg:w-1/2 4xs:w-full"
      shadow={true}
    >
      <CardBody className="text-left flex flex-col gap-3">
        {parents_guardians &&
          parents_guardians.map((parent, index) => (
            <div key={index} className="gap-3 flex flex-col">
              <Typography
                color="blue-gray"
                className="text-black lg:text-md flex flex-col"
              >
                <div className="font-bold"> Parent Firstname:</div>{" "}
                {parent.firstname}
              </Typography>

              <Typography
                color="blue-gray"
                className="text-black lg:text-md flex flex-col"
              >
                <div className="font-bold"> Parent Middlename:</div>{" "}
                {parent.middlename}
              </Typography>
              <Typography
                color="blue-gray"
                className="text-black lg:text-md flex flex-col"
              >
                <div className="font-bold"> Parent Lastname:</div>{" "}
                {parent.lastname}
              </Typography>
              <Typography
                color="blue-gray"
                className="text-black lg:text-md flex flex-col"
              >
                <div className="font-bold ">Relation with child:</div>{" "}
                {parent.pivot.relationship_with_child}
              </Typography>
              <Typography
                color="blue-gray"
                className="text-black lg:text-md flex flex-col"
              >
                <div className="font-bold">Contacts:</div>{" "}
                {parent.user.contacts}
              </Typography>
            </div>
          ))}
      </CardBody>
    </Card>
  );
}

function TeamCard({
  firstname,
  middlename,
  surname,
  card_no,
  date_of_birth,
  parents_guardians,
  ward,

  house_no,

  certificates,
  handleGenerate,

}) {
  return (
    <div className="flex gap-4 lg:flex-row  flex-col">
      <ChildCard
        firstname={firstname}
        middlename={middlename}
        surname={surname}
        ward={ward}
        house_no={house_no}
        card_no={card_no}
        date_of_birth={date_of_birth}
        certificate_status={certificates != null}
        handleGenerate={handleGenerate}
      />
      {/* <div className="!text-2xl font-bold lg:!text-2xl self-center flex mb-1 ml-6">
        Parent / Guardian Details:
      </div> */}
      <ParentCard parents_guardians={parents_guardians} />
    </div>
  );
}

export default function TeamSection12() {
  const [childData, setChildData] = useState([]);
  const searchParams = useSearchParams();
  const card_no = searchParams.get("cardNo");
  const [openUpdateInfo, setOpenUpdateInfo] = useState(false);
  const [open_date_viewer, setOpenDateViewer] = useState(false);
  const [vacShdls, setVacScheds] = useState([]);
  const [scheds, setScheds] = useState();
  const [allVaccines, setAllVaccines] = useState([]);
  const [savedScheds, setSavedScheds] = useState([]);
  const [birth_date, setBirthDate] = useState();
  const {loading} = CertificateGenerator();

  const router = useRouter();

  useEffect(() => {

    axios
      .get(`/fetchVaccineIds`, { params: { child_id: card_no } })
      .then((res) => {
        setAllVaccines(res.data.vaccineIds);
        console.log(res.data.vaccineIds);
      });

    axios.get(`/getSavedSchedules/${card_no}`).then((res) => {
      console.log(res.data.child_schedules);
      setSavedScheds(res.data.child_schedules);

      setBirthDate(res.data.birth_date);

    });

  }, [card_no]);

  const handleClickCloseUpdateInfo = () => {
    setOpenUpdateInfo(false);
  };

  const handleClickCloseDateViewer = () => {
    setOpenDateViewer(false);
  };

  const handleClickOpenDateViewer = () => {
    {
      axios
        .post(`/getAllChildSchedules`, {
          vaccines: allVaccines,
          date: birth_date,
        })
        .then((res) => {
          if (res.data) {
            setScheds(res.data.vaccineSchedule);
            console.log(res.data.vaccineSchedule);
          }
        });
    }

    setOpenDateViewer(true);
  };

  const notifyAddVaccine = (newVaccine) => {
    setVaccineFetch([...childVaccines, newVaccine]);
  };

  const handleClickOpenUpdateInfo = () => {
    router.push(`/info_update?cardNo=${card_no}`);
  };

  useEffect(() => {

    axios.get(`/getChildData/${card_no}`).then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        setChildData(res.data);
      }
    });

    axios.get(`/getVacSchedules/${card_no}`).then((res) => {
      if (res.data.status === 200) {
        console.log(res.data.vacScheds);
        setVacScheds(res.data.vacScheds);
      }
    });
  }, [card_no,]);

  const handleGenerate = () => {
    axios.get(`/getChildData/${card_no}`).then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        setChildData(res.data);
      }
    }).finally(() => {
          // window.location.reload()
        }
    );
  }




  return (
    <section className="min-h-screen py-8 px-8 lg:py-2">
      <div className="container mx-auto">
        <div className="flex flex-col">
          <Link href={"/children"}></Link>
          <div className="mb-10 text-center ">
            <Typography
              variant="h1"
              color="blue-gray"
              className="my-2 float-start flex justify-between w-full !text-2xl lg:!text-4xl"
            >
              {/* <div> VaxPro</div> */}
              <div className="flex justify-end w-full gap-2">
                <LongDialog
                  birthDate={birth_date}
                  childId={card_no}
                  setSavedScheds={setSavedScheds}
                  savedScheds={savedScheds}
                />

                <Button
                  onClick={handleClickOpenUpdateInfo}
                  className=" text-white p-2 flex w-44 rounded-md uppercase items-center justify-center text-xs  float-end font-bold"
                >
                  <p className=" mt-1">Update info</p>
                </Button>
              </div>
            </Typography>
          </div>
        </div>
        <div className="!text-2xl lg:!text-3xl shadow-lg text-black bg-[#e8dcc5] p-6 self-left font-bold flex rounded-r-full mb-6">
          {childData.map((child, index) => (
            <div key={index}>
              {child.firstname} {child.middlename} {child.surname}
            </div>
          ))}
        </div>

        <div className="grid w-full grid-cols-1 gap-1  mb-10">
          {childData.map((props, key) => (
            <TeamCard key={key} {...props} handleGenerate={handleGenerate} />
          ))}
        </div>

       
        <button
          onClick={handleClickOpenDateViewer}
          className="bg-[#212B36] text-white rounded-md p-2"
        >
          Click to View Schedule
        </button>
        <div>
          <DateCalendarComp
            handleClickCloseDateViewer={handleClickCloseDateViewer}
            openDateViewer={open_date_viewer}
            scheduleData={scheds}
          />
        </div>
      </div>
    </section>
  );
}
