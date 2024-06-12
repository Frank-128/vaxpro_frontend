"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "../../../../axios";
import { Button, Select, Option, Input } from "@material-tailwind/react";
import { useForm, Controller } from "react-hook-form";
import clsx from "clsx";
import { BlockRounded, CheckCircleOutlineRounded } from "@mui/icons-material";
import { useInitial } from "@/constants/functions";
import Loading from "../../loading";

const BookingDetails = () => {
  const searchParams = useSearchParams();
  const {getBookings} = useInitial();
  const [bookingDetails, setBookingDetails] = useState();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const [reason, setReason] = useState(false);
  const id = searchParams.get("id");

  const reasonForCancellation = [
    "We are full booked",
    "It is not working day",
    "We don't provide this kind of vaccine",
    "Other reason",
  ];

  const bookingHandler = (setter) => {
    if (setter === 1) {
      setLoading(true)
      axios
        .put(`update_booking/${bookingDetails?.id}`, {
          status: "confirmed",
        })
        .then((res) => {
          setLoading(false);
          fetchBooking();
          getBookings();
        });
    }
    if (typeof setter === "object") {
      setLoading(true)
      const { other_reason, reason_for_booking_cancellation } = setter;

      if (reason_for_booking_cancellation !== "Other reason") {
        axios
          .put(`update_booking/${bookingDetails?.id}`, {
            status: "cancelled",
            rejection_reason: reason_for_booking_cancellation,
          })
          .then((res) => {
            setLoading(false)
            fetchBooking();
            getBookings();
            setReason(false);
          });
      } else {
        axios
          .put(`update_booking/${bookingDetails?.id}`, {
            status: "cancelled",
            rejection_reason: other_reason,
          })
          .then((res) => {
            setLoading(false)
            fetchBooking();
            getBookings();
            setReason(false);
          });
      }
      
    }
    // setLoading(false)
  };

  const fetchBooking = () => {
    axios.get(`indexBooking/${id}`).then((res) => {
      setBookingDetails(res.data);
    });
  };

  useEffect(() => {
    const fetchBooking = () => {
      axios.get(`indexBooking/${id}`).then((res) => {
        setBookingDetails(res.data);
      });
    };

    fetchBooking();
  }, [id]);

  // console.log(bookingDetails);

  return (
  bookingDetails ?  
  <main className="flex flex-col gap-12">
   { bookingDetails ?  <div
        className={clsx({
          "bg-green-50": bookingDetails?.status === "confirmed",
          "bg-red-50": bookingDetails?.status === "cancelled",
          "flex justify-between  shadow-sm px-4 py-16 min-h-[20rem] border rounded": true,
        })}
      >
        <div className="flex flex-col gap-2">
          <div className="flex gap-3 items-center md:text-2xl">
            <span>Name:</span>
            <div className="space-x-2">
              <span className="md:text-3xl font-monte-3">
                {bookingDetails?.children?.firstname}
              </span>
              <span className="md:text-3xl font-monte-3">
                {bookingDetails?.children?.surname}
              </span>
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <span className="md:text-2xl">Card Number:</span>
            <span className="md:text-2xl font-monte-3">
              {bookingDetails?.child_id}
            </span>
          </div>
          <div>
            <span className="md:text-2xl">Vaccination Date: </span>
            <span className="md:text-2xl font-monte-3">
              {bookingDetails?.vaccination_date}
            </span>
          </div>
        </div> 
        {!reason && bookingDetails?.status === "pending" && (
          <div className="flex gap-3 justify-center items-center">
            <Button
              loading={loading}
              onClick={() => bookingHandler(1)}
              ripple={false}
              className="bg-green-700 shadow-none rounded h-[25%] py-1 px-12"
            >
              confirm
            </Button>
            <Button
              ripple={false}
              className="bg-red-700 shadow-none px-12 h-[25%] rounded "
              onClick={() => setReason(true)}
            >
              cancel
            </Button>
          </div>
        )}
        <div className="flex justify-center items-center">
          {bookingDetails?.status === "confirmed" ? (
            <div className="text-green-500 ">
              <CheckCircleOutlineRounded fontSize="large" />
            </div>
          ) : bookingDetails?.status === "cancelled" ? (
            <div>
              <div className="text-red-500 ">
                <BlockRounded fontSize="large" />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
: <Loading/>}
      {reason && (
        <form
          onSubmit={handleSubmit(bookingHandler)}
          className="flex flex-col gap-4 font-monte-3 p-4 rounded border shadow-sm "
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1  w-[60%]">
              <span className="md:text-2xl capitalize">
                Select reason for cancelling this booking
              </span>
              <Controller
                control={control}
                rules={{ required: "Select reason to submit" }}
                name="reason_for_booking_cancellation"
                render={({
                  field: { onChange, onBlur, value, ref },
                  fieldState: { error },
                }) => (
                  <div>
                  <Select
                    animate={{
                      mount: { y: 0 },
                      unmount: { y: 25 },
                    }}
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    // labelProps={{
                    //   className: "before:content-none after:content-none",
                    // }}
                    className="focus:border-2 focus:border-black border-t"
                  >
                    {reasonForCancellation.map((reason, index) => (
                      <Option
                        value={reason}
                        key={index}
                        className="text-black font-monte-3 "
                      >
                        {reason}
                      </Option>
                    ))}
                  
                  </Select>
                   {error && (
                    <p className="text-red-900 text-xs font-monte">
                      {error.message}
                    </p>
                  )}
                  </div>
                )}
              />
             
            </div>
            {watch("reason_for_booking_cancellation") === "Other reason" && (
              <div className="flex flex-col gap-1 w-[60%]">
                <span>Write the specific reason here</span>
                <Input
                  {...register("other_reason", {
                    required:true,
                  })}
                />
                {errors.other_reason && (
                  <p className="text-red-500">Write reason for cancelling</p>
                )}
              </div>
            )}
          </div>

          <div className="flex gap-4 justify-end">
            <Button
              type="submit"
              loading={loading}
              ripple={false}
              className="bg-[#212b36] shadow-none rounded py-3 px-12"
            >
              submit
            </Button>
            <Button
              onClick={() => {setReason(false); clearErrors()}}
            
              ripple={false}
              className="bg-red-800 shadow-none rounded py-3 px-12"
            >
              cancel
            </Button>
          </div>
        </form>
      )}
    </main>
     : <Loading/>
  );
};

export default BookingDetails;
