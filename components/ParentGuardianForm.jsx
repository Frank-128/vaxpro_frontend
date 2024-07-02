"use client";
import React, { useState } from "react";
import {
  Button,
  Card,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import clsx from "clsx";
import { Controller } from "react-hook-form";
import axios from "../axios";

const ParentGuardianForm = ({
  register,
  setValue,
  errors,
  control,
  errTouched,
  loading,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [availableParent, setAvailableParent] = useState({
    status: false,
    parent: null,
  });

  const { isValid, isSubmitted, trigger } = errTouched;

  const handleNidaChange = async (e) => {
    const nidaNo = e.target.value;
    try {
      if (nidaNo.length === 20) {
        const result = await trigger("nida_id");
        if (result) {
          const parentRes = await axios.get(`parents?nidaNo=${e.target.value}`);

          if (parentRes.status === 200 && parentRes.data) {
            const parentData = parentRes.data;
            setAvailableParent({ status: true, parent: parentData });
          }
        }
      }
    } catch (err) {
      setAvailableParent({ status: false, parent: null });
    }
  };

  const handleNidaRes = (res) => {
    if (res === 1) {
      console.log(availableParent, "THIS IS THE PARENT");
      const { nida_id, firstname, middlename, lastname, user } =
        availableParent.parent;
      setValue("nida_id", nida_id);
      setValue("par_first_name", firstname);
      setValue("par_middle_name", middlename);
      setValue("par_last_name", lastname);
      setValue("contact", user.contacts);

      setAvailableParent({ status: false, parent: null });
    } else {
      setAvailableParent({ status: false, parent: null });
    }
  };

   

  return (
    <Card
      color="transparent "
      className="items-center p-4 md:p-8"
      shadow={false}
    >
      <Typography className="self-start font-monte-1 text-black capitalize lg:text-2xl">
        parent/Guardian details
      </Typography>

      <div className="flex flex-col md:gap-6 gap-4 w-full pt-6">
        <div className={"flex flex-col md:flex-row gap-4 md:gap-3 w-full"}>
          <div className="relative w-[95%] sm:w-[85%] md:[70%] lg:w-[40%] flex flex-col gap-3">
            <Input
              size="lg"
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
                onChange: handleNidaChange,
              })}
              className={""}
            />
            {errors.nida_id && (
              <p className="text-red-900 text-xs px-2">
                {errors.nida_id.message}
              </p>
            )}
            {availableParent.status && (
              <Card className="absolute top-11 p-4 cursor-pointer w-full bg-gray-50 shadow-xl border-gray-200 border-[0.4px] z-50">
                <div className={"flex flex-col gap-1 w-full"}>
                  <div className="font-bold text-xs ">
                    {availableParent.parent?.firstname +
                      " " +
                      availableParent.parent?.lastname}
                  </div>
                  <p className="text-gray-700 text-xs">
                    NIDA No: {availableParent.parent?.nida_id}
                  </p>
                  <p className="text-red-600 text-xs ">
                    User already exists, confirm and click to autofill
                  </p>
                  <div className="flex justify-between">
                    <div
                      onClick={() => handleNidaRes(1)}
                      className="text-xs  hover:opacity-80 bg-blue-900 capitalize text-white font-bold p-1 rounded"
                    >
                      autofill
                    </div>
                    <div
                      onClick={() => handleNidaRes(0)}
                      className="text-xs  hover:opacity-80 bg-red-900 capitalize text-white font-bold p-1 rounded"
                    >
                      cancel
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
          <div
            className={
              "w-[95%] sm:w-[85%] md:[70%] lg:w-[40%] flex flex-col gap-3"
            }
          >
            <Input
              size="lg"
              label="First Name"
              {...register("par_first_name", {
                required: "This field is required",
              })}
              className=""
            />
            {errors.par_first_name && (
              <p className="text-red-900 text-xs px-2">
                {errors.par_first_name.message}
              </p>
            )}
          </div>
        </div>

        <div className={"flex flex-col md:flex-row gap-4 md:gap-3 w-full"}>
          <div
            className={
              "w-[95%] sm:w-[85%] md:[70%] lg:w-[40%] flex flex-col gap-3"
            }
          >
            <Input
              size="lg"
              label="Middle Name"
              {...register("par_middle_name", {
                required: "This field is required",
              })}
              className=""
            />
            {errors.par_middle_name && (
              <p className="text-red-900 text-xs px-2">
                {errors.par_middle_name.message}
              </p>
            )}
          </div>
          <div
            className={
              "w-[95%] sm:w-[85%] md:[70%] lg:w-[40%] flex flex-col gap-3"
            }
          >
            <Input
              size="lg"
              label="Last Name"
              {...register("par_last_name", {
                required: "This field is required",
              })}
              className={""}
            />
            {errors.par_last_name && (
              <p className="text-red-900 text-xs px-2">
                {errors.par_last_name.message}
              </p>
            )}
          </div>
        </div>

        <div className={"flex flex-col md:flex-row gap-4 md:gap-3 w-full"}>
          <div
            className={
              "w-[95%] sm:w-[85%] md:[70%] lg:w-[40%] flex flex-col gap-1"
            }
          >
            <div className="flex  font-monte-1 relative">
              <span
                className={clsx({
                  " absolute inset-y-0 left-0 px-2 text-black flex items-center rounded bg-gray-300": true,
                  "border-r-2 border-black": isFocused,
                  "border-r border-gray-500": !isFocused,
                })}
              >
                +255
              </span>

              <Input
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onFocus={() => setIsFocused(true)}
                autoComplete="off"
                className=" text-black font-monte-1 pl-16 border focus:border-2 !border-t-blue-gray-200 focus:!border-t-gray-900"
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
              <p className="text-red-900 text-xs px-2">
                {errors.contact.message}
              </p>
            )}
          </div>
          <Controller
            control={control}
            rules={{ required: "This field is required" }}
            name="relation"
            render={({
              field: { onBlur, value, onChange },
              fieldState: { error },
            }) => (
              <div
                className={
                  "w-[95%] sm:w-[85%] md:[70%] lg:w-[40%] flex flex-col gap-3"
                }
              >
                <Select
                  size="lg"
                  onChange={onChange}
                  onBlur={onBlur}
                  selected={value}
                  value={value}
                  label="Relation with Child"
                  className=""
                  animate={{
                    mount: { y: 0 },
                    unmount: { y: 25 },
                  }}
                >
                  <Option className={"text-black font-monte-1"} value="Mother">
                    Mother
                  </Option>
                  <Option className={"text-black font-monte-1"} value="Father">
                    Father
                  </Option>
                  <Option
                    className={"text-black font-monte-1"}
                    value="Relative"
                  >
                    Relative
                  </Option>
                </Select>
                {error && (
                  <p className="text-red-900 text-xs px-2">{error.message}</p>
                )}{" "}
              </div>
            )}
          />
        </div>

        {isSubmitted && !isValid && (
          <p className="text-red-900 self-start text-xs px-2 md:px-4 lg:px-6 lg:text-sm py-2 md:py-6 bg-red-100 border border-red-900 rounded">
            Please make sure there are no errors in child form and parent form
          </p>
        )}
        <Button
          loading={loading}
          ripple={false}
          type="submit"
          className="bg-blue-900 rounded-[0.25rem] items-center justify-center flex text-white hover:opacity-60
                    w-[95%] sm:w-[86%] md:w-[100%] lg:w-[81.5%] xl:w-[81%]"
        >
          {loading ? "processing" : "submit"}
        </Button>
      </div>
    </Card>
  );
};

export default ParentGuardianForm;
