import React, { useState } from "react";
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

export function LongDialog({ birthDate, childId, savedScheds, setSavedScheds }) {
  const [open, setOpen] = useState(false);
  const [scheds, setScheds] = useState();
  const [schedItems, setVacItems] = useState([]);

  const handleOpen = () => {
    

    //  fetch the data using the birthdate, ---> what if there is no birthdate

    axios.get(`/fetchVaccineIds`).then((res) => {
      axios
        .post(`/getAllChildSchedules`, {
          vaccines: res.data.vaccineIds,
          date: birthDate,
        
        })
        .then((res) => {
          if (res.data) {
            setScheds(res.data.vaccineSchedule);
            console.log(res.data.vaccineSchedule);
            setVacItems(res.data.vacItems);
            console.log(res.data.vacItems);
          }
        });
    });

    setOpen(!open);
  };

  return (
    <>
      <Button className="w-44 items-center" onClick={()=>handleOpen()}>Update Schedule</Button>
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
                      <ScheduleAccordionAnimation name={name} doses={doses} childId={childId} schedItems={schedItems} savedScheds={savedScheds} setSavedScheds={setSavedScheds} />
                    </h2>
                  </div>
                );
              })}
            <br />
            
            <br />
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handleOpen}>
            cancel
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            confirm
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
