"use client";
import React from 'react'
import {
  Card,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { TextField } from "@mui/material";

const AddressForm = () => {
    return (
        <Card
          color="transparent "
          className="items-center sm:w-full "
          shadow={false}
        >
          <Typography className="4xs:text-sm  " variant="h4" color="blue-gray">
            Register Address
          </Typography>
    
          <form className="mt-8 mb-2 items-center sm:w-1/3  justify-center  max-w-screen-lg  ">
            <div className="mb-1 flex  2xs:w-72 xs:w-full rounded-md 2xs:p-4 3xs:w-56 4xs:w-32 2xs:ml-0 xs:ml-0                                                                                                                                                                                                                                                                                                                                              flex-col gap-6">
              <TextField
                label="Region"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900  "
              />
    
              <TextField
                label="District"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900  "
              />
    
              <TextField
                label="Ward"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900  "
              />
    
             
            </div>
          </form>
        </Card>
      );
}

export default AddressForm