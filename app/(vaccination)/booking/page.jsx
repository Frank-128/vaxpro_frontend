"use client";
import globalBookings from "@/store/bookings";
import { Button, Card } from "@material-tailwind/react";
import {
  CheckCircle,
  DoNotDisturb,
  NavigateNext,
  Pending,
} from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useInitial } from "@/constants/functions";

export default function BookingTile() {
  const [isHovered, setIsHovered] = useState(null);
  const bookings = globalBookings((state) => state.bookings);
  const [bookingsFiltered, setBookingsFiltered] = useState([]);
  const { getBookings } = useInitial();

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

  useEffect(() => {
    // getBookings();
  });

  return (
    <div className="flex flex-col gap-4">
      <span className="text-3xl font-monte-1">Booking List</span>
      <div className="flex justify-end  items-center gap-3">
        <p>Filter:</p>
        <select
          className="border rounded p-1 border-gray-600 focus:border-gray-900 "
          {...register("filter", { onChange: handleOnChange })}
        >
          <option value="all">All</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      {bookingsFiltered.map(
        ({ child_id, children, vaccine_list, id, status }, index) => (
          <Card
            key={index}
            className="px-2 md:px-8 py-5 md:py-8 flex flex-row justify-between border-t text-black"
          >
            <div className="flex flex-col text-xs md:text-sm">
              <div className="flex gap-2 text-black">
                <span>Name:</span>{" "}
                <span className="font-monte-1 flex gap-1 capitalize">
                  <span>{children?.firstname}</span>
                  <span>{children?.surname}</span>
                </span>{" "}
              </div>
              <div className="flex gap-2 text-black">
                <span>Child ID:</span>{" "}
                <span className="font-monte-1">{child_id}</span>{" "}
              </div>
              <div className=" hidden md:flex gap-6">
                <span className="">Vaccines</span>
                <div className="flex gap-8 font-monte-1 text-black">
                  <span>{vaccine_list.name}</span>
                  <span>{vaccine_list.name2}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center gap-1 md:gap-3">
              {status === "confirmed" ? (
                <div>
                  <span className="text-green-700  md:hidden ">
                    <CheckCircle />{" "}
                  </span>
                  <p className="hidden md:flex text-xs text-green-900 bg-green-100 rounded p-1">
                    Confirmed
                  </p>
                </div>
              ) : status === "cancelled" ? (
                <div>
                  <span className="text-red-700  md:hidden ">
                    <DoNotDisturb />{" "}
                  </span>
                  <p className="hidden md:flex text-xs text-red-900 bg-red-100 rounded p-1">
                    Cancelled
                  </p>
                </div>
              ) : status === "pending" ? (
                <div>
                  <span className="text-blue-700  md:hidden ">
                    <Pending />{" "}
                  </span>
                  <p className="hidden md:flex text-xs text-blue-900 bg-blue-100 rounded p-1">
                    Pending
                  </p>
                </div>
              ) : (
                ""
              )}
              <Button
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                className="md:w-[90%] h-8 flex items-center justify-center bg-[#212b36] "
              >
                <Link
                  href={`/booking/booking_details/`}
                  as={{ pathname: `/booking/${id}`, query: { id: id } }}
                >
                  {isHovered === index ? (
                    <div className="flex  gap-2 justify-center items-center text-3xl">
                      <span className="text-xs">View more</span>
                      <NavigateNext />
                    </div>
                  ) : (
                    "View more"
                  )}
                </Link>
              </Button>
            </div>
          </Card>
        )
      )}
    </div>
  );
}
