"use client";
import React, { useEffect, useState } from "react";
import axios from "../../../../axios";
import Vaccinaions from "../../vaccination/page";
import { Button, Checkbox } from "@material-tailwind/react";
import { LongDialog } from "@/components/ScheduleUpdates";
import NewChildUpdates from "@/components/NewChildUpdates";

function NewChild({ params }) {
  const [vaccinations, setVaccinations] = useState([]);
  const [childData, setChildData] = useState(null);
  const today = new Date().toISOString().split("T")[0];
  const [selectedVaccines, setSelectedVaccines] = useState([]);
  const [vaccines, setVaccines] = useState([]);
  const [openVacUpdate, setOpenVacUpdate] = useState(false);

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
      .get("getVaccines")
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
    console.log(vaccines)
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <span>Which of these vaccines has the child received:</span>
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
              <div key={index} className="flex flex-col">
                <Checkbox
                  label={vaccine.name}
                  value={vaccine.id}
                  onChange={handleCheckboxChange}
                />
              </div>
            );
          })}
        <Button
          type="submit"
          className="w-56 self-center bg-[#212B36] mt-5 4xs:w-40 3xs:w-56 2xs:w-80 xs:w-96 "
        >
          Submit
        </Button>
      </form>
      <NewChildUpdates  handleCloseVaccUpdate={handleCloseVaccUpdate} openVacUpdate={openVacUpdate} vaccines={vaccines}  />
    </div>
  );
}

export default NewChild;
