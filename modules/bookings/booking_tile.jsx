"use client";
import globalBookings from "@/store/bookings";
import { Button, Card } from "@material-tailwind/react";
import { NavigateNext } from "@mui/icons-material";
import React, { useState } from "react";
import Link from 'next/link';

export default function BookingTile () {
  const [isHovered, setIsHovered] = useState(null);
  const bookings = globalBookings((state) => state.bookings);

  const handleMouseEnter = (index) => {
    console.log(index, "this is the index");
    setIsHovered(index);
  };

  const handleMouseLeave = () => {
    setIsHovered(null);
  };
  return (
    <div className="flex flex-col gap-4">
      <span className="text-3xl font-monte-1">Booking List</span>
      {bookings.map(({ child_id, vaccine_list }, index) => (
        <Card
          key={index}
          className="p-8 flex flex-row justify-between border-t text-black"
        >
          <div className="flex flex-col">
            <div className="flex gap-6 text-black">
              <span>Child ID:</span>{" "}
              <span className="font-monte-1">{child_id}</span>{" "}
            </div>
            <div className="flex gap-6">
              <span className="">Vaccines</span>
              <div className="flex gap-8 font-monte-1 text-black">
                <span>{vaccine_list.name}</span>
                <span>{vaccine_list.name2}</span>
              </div>
            </div>
          </div>
          <Button
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            className="w-48 h-10 flex items-center justify-center"
          >
            <Link href={"/"}>
            {isHovered === index ? (
              <div className="flex  gap-2 justify-center items-center">
                <span className="">View more</span>
                <NavigateNext />
              </div>
            ) : (
              "View more"
            )}
            </Link>
          </Button>
        </Card>
      ))}
    </div>
  );
};

// export default BookingTile;
