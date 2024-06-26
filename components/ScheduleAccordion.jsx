import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import ScheduleUpdates, { LongDialog } from "./ScheduleUpdates";
import axios from "../axios";
import globalUser from "@/store/user";
import { ConfirmDialog } from "./ConfirmDialog";
import { addDays, format } from "date-fns";

const CUSTOM_ANIMATION = {
  mount: { scale: 1 },
  unmount: { scale: 0.9 },
};

export function ScheduleAccordionAnimation({
  name,
  doses,
  childId,
  schedItems,
  savedScheds,
  setSavedScheds,
  fetchVaccineIds
}) {
  const [open, setOpen] = useState(0);
  const [currentDose, setCurrentDose] = useState(0);
  const loggedInUser = globalUser((state) => state.loggedInUser);
  const [selectedDate, setSelectedDate] = useState();
  const [vaccines, setVaccines] = useState([]);
  const [newsdoses, setNewDoseDates] = useState([]);
  const [formattedDates, setFormattedDates] = useState([]);
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  console.log(formattedDate); // Output: "2024-06-21"

  const fetchVaccineSchedule = () => {
    axios
      .get(`getChildVaccines/${childId}`)
      .then((res) => {
        setVaccines(res.data.vaccines);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchVaccineSchedule();
  }, [childId]);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleUpdate = (index, date) => {
    setCurrentDose(index);

    const currentItem = schedItems.find((item) => item.name === name);

    const matchedVaccine = vaccines.find(
      (vaccine) => vaccine.id === currentItem.id
    );

    if (matchedVaccine) {
      const doseIntervals = [
        matchedVaccine.first_dose_after,
        matchedVaccine.second_dose_after,
        matchedVaccine.third_dose_after,
        matchedVaccine.fourth_dose_after,
        matchedVaccine.fifth_dose_after,
      ];

      let nextDate = new Date(date);
      const generatedDates = [];

      for (let i = index; i < doseIntervals.length; i++) {
        if (doseIntervals[i] !== null) {
          nextDate = addDays(nextDate, doseIntervals[i]);
          generatedDates.push(nextDate);
        }
      }

      const formattedDates = generatedDates.map((date) =>
        format(date, "yyyy-MM-dd")
      );
      setFormattedDates(formattedDates);
      console.log("Formatted Dates:", formattedDates);
    }

    axios
      .post(`/updateChildVacSchedule`, {
        vaccine_id: currentItem.id,
        frequency: currentItem.frequency,
        selected_date: date,
        index: index,
        child_id: childId,
        facility_id: loggedInUser?.facility_id,
        health_worker_id: loggedInUser?.id,
      })
      .then((res) => {
        const doseDatesArray = [];

        Object.entries(res.data.vaccineSchedule).forEach(
          ([vaccineName, doses]) => {
            // Iterate over each dose object and extract the date
            doses.forEach((dose) => {
              const date = Object.values(dose)[0]; // Extracts the date value (e.g., '2024-06-25')
              doseDatesArray.push(date);
            });
          }
        );

        setNewDoseDates(doseDatesArray)

        axios.get(`/getSavedSchedules/${childId}`).then((res) => {
          console.log(res.data);
          setSavedScheds(res.data.child_schedules);
        });
      });
    fetchVaccineSchedule();
    // fetch the schedules again from the backend
    fetchVaccineIds()
  };

  

  return (
    <>
      <Accordion open={open === 1} animate={CUSTOM_ANIMATION}>
        <AccordionHeader onClick={() => handleOpen(1)} className="text-sm">
          {name}
        </AccordionHeader>
        <AccordionBody>
          {/* Doses are the dates for the vaccination schedule */}
          {doses.map((dose, index) => {
            const [doseType, date] = Object.entries(dose)[0];
            const currentItem = schedItems.find((item) => item.name === name); // schedItems is all vaccines

            const isVaccineIdNotInSavedScheds = !savedScheds.some( //only the provided vaccines list are displayed here
              (sched) => sched.vaccine_id === currentItem.id
            );

            const vaccinationDate = new Date(date);
            const todayIsAfterVacDate = vaccinationDate < today;

            let savedDoseDate = null;
            let savedNextDoseDate = null;

            const isDoseSaved = savedScheds.some((sched) => {
              savedDoseDate = sched.vaccination_date;
              savedNextDoseDate = sched.next_vaccination_date;

              return (
                sched.frequency == index + 1 &&
                sched.vaccine_id === currentItem.id
              );
            });

            const nextVaccinationDates = savedScheds
              .filter((sched) => sched.vaccine_id === currentItem.id)
              .map((sched) => sched.next_vaccination_date);

            const isNextVaccinationDate = nextVaccinationDates.includes(date);

            let divColorClass = "";
            let buttonText = "Update";
            if (isDoseSaved) {
              divColorClass = "bg-green-500";
            } else if (
              todayIsAfterVacDate &&
              !isDoseSaved &&
              isVaccineIdNotInSavedScheds
            ) {
              divColorClass = "bg-red-500";
            } else if (
              (!isDoseSaved && isVaccineIdNotInSavedScheds && index === 0) ||
              isNextVaccinationDate
            ) {
              divColorClass = "bg-orange-500";
              buttonText = "Next";
            } else {
              divColorClass = "bg-gray-500";
              buttonText = "Pending";
            }

            return (
              <div
                className={`flex gap-2 rounded-md p-2 mb-2 w-96 justify-start ${divColorClass}`}
                key={index}
              >
                {!isDoseSaved && !todayIsAfterVacDate && (
                  <button
                    onClick={() => handleUpdate(index, date)}
                    className="p-1 rounded-md bg-[#212B36] w-24 text-white"
                    disabled={
                      !isNextVaccinationDate &&
                      !(isVaccineIdNotInSavedScheds && index === 0)
                    }
                  >
                    {buttonText}
                  </button>
                )}

                {!isDoseSaved && todayIsAfterVacDate && (
                  <div className="flex flex-col  gap-2">
                    <input
                      type="date"
                      onChange={handleDateChange}
                      className="p-1 w-48 rounded-md"
                    />
                    <button
                      onClick={() => handleUpdate(index, selectedDate)}
                      className="p-1 rounded-md bg-[#212B36] w-24 text-white"
                      disabled={
                        !isNextVaccinationDate &&
                        !(isVaccineIdNotInSavedScheds && index === 0)
                      }
                    >
                      {buttonText}
                    </button>
                  </div>
                )}
                <p className="mt-1">{`${
                  doseType.charAt(0).toUpperCase() + doseType.slice(1)
                }: ${isDoseSaved ? savedDoseDate : date }`}</p>
              </div>
            );
          })}
        </AccordionBody>
      </Accordion>
    </>
  );
}
