import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { AccordionCustomAnimation } from "./AccordionComp";

const DateCalendarComp = ({
  openDateViewer,
  handleClickCloseDateViewer,
  scheduleData,
}) => {
  const [date, setDate] = useState();
  const [selectedDates, setSelectedDates] = useState([]);
  const [modifiers, setModifiers] = useState({});

  const colors = [
    "bg-green-500",
    "bg-purple-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-blue-500",
    "bg-red-500",
  ];

  useEffect(() => {
    const dates = [];
    const mods = {};
    if (scheduleData) {
      Object.entries(scheduleData).forEach(([name, doses], index) => {
        const color = colors[index % colors.length];
        doses.forEach((dose) =>
          Object.values(dose).forEach((date) => {
            const dateObj = new Date(date);
            dates.push(dateObj);
            if (!mods[color]) {
              mods[color] = [];
            }
            mods[color].push(dateObj);
          })
        );
      });
    }
    setSelectedDates(dates);
    setModifiers(mods);
  }, [scheduleData]);

  return (
    <div>
      <Dialog
        open={openDateViewer}
        className="-m-4"
        onClose={handleClickCloseDateViewer}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title" className="font-bold">
          {"Vaccine Dates"}
        </DialogTitle>
        <DialogContent className="scrollbar-hidden">
          <DialogContentText
            className="flex gap-10"
            id="alert-dialog-description"
          >
            <DayPicker
              mode="single"
              selected={selectedDates}
              onSelect={setDate}
              modifiers={modifiers}
              showOutsideDays
              className="border-0"
              modifiersClassNames={{
                "bg-green-500": "bg-green-500",
                "bg-yellow-500": "bg-yellow-500",
                "bg-purple-500": "bg-purple-500",
                "bg-pink-500": "bg-pink-500",
                "bg-blue-500": "bg-blue-500",
                "bg-red-500": "bg-red-500",
              }}
              classNames={{
                caption: "flex justify-center py-2 mb-4 relative items-center",
                caption_label: "text-sm font-medium text-gray-900",
                nav: "flex items-center",
                nav_button:
                  "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                nav_button_previous: "absolute left-1.5",
                nav_button_next: "absolute right-1.5",
                table: "w-full border-collapse",
                head_row: "flex font-medium text-gray-900",
                head_cell: "m-0.5 w-9 font-normal text-sm",
                row: "flex w-full mt-2",
                cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: "h-9 w-9 p-0 font-normal",
                day_range_end: "day-range-end",
                day_selected:
                  "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                day_today: "rounded-md bg-[#212B36] text-white",
                day_outside:
                  "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                day_disabled: "text-gray-500 opacity-50",
                day_hidden: "invisible",
              }}
            />
            <Card className="mt-6 w-96">
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  Key
                </Typography>
                <Typography>
                  {scheduleData &&
                    Object.entries(scheduleData).map(([name, doses], index) => {
                      const color = colors[index % colors.length];
                      return (
                        <div key={index}>
                          <h2 className="flex gap-3">
                            <span
                              className={`${color} mr-2 mt-4`}
                              style={{
                                display: "inline-block",
                                width: "20px",
                                height: "20px",
                              }}
                            ></span>
                            <AccordionCustomAnimation name={name} doses={doses} />
                          </h2>
                        </div>
                      );
                    })}
                </Typography>
              </CardBody>
              <CardFooter className="pt-0">
                {/* <Button>Read More</Button> */}
              </CardFooter>
            </Card>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DateCalendarComp;
