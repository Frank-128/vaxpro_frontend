import {
  Card,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { TextField } from "@mui/material";
import axios from "../axios";
import { useState } from "react";
import AutoCompleteSearch from "./AutoCompleteSearch";
import { Controller } from "react-hook-form";

const ChildRegistrationForm = ({ register, validate, errors, errTouched }) => {
  const [wards, setWards] = useState([]);
  const { clearErrors, setError, trigger, control } = errTouched;

  const handleWardChange = (event) => {
    const searchQuery = event.target.value;
    if (searchQuery) {
      axios.get(`wards?searchQuery=${searchQuery}`).then((res) => {
        if (res.status === 200) {
          setWards(res.data);
        }
      });
    }
  };

  const validateDate = (value) => {
    const selectedDate = new Date(value);
    const today = new Date();
    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0); // Set to midnight compare only the date part
    return selectedDate <= today || "Date should not exceed today's date";
  };

  const handleCardNoChange = async (e) => {
    const currentCardNo = e.target.value.trim();

    if (currentCardNo.length === 10) {
      const result = await trigger("card_no");
      if (result) {
        try {
          const res = await axios.get(`children?cardNo=${currentCardNo}`);
          if (res.status === 200) {
            if (
              res.data.length === 1 &&
              res.data[0].card_no === currentCardNo
            ) {
              setError("card_no", {
                type: "manual",
                message: "This child already exists",
              });
            } else {
              clearErrors("card_no");
            }
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }
  };

  return (
    <Card
      color="transparent "
      className="items-center w-full p-4 md:p-8"
      shadow={false}
    >
      <Typography className="md:text-xl self-start lg:text-2xl font-monte-1 text-black">
        Register New Child
      </Typography>


      <div className="flex rounded-md w-full flex-col md:pt-3 lg:pt-8 pt-2 gap-4 md:gap-6">
        <div className={"flex flex-col md:flex-row md:gap-3 gap-4"}>
          <div
            className={
              "w-[95%] sm:w-[85%] md:w-[70%] lg:w-[40%] flex flex-col gap-3"
            }
          >
            <Input
              size="lg"
              label="Card No"
              {...register("card_no", {
                required: "This field is required",
                maxLength: {
                  value: 10,
                  message: "Card no has to be ten numbers only",
                },
                minLength: {
                  value: 10,
                  message: "Card no has to be ten numbers only",
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Please enter valid number",
                },
                onChange: handleCardNoChange,
              })}
              className=""
            />
            {errors.card_no && (
              <span className="text-red-900 text-xs px-2 ">
                {errors.card_no.message}
              </span>
            )}
          </div>
          <div
            className={
              "w-[95%] sm:w-[85%] md:w-[70%] lg:w-[40%] flex flex-col gap-3"
            }
          >
            <Input
              size="lg"
              label="Birth Date"
              type="date"
              {...register("birth_date", {
                required: "This field is required",
                validate: validateDate,
              })}
              className=""
            />
            {errors.birth_date && (
              <span className="text-red-900 text-xs px-2">
                {errors.birth_date.message}
              </span>
            )}
          </div>
        </div>
        <div className={"flex flex-col md:flex-row md:gap-3 gap-4"}>
          <div
            className={
              "w-[95%] sm:w-[85%] md:w-[70%] lg:w-[40%] flex flex-col gap-3"
            }
          >
            <Input
              size="lg"
              label="First Name"
              {...register("first_name", {
                required: "This field is required",
              })}
              className=""
            />
            {errors.first_name && (
              <span className="text-red-900 text-xs px-2">
                {errors.first_name.message}
              </span>
            )}
          </div>

          <div
            className={
              "w-[95%] sm:w-[85%] md:w-[70%] lg:w-[40%] flex flex-col gap-3"
            }
          >
            <Input
              label="Middle Name"
              {...register("middle_name", {
                required: "This field is required",
              })}
              className=""
            />
            {errors.middle_name && (
              <span className="text-red-900 text-xs px-2">
                {errors.middle_name.message}
              </span>
            )}
          </div>
        </div>

        <div className={"flex flex-col md:flex-row md:gap-3 gap-4"}>
          <div
            className={
              "w-[95%] sm:w-[85%] md:w-[70%] lg:w-[40%] flex flex-col gap-3"
            }
          >
            <Input
              size="lg"
              label="Last Name"
              {...register("last_name", {
                required: "This field is required",
              })}
              className=""
            />
            {errors.last_name && (
              <span className="text-red-900 text-xs px-2">
                {errors.last_name.message}
              </span>
            )}
          </div>
          <div className={"w-[95%] sm:w-[85%] md:w-[70%] lg:w-[40%]"}>
            <Controller
              control={control}
              rules={{ required: "This field is required" }}
              name="gender"
              render={({
                field: { onBlur, value, onChange },
                fieldState: { error },
              }) => (
                <div className={"flex flex-col gap-3"}>
                  <Select
                    size="lg"
                    onChange={onChange}
                    onBlur={onBlur}
                    selected={value}
                    value={value}
                    label="Gender"
                    className=""
                    animate={{
                      mount: { y: 0 },
                      unmount: { y: 25 },
                    }}
                  >
                    <Option value="Male">Male</Option>
                    <Option value="Female">Female</Option>
                  </Select>
                  {error && (
                    <p className="text-red-900 text-xs px-2">{error.message}</p>
                  )}{" "}
                </div>
              )}
            />
          </div>
        </div>

        <div className={"flex flex-col w-full md:flex-row md:gap-3 gap-4"}>
          <div
            className={
              "w-[95%] sm:w-[85%] md:w-[50%] lg:w-[40%] flex flex-col gap-3"
            }
          >
            <Input
              size="lg"
              label="House No:"
              type="number"
              {...register("house_no", {
                required: "This field is required",
              })}
              className=""
            />
            {errors.house_no && (
              <span className="text-red-900 text-xs px-2">
                {errors.house_no.message}
              </span>
            )}
          </div>
          <div className={"w-[95%] sm:w-[85%] md:w-[50%] lg:w-[40%]"}>
            <AutoCompleteSearch name={"ward"} control={control} />
            {errors.ward_id && (
              <span className="text-red-900 text-xs">
                {errors.ward_id.message}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ChildRegistrationForm;
