"use client";
import React, { useEffect, useState } from "react";
import axios from "../../../../axios";
import Vaccinaions from "../../vaccination/page";
import { Button, Checkbox } from "@material-tailwind/react";
import { LongDialog } from "@/components/ScheduleUpdates";
import NewChildUpdates from "@/components/NewChildUpdates";
import { useRouter } from "next/navigation";

function NewChild({ params }) {
  const [vaccinations, setVaccinations] = useState([]);
  const [childData, setChildData] = useState(null);
  const today = new Date().toISOString().split("T")[0];
  const [selectedVaccines, setSelectedVaccines] = useState([]);
  const [vaccines, setVaccines] = useState([]);
  const [openVacUpdate, setOpenVacUpdate] = useState(false);

  const router = useRouter();

  function getDaysDifference(startDate, endDate) {
    const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in one day
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffDays = Math.round((end - start) / oneDay);
    return diffDays;
  }

  const handleCloseVaccUpdate = () => {
    setOpenVacUpdate(false);
  };

  const daysDifference = getDaysDifference(childData?.date_of_birth, today);

  useEffect(() => {
    axios
      .get(`getChildVaccines/${params.new_child}`)
      .then((res) => {
        setVaccinations(res.data.vaccines);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("getChildData/" + params.new_child)
      .then((res) => {
        setChildData(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const goToDashboard = () =>{
    router.push(`/children/childdetails/${params.new_child}`);
  }


  const handleCheckboxChange = (event) => {
    if (event.target.checked) {
      setSelectedVaccines([...selectedVaccines, event.target.value]);
    } else {
      setSelectedVaccines(
        selectedVaccines.filter((id) => id !== event.target.value)
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const matchedVaccines = [];
    selectedVaccines.forEach((vaccine) => {
      vaccinations.forEach((vac) => {
        if (vaccine == vac.id) {
          matchedVaccines.push(vac);
        }
      });
    });
    setVaccines(matchedVaccines);
    setOpenVacUpdate(true);
    console.log(vaccines);
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center mt-16"
      >
        <span className="flex text-sm lg:text-lg">
          Which of these vaccines has the child received:
        </span>
        <div className="flex flex-col w-80">
          {vaccinations
            .filter((item) => {
              return (
                (item.fifth_dose_after !== null &&
                  item.fifth_dose_after <= daysDifference) ||
                (item.fourth_dose_after !== null &&
                  item.fourth_dose_after <= daysDifference) ||
                (item.third_dose_after !== null &&
                  item.third_dose_after <= daysDifference) ||
                (item.second_dose_after !== null &&
                  item.second_dose_after <= daysDifference) ||
                (item.first_dose_after !== null &&
                  item.first_dose_after <= daysDifference)
              );
            })
            .map((vaccine, index) => {
              return (
                <div key={index} className="flex text-sm lg:text-lg">
                  <Checkbox
                    label={vaccine.name}
                    value={vaccine.id}
                    onChange={handleCheckboxChange}
                  />
                </div>
              );
            })}
        </div>
        <div className="flex flex-col text-sm lg:text-lg">
          <Button
            disabled={selectedVaccines.length <= 0}
            type="submit"
            className="w-56 self-center bg-[#212B36] mt-5 4xs:w-40 3xs:w-56 2xs:w-80 xs:w-96 "
          >
            Submit
          </Button>
          <Button
            onClick={goToDashboard}
            className="w-56 self-center bg-[#212B36] mt-5 4xs:w-40 3xs:w-56 2xs:w-80 xs:w-96 "
          >
            Go to Dashboard
          </Button>
        </div>
      </form>
      <NewChildUpdates
        handleCloseVaccUpdate={handleCloseVaccUpdate}
        openVacUpdate={openVacUpdate}
        vaccines={vaccines}
        date_of_birth={childData?.date_of_birth}
      />
    </div>
  );
}

export default NewChild;
