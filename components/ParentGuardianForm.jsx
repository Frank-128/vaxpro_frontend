"use client";
import React, { useState } from "react";
import { Card, Option, Select, Typography } from "@material-tailwind/react";
import { TextField, Button } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "../axios";



const ParentGuardianForm = ({ register, setValue }) => {

  const [parents, setParents] = useState([]);
  const [nidaNoInput, setNidaInput] = useState("");

  const handleNidaChange = (nidaNo) => {
    setNidaInput(nidaNo);
    if (nidaNo) {
      axios.get(`/api/parents?nidaNo=${nidaNo}`).then((res) => {
        if (res.status === 200 && res.data.length > 0) {
          console.log(res.data);
          const parentData = res.data[0]; 
          setParents([parentData]); 
          
          const { nida_id, firstname, middlename, lastname, child, user } = parentData;
          setValue("nida_id", nida_id);
          setValue("par_first_name", firstname);
          setValue("par_middle_name", middlename);
          setValue("par_last_name", lastname);
          
          if(user){
            setValue("contact", user.contacts);
          }
          if (child.length > 0) {
            setValue("relation", child[0].pivot.relationship_with_child);
          }
        }
      });
    }
  };
  


  return (
    <Card
      color="transparent "
      className="items-center sm:w-full "
      shadow={false}
    >
      <Typography className="4xs:text-sm  " variant="h4" color="blue-gray">
        Register Parent/Guardian
      </Typography>

      <div className="mt-8 mb-2 items-center sm:w-1/3  justify-center  max-w-screen-lg  ">
        <div className="mb-1 flex  2xs:w-72 xs:w-full  rounded-md 2xs:p-4 3xs:w-56 4xs:w-32 2xs:ml-0 xs:ml-0 flex-col gap-6">
          <Autocomplete
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 sm:w-56 lg:w-full "
            options={parents}
            freeSolo
            getOptionLabel={(option) => option.nida_id.toString()}
            onInputChange={(event, newValue) => handleNidaChange(newValue)}
          
            inputValue={nidaNoInput}
            renderInput={(params) => (
              <TextField  {...params} label="Search Nida Card No:" />
            )}
          />


          <TextField
            label="Nida ID:"
            type="number"
            {...register("nida_id")}
            className=" !border-t-blue-gray-200 md:w-56 lg:w-full focus:!border-t-gray-900 sm:w-64 "
          />

          <TextField
            label="First Name"
            {...register("par_first_name")}
            className=" !border-t-blue-gray-200 md:w-56 lg:w-full focus:!border-t-gray-900 sm:w-64 "
          />

          <TextField
            label="Middle Name"
            {...register("par_middle_name")}
            className=" !border-t-blue-gray-200 md:w-56 lg:w-full focus:!border-t-gray-900  sm:w-64 "
          />

          <TextField
            label="Last Name"
            {...register("par_last_name")}
            className=" !border-t-blue-gray-200 md:w-56 lg:w-full focus:!border-t-gray-900 sm:w-64  "
          />

          <TextField
            label="Contact"
            type="number"
            {...register("contact")}
            className=" !border-t-blue-gray-200 md:w-56 lg:w-full focus:!border-t-gray-900 sm:w-64  "
          />

          <select
            label="Relation with Child"
            {...register("relation")}
            className="h-14 sm:w-64 pl-3 lg:w-full rounded-md  md:w-56"
          >
            <option value="Mother">Mother</option>
            <option value="Father">Father</option>
            <option value="Relative">Relative</option>
          </select>

          <Button
            type="submit"
            className="bg-[#212B36] text-white sm:w-64 lg:w-full hover:bg-[#606061] md:w-56 h-14 mt-4"
          >
            {" "}
            Submit
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ParentGuardianForm;
