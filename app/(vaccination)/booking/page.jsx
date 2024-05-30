"use client";
import globalBookings from "@/store/bookings";
import { Button, Card } from "@material-tailwind/react";
import {
  
  NavigateNext,
} from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useForm, } from "react-hook-form";

export default function BookingTile() {
  const [isHovered, setIsHovered] = useState(null);
  const bookings = globalBookings((state) => state.bookings);
  const [bookingsFiltered, setBookingsFiltered] = useState([]);
  const { watch, register } = useForm();

  const handleMouseEnter = (index) => {
    setIsHovered(index);
  };

  const handleMouseLeave = () => {
    setIsHovered(null);
  };

  useEffect(() => {
    setBookingsFiltered(bookings);
  }, [bookings]);
  const handleOnChange = () => {
    const filterValue = watch("filter");

    if (filterValue === "all") {
      setBookingsFiltered(bookings);
    } else {
      const bookingsFiltered1 = bookings.filter((booking) => {
        return booking?.status === filterValue;
      });
      setBookingsFiltered(bookingsFiltered1);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <span className="text-3xl font-monte-1">Booking List</span>
      <div className="flex justify-end  items-center gap-3">
        <p>Filter:</p>
        <select
          className="border rounded p-1 border-gray-700"
          {...register("filter", { onChange: handleOnChange })}
        >
          <option value="all">All</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      {bookingsFiltered.map(({ child_id,firstname, surname, vaccine_list, id, status }, index) => (
        <Card
          key={index}
          className="p-8 flex flex-row justify-between border-t text-black"
        >
          <div className="flex flex-col">
            <div className="flex gap-6 text-black">
              <span>Name:</span>{" "}
              <span className="font-monte-1">{firstname}{surname}</span>{" "}
            </div>
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
          <div className="flex justify-center items-center gap-3">
            {status === "confirmed" ? (
              <p className="text-xs text-green-900 bg-green-100 rounded p-1">
                Confirmed
              </p>
            ) : status === "cancelled" ? (
              <p className="text-xs text-red-900 bg-red-100 rounded p-1">
                Cancelled
              </p>
            ) : status === "pending" ? (
              <p className="text-xs text-blue-900 bg-blue-100 rounded p-1">
                Pending
              </p>
            ) : (
              ""
            )}
            <Button
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              className="w-48 h-10 flex items-center justify-center"
            >
              <Link
                href={`/booking/booking_details/`}
                as={{ pathname: `/booking/${id}`, query: { id: id } }}
              >
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
          </div>
        </Card>
      ))}
    </div>
  );
}
