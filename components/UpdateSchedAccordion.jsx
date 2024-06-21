"use client";
import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import globalUser from "@/store/user";
import { usePathname } from "next/navigation";
import axios from "../axios";
import { useRouter } from "next/navigation";

const CUSTOM_ANIMATION = {
  mount: { scale: 1 },
  unmount: { scale: 0.9 },
};

export function UpdateSchedAccordion({ vaccines, date_of_birth }) {
  const [open, setOpen] = React.useState(false);
  const { register, handleSubmit } = useForm();
  const loggedInUser = globalUser((state) => state.loggedInUser);
  const pathname = usePathname();
  const router = useRouter();

  const childData = pathname.split("/")[2];

  const handleOpen = () => setOpen(!open);

  const submitData = (data) => {
    const result = {};

    // Iterate through each key-value pair in the original object
    for (const [key, value] of Object.entries(data)) {
      const [mainKey] = key.split("_"); // Extract the main key (before the underscore)

      // If the main key doesn't exist in the result object, create an empty array for it
      if (!result[mainKey]) {
        result[mainKey] = [];
      }

      // Push the date value into the corresponding array in the result object
      result[mainKey].push(value);
    }

    // Sort the dates for each main key
    for (const key in result) {
      result[key].sort(); // This sorts the dates in ascending order
    }

    const dataToBackend = {
      dates: result,
      health_worker_id: loggedInUser?.id,
      facility_id: loggedInUser?.facility_id,
      child_id: childData,
    };

    axios.post(`/updateSelectedVacs`, { data: dataToBackend }).then((res) => {
      router.push(`/childdetails?cardNo=${childData}`);
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitData)}>
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
                      {...register(`${vac.id + "_" + i}`, {
                        validate: (value) => {
                          const selectedDate = new Date(value);
                          const today = new Date();
                          const minDate = new Date(date_of_birth); 
                          return (
                            selectedDate <= today && selectedDate >= minDate
                          );
                        },
                      })}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </>
                ))}
              </AccordionBody>
            </Accordion>
          ))}
        <Button className="" type="submit">
          Save changes
        </Button>
      </form>
    </>
  );
}
