import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Typography,
  Input,
} from "@material-tailwind/react";

const CUSTOM_ANIMATION = {
  mount: { scale: 1 },
  unmount: { scale: 0.9 },
};

export function UpdateSchedAccordion({ vaccines }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <form>
      {vaccines &&
        vaccines.map((vac, index) => (
          <Accordion key={index} open={open} animate={CUSTOM_ANIMATION}>
            <AccordionHeader onClick={handleOpen} className="text-sm">
              <Typography>{vac.name}</Typography>
            </AccordionHeader>
            <AccordionBody>
              {Array.from({ length: vac.frequency }, (_, i) => (
                <>
                <Typography>{`Dose ${i + 1}`}</Typography>
                <Input
                  className="mb-2"
                  key={i}
                  type="date"
                 
                />
                </>
              ))}
            </AccordionBody>
          </Accordion>
        ))}
      </form>
    </>
  );
}
