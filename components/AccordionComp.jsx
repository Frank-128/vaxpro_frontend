import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import ScheduleUpdates, { LongDialog } from "./ScheduleUpdates";
 
const CUSTOM_ANIMATION = {
  mount: { scale: 1 },
  unmount: { scale: 0.9 },
};
 
export function AccordionCustomAnimation({name, doses}) {
  const [open, setOpen] = React.useState(0);
 
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
 
  return (
    <>
      <Accordion open={open === 1} animate={CUSTOM_ANIMATION}>
        <AccordionHeader onClick={() => handleOpen(1)} className="text-sm">{name}</AccordionHeader>
        <AccordionBody>
        <AccordionBody>
          {doses.map((dose, index) => {
            const [doseType, date] = Object.entries(dose)[0];
            return (
              <p key={index}>{`${doseType.charAt(0).toUpperCase() + doseType.slice(1)}: ${date}`}</p>
            );
          })}
      
        </AccordionBody>
        </AccordionBody>
      </Accordion>
    </>
  );
}