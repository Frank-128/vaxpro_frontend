import React, { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import ScheduleUpdates, { LongDialog } from "./ScheduleUpdates";
import axios from "../axios";
import globalUser from "@/store/user";
import { ConfirmDialog } from "./ConfirmDialog";

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
}) {
  const [open, setOpen] = useState(0);
  const [currentDose, setCurrentDose] = useState(0);
  const loggedInUser = globalUser((state) => state.loggedInUser);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const handleUpdate = (index, date) => {
    setCurrentDose(index);

    const currentItem = schedItems.find((item) => item.name === name);

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
        axios.get(`/getSavedSchedules/${childId}`).then((res) => {
          console.log(res.data);
          setSavedScheds(res.data.child_schedules);
        });
      });
  };

  return (
    <>
      <Accordion open={open === 1} animate={CUSTOM_ANIMATION}>
        <AccordionHeader onClick={() => handleOpen(1)} className="text-sm">
          {name}
        </AccordionHeader>
        <AccordionBody>
          {doses.map((dose, index) => {
            const [doseType, date] = Object.entries(dose)[0];
            const currentItem = schedItems.find((item) => item.name === name);

            const isVaccineIdNotInSavedScheds = !savedScheds.some(
              (sched) => sched.vaccine_id === currentItem.id
            );

            const isDoseSaved = savedScheds.some(
              (sched) =>
                sched.vaccination_date === date &&
                sched.vaccine_id === currentItem.id
            );

            const nextVaccinationDates = savedScheds
              .filter((sched) => sched.vaccine_id === currentItem.id)
              .map((sched) => sched.next_vaccination_date);

            const isNextVaccinationDate = nextVaccinationDates.includes(date);

            let divColorClass = "";
            let buttonText = "Update";
            if (isDoseSaved) {
              divColorClass = "bg-green-500";
            }  else if (
              (!isDoseSaved && isVaccineIdNotInSavedScheds && index === 0) ||
              isNextVaccinationDate
            ) {
              divColorClass = "bg-orange-500";
              buttonText = "Next";
            }
             else {
              divColorClass = "bg-gray-500";
              buttonText = "Pending";
            }

            return (
              <div
                className={`flex gap-2 rounded-md p-2 mb-2 w-1/2 ${divColorClass}`}
                key={index}
              >
                {!isDoseSaved && (
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
                <p className="mt-1">{`${
                  doseType.charAt(0).toUpperCase() + doseType.slice(1)
                }: ${date}`}</p>
              </div>
            );
          })}
        </AccordionBody>
      </Accordion>
    </>
  );
}
