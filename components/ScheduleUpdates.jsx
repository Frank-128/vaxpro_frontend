import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import axios from "../axios";
import { ScheduleAccordionAnimation } from "./ScheduleAccordion";

export function LongDialog({
  birthDate,
  childId,
  savedScheds,
  setSavedScheds,
}) {
  const [open, setOpen] = useState(false);
  const [scheds, setScheds] = useState();
  const [schedItems, setVacItems] = useState([]);

  const fetchVaccineIds = () => {
    axios.get(`/fetchVaccineIds`).then((res) => {
      axios
        .post(`/getAllChildSchedules`, {
          vaccines: res.data.vaccineIds,
          date: birthDate,
          child_id: childId,
        })
        .then((res) => {
          if (res.data) {
            setScheds(res.data.vaccineSchedule);
            console.log(res.data.vaccineSchedule);
            setVacItems(res.data.vacItems);
            console.log(res.data.vacItems);
          }
        })
    }).catch(error=>{
      console.log(error)
    });
  };


  const handleOpen = () => {
    //  fetch the data using the birthdate, ---> what if there is no birthdate
    fetchVaccineIds();

    setOpen(!open);
  };

  return (
    <>
      <Button className="w-44 items-center" onClick={() => handleOpen()}>
        Update Schedule
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Schedule Update:</DialogHeader>
        <DialogBody className="h-[42rem] overflow-scroll">
          <Typography className="font-normal mb-40">
            {/* iterate the schedules from the backend */}
            {scheds &&
              Object.entries(scheds).map(([name, doses], index) => {
                return (
                  <div key={index}>
                    <h2 className="flex gap-3">
                      <ScheduleAccordionAnimation
                        fetchVaccineIds={fetchVaccineIds}
                        name={name}
                        doses={doses}
                        childId={childId}
                        schedItems={schedItems}
                        savedScheds={savedScheds}
                        setSavedScheds={setSavedScheds}
                      />
                    </h2>
                  </div>
                );
              })}
            <br />
            <br />
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" className="bg-gray-700 text-white" onClick={handleOpen}>
            close
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
