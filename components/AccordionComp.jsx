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

  const formatDoseType = (doseType) => {
    const parts = doseType.split("_");
    const capitalizedFirstPart =
      parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    return `${capitalizedFirstPart} ${parts[1]}`;
  };
 
  return (
    <>
      <Accordion open={open === 1} animate={CUSTOM_ANIMATION}>
        <AccordionHeader onClick={() => handleOpen(1)}  className="text-sm 4xs:text-xs">{name}</AccordionHeader>
        <AccordionBody>
        <AccordionBody>
            {doses.map((dose, index) => {
              const [doseType, date] = Object.entries(dose)[0];
              return (
                <div className="flex flex-col mb-2">
                  <p
                    className="4xs:text-xs text-sm font-bold italic"
                    key={index}
                  >{`${formatDoseType(doseType)}:`}</p>
                  <p className="4xs:text-xs text-sm">{`${date}`}</p>
                </div>
              );
            })}
          </AccordionBody>
        </AccordionBody>
      </Accordion>
    </>
  );
}