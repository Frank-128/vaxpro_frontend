"use client";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import axios from "../../../axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DateCalendarComp from "@/components/DateCalendar";
import { LongDialog } from "@/components/ScheduleUpdates";
import InfoUpdateModal from "@/components/InfoUpdateModal";

function ChildCard({ ward, date_of_birth, card_no }) {
  return (
    <Card className="rounded-lg shadow-lg bg-[#ffffff]" shadow={true}>
      <CardBody className="text-left flex flex-col gap-3">
        <div>
          <Typography
            color="blue-gray"
            className="text-black font-bold lg:text-xl"
          >
            Card Number:
          </Typography>
          <Typography color="blue-gray" className="text-black lg:text-xl">
            {card_no}
          </Typography>
        </div>
        <div>
          <Typography
            color="blue-gray"
            className="text-black font-bold lg:text-xl"
          >
            Date of Birth:
          </Typography>
          <Typography color="blue-gray" className="text-black lg:text-xl">
            {date_of_birth}
          </Typography>
        </div>

        {ward && (
          <div>
            <Typography
              color="blue-gray"
              className="text-black font-bold lg:text-xl"
            >
              Residence:
            </Typography>
            <Typography color="blue-gray" className="text-black lg:text-xl">
              {ward.ward_name} - {ward.district.district_name} -{" "}
              {ward.district.region.region_name}
            </Typography>
          </div>
        )}
      </CardBody>
    </Card>
  );
}

function ParentCard({ parents_guardians }) {
  return (
    <Card className="rounded-lg shadow-lg border-gray-200 bg-[#ffffff]" shadow={true}>
      <CardBody className="text-left flex flex-col gap-3">
        {parents_guardians &&
          parents_guardians.map((parent, index) => (
            <div key={index}>
              <Typography
                color="blue-gray"
                className="text-black lg:text-xl flex gap-3"
              >
                <div className="font-bold"> Parent Firstname:</div>{" "}
                {parent.firstname}
              </Typography>

              <Typography
                color="blue-gray"
                className="text-black lg:text-xl flex gap-3"
              >
                <div className="font-bold"> Parent Middlename:</div>{" "}
                {parent.middlename}
              </Typography>
              <Typography
                color="blue-gray"
                className="text-black lg:text-xl flex gap-3"
              >
                <div className="font-bold"> Parent Lastname:</div>{" "}
                {parent.lastname}
              </Typography>
              <Typography
                color="blue-gray"
                className="text-black lg:text-xl flex gap-3"
              >
                <div className="font-bold ">Relation with child:</div>{" "}
                {parent.pivot.relationship_with_child}
              </Typography>
              <Typography
                color="blue-gray"
                className="text-black lg:text-xl flex gap-3"
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
}) {
  return (
    <div className="flex flex-col gap-4">
      <ChildCard
        firstname={firstname}
        middlename={middlename}
        surname={surname}
        ward={ward}
        card_no={card_no}
        date_of_birth={date_of_birth}
      />
      <div className="!text-2xl font-bold lg:!text-2xl self-center flex mb-1 ml-6">
        Parent / Guardian Details:
      </div>
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
    setOpenUpdateInfo(true);
  };

  useEffect(() => {
    axios.get(`/getChildData/${card_no}`).then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        setChildData(res.data);
      }
    });

    axios.get(`/getVacSchedules/${card_no}`).then((res) => {
      if (res.data.status == 200) {
        console.log(res.data.vacScheds);
        setVacScheds(res.data.vacScheds);
      }
    });
  }, [card_no]);


  return (
    <section className="min-h-screen py-8 px-8 lg:py-12">
      <div className="container mx-auto">
        <div className="flex flex-col">
          <Link href={"/children"}></Link>
          <div className="mb-10 text-center ">
            <Typography
              variant="h1"
              color="blue-gray"
              className="my-2 float-start flex justify-between w-full !text-2xl lg:!text-4xl"
            >
              <div> VaxPro</div>
              <div className="flex gap-2">
                <LongDialog birthDate={birth_date} childId={card_no} setSavedScheds={setSavedScheds} savedScheds={savedScheds}  />

                <button
                  onClick={handleClickOpenUpdateInfo}
                  className="bg-[#212B36] text-white p-2 flex rounded-md uppercase  text-xs  float-end font-bold"
                >
                  <p className=" mt-1">Update info</p>
                </button>
              </div>
            </Typography>
          </div>
        </div>
        <div className="!text-2xl lg:!text-4xl self-center font-bold flex justify-center mb-6">
          {childData.map((child, index) => (
            <div key={index}>
              {child.firstname} {child.middlename} {child.surname}
            </div>
          ))}
        </div>

        <div className="grid w-full grid-cols-1 gap-1  mb-10">
          {childData.map((props, key) => (
            <TeamCard key={key} {...props} />
          ))}
        </div>

        <div className="!text-2xl font-bold mt-8 lg:!text-2xl self-center flex mb-1 ml-6">
          <div>Vaccination Schedules:</div>
        </div>
        <button
          onClick={handleClickOpenDateViewer}
          className="bg-[#212B36] text-white rounded-md p-2 ml-6"
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
      {childData.map((child, index) => (
        <div key={index}>
          <InfoUpdateModal
            childDetails={childData}
            cardNo={child.card_no}
            birthDate={child.date_of_birth}
            openUpdateInfo={openUpdateInfo}
            handleClickCloseUpdateInfo={handleClickCloseUpdateInfo}
            notifyAddVaccine={notifyAddVaccine}
          />
        </div>
      ))}
    </section>
  );
}
