"use client";
import React, { useState } from "react";
import {
  Card,
  Option,
  Select,
  Button,
  Typography,
  Input,
  CardBody,
  CardHeader,
} from "@material-tailwind/react";
import clsx from "clsx";
import { Controller } from "react-hook-form";
import axios from '../axios'


const ParentGuardianForm = ({ register, setValue, errors, control,errTouched }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [availableParent, setAvailableParent] = useState({
    status: false,
    parent: null,
  });

  const {isValid,isSubmitted,trigger} = errTouched;

  // const handleCardNoChange = async (e) => {
  //   const currentNidaNo = e.target.value.trim();
  //
  //   if (currentNidaNo.length > 1) {
  //     const result = await trigger("card_no");
  //     if (result) {
  //       try {
  //         const res = await axios.get(`/api/parents?nidaNo=${currentNidaNo}`);
  //         if (res.status === 200) {
  //           if (
  //             res.data.length === 1 &&
  //             res.data[0].card_no === currentCardNo
  //           ) {
  //           } else {
  //             clearErrors("card_no");
  //           }
  //         }
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       }
  //     }
  //   }
  // };

  const handleNidaChange = async (e) => {
    const nidaNo = e.target.value;
    try{
      if (nidaNo.length === 20) {
      const result = await trigger("nida_id");
      if(result){
        const parentRes = await axios.get(`parents?nidaNo=${e.target.value}`)

      if (parentRes.status === 200 && parentRes.data ) {
        const parentData = parentRes.data;
        setAvailableParent({status:true, parent:parentData})
      }
    }
  }
}catch(err){
      setAvailableParent({status:false, parent: null})
    }
  };


  const handleNidaRes = (res)=>{
    if(res === 1){
      console.log(availableParent, "THIS IS THE PARENT")
      const { nida_id, firstname, middlename,lastname, user } =
      availableParent.parent;
    setValue("nida_id", nida_id);
    setValue("par_first_name", firstname);
    setValue("par_middle_name", middlename);
    setValue("par_last_name", lastname);
    setValue("contact", user.contacts);

    setAvailableParent({status:false,parent:null})
    } else{
      setAvailableParent({status:false,parent:null})
    }
  }


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
          <div className="relative">
            <Input
              label="Nida ID:"
              {...register("nida_id", {
                required: "This field is required",
                maxLength: {
                  value: 20,
                  message: "Nida number can not have more than 20 numbers",
                },
                minLength: {
                  value: 20,
                  message: "Nida number can not have less than 20 numbers",
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Please enter valid Nida number",
                },
                onChange:handleNidaChange
              })}
              className="  md:w-56 lg:w-full sm:w-64 "
            />
            {errors.nida_id && (
              <p className="text-red-900 text-xs font-monte">
                {errors.nida_id.message}
              </p>
            )}
          {availableParent.status &&  <Card className="absolute p-4 cursor-pointer w-full bg-gray-50 shadow-xl border-gray-200 border-[0.4px] z-50">
              <div >
                <div className="font-bold text-xs ">{availableParent.parent?.firstname +" "+availableParent.parent?.lastname}</div>
                <p className="text-gray-700 text-xs">NIDA No: {availableParent.parent?.nida_id}</p>
                <p className="text-red-600 text-xs ">
                User already exists, confirm and click to autofill
                </p>
               <div className="flex justify-between">
               <div
                  onClick={() => handleNidaRes(1)}
                  className="text-xs  hover:opacity-80 bg-[#212B36] text-white font-bold p-1 rounded"
                >
                 autofill
                </div>
                <div
                  onClick={() => handleNidaRes(0)}
                  className="text-xs  hover:opacity-80 bg-red-900 text-white font-bold p-1 rounded"
                >
                  cancel
                </div>
               </div>
              </div>
            </Card>}
          </div>
          <div>
            <Input
              label="First Name"
              {...register("par_first_name", {
                required: "This field is required",
              })}
              className="  md:w-56 lg:w-full  sm:w-64 "
            />
            {errors.par_first_name && (
              <p className="text-red-900 text-xs font-monte">
                {errors.par_first_name.message}
              </p>
            )}
          </div>
          <div>
            <Input
              label="Middle Name"
              {...register("par_middle_name", {
                required: "This field is required",
              })}
              className="  md:w-56 lg:w-full  sm:w-64 "
            />
            {errors.par_middle_name && (
              <p className="text-red-900 text-xs font-monte">
                {errors.par_middle_name.message}
              </p>
            )}
          </div>

          <div>
            <Input
              label="Last Name"
              {...register("par_last_name", {
                required: "This field is required",
              })}
              className="  md:w-56 lg:w-full  sm:w-64  "
            />
            {errors.par_last_name && (
              <p className="text-red-900 text-xs font-monte">
                {errors.par_last_name.message}
              </p>
            )}
          </div>

          <div>
            <div className="flex font-monte-1 relative">
              <span
                className={clsx(
                  " absolute inset-y-0 left-0 px-2 text-black flex items-center rounded bg-gray-300",
                  {
                    "border-r-2 border-black": isFocused,
                    "border-r border-gray-500": !isFocused,
                  }
                )}
              >
                +255
              </span>

              <Input
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onFocus={() => setIsFocused(true)}
                autoComplete="off"
                className="text-black font-monte-1 pl-16 border  focus:border-2  !border-t-blue-gray-200 focus:!border-t-gray-900"
                size="lg"
                placeholder="Contacts"
                {...register("contact", {
                  onBlur: () => setIsFocused(false),
                  required: "This field is required",
                  maxLength: {
                    value: 9,
                    message: "Phone number should be exactly 9 digits",
                  },
                  minLength: {
                    value: 9,
                    message: "Phone number should be exactly 9 digits",
                  },
                  pattern: {
                    value: /^[67][123456789][0-9]+$/,
                    message: "Please enter valid number",
                  },
                })}
              />
            </div>
            {errors.contact && (
              <p className="text-red-900 text-xs font-monte">
                {errors.contact.message}
              </p>
            )}
          </div>

          <Controller
            control={control}
            rules={{ required: "This field is required" }}
            name="relation"
            render={({ field:{onBlur, value,onChange}, fieldState: { error } }) => (
              <div>
                <Select
                  onChange={onChange}
                  onBlur={onBlur}
                  selected={value}
                  value={value}
                  label="Relation with Child"
                  className=" sm:w-64 pl-3 lg:w-full rounded-md  md:w-56"
                  animate={{
                    mount: { y: 0 },
                    unmount: { y: 25 },
                  }}
                >
                  <Option value="Mother">Mother</Option>
                  <Option value="Father">Father</Option>
                  <Option value="Relative">Relative</Option>
                </Select>
                {error && (
                  <p className="text-red-900 text-xs font-monte">
                    {error.message}
                  </p>
                )}{" "}
              </div>
            )}
          />
           {isSubmitted && !isValid &&  (
              <p className="text-red-900 text-xs font-monte">
                Please make sure there are no errors in child form and parent form
              </p>
            )}
          <Button
            type="submit"
            className="bg-[#212B36] text-white sm:w-64 lg:w-full hover:bg-[#606061] md:w-56 mt-4"
          >
            Submit
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ParentGuardianForm;
