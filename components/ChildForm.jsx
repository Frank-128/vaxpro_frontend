import { Card, Input, Option, Select, Typography } from "@material-tailwind/react";
import { TextField } from "@mui/material";
import axios from "../axios";
import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import AutoCompleteSearch from "./AutoCompleteSearch";
import { Controller } from "react-hook-form";



const ChildRegistrationForm = ({ register,validate, errors,errTouched }) => {
  const [wards, setWards] = useState([]);
  const {clearErrors,setError,trigger,control} = errTouched;

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
    today.setHours(0, 0, 0, 0); // Set to midnight to compare only the date part
    return selectedDate <= today || "Date should not exceed today's date";
  };
  

  const handleCardNoChange = async (e) => {
    const currentCardNo = e.target.value.trim();

    if (currentCardNo.length == 10) {
      const result = await trigger('card_no');
      if (result) {
        try {
          const res = await axios.get(`children?cardNo=${currentCardNo}`);
          if (res.status === 200) {
            if (res.data.length === 1 && res.data[0].card_no === currentCardNo) {
              setError('card_no', {
                type: 'manual',
                message: 'This child already exists'
              });
            } else {
              clearErrors('card_no');
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
      className="items-center sm:w-full "
      shadow={false}
    >
      <Typography className="4xs:text-sm  " variant="h4" color="blue-gray">
        Register Child
      </Typography>

      <div className="mt-8 mb-2 items-center sm:w-1/3  justify-center  max-w-screen-lg  ">
        <div className="mb-1 flex  2xs:w-72 xs:w-full rounded-md 2xs:p-4 3xs:w-56 4xs:w-32 2xs:ml-0 xs:ml-0 flex-col gap-6">
        

         <div>
         <Input
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
              onChange:handleCardNoChange
            })}
            className=" sm:w-56  lg:w-full "
          />
          {errors.card_no && (
            <span className="text-red-900 text-sm font-mono ">
              {errors.card_no.message}
            </span>
          )}
         </div>

         <div>
         <Input
            label="First Name"
            {...register("first_name", {
              required: "This field is required",
            })}
            className="  sm:w-56  lg:w-full "
          />
          {errors.first_name && (
            <span className="text-red-900 text-sm font-mono ">
              {errors.first_name.message}
            </span>
          )}
         </div>

         <div>
         <Input
            label="Middle Name"
            {...register("middle_name",{
              required:"This field is required"
            })}
            className="   sm:w-56 lg:w-full "
          />
          {errors.middle_name && (
            <span className="text-red-900 text-sm font-mono ">
              {errors.middle_name.message}
            </span>
          )}
         </div>

        <div>
        <Input
            label="Last Name"
            {...register("last_name",{
              required:"This field is required"
            })}
            className="  sm:w-56 lg:w-full "
          />
          {errors.last_name && (
            <span className="text-red-900 text-sm font-mono ">
              {errors.last_name.message}
            </span>
          )}
        </div>

          <div>
          <Input
            label="Birth Date"
            type="date"
            {...register("birth_date",{
              required:"This field is required",
              validate:validateDate
            })}
            className="  sm:w-56 lg:w-full "
          />
          {errors.birth_date && (
            <span className="text-red-900 text-sm font-mono ">
              {errors.birth_date.message}
            </span>
          )}

          </div>
          <div>
          <Controller
            control={control}
            rules={{ required: "This field is required" }}
            name="gender"
            render={({ field:{onBlur, value,onChange}, fieldState: { error } }) => (
              <div>
                <Select
                  onChange={onChange}
                  onBlur={onBlur}
                  selected={value}
                  value={value}
                  label="Gender"
                  className=" sm:w-64 pl-3 lg:w-full rounded-md  md:w-56"
                  animate={{
                    mount: { y: 0 },
                    unmount: { y: 25 },
                  }}
                >
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                 
                </Select>
                {error && (
                  <p className="text-red-900 text-xs font-monte">
                    {error.message}
                  </p>
                )}{" "}
              </div>
            )}
          />
          </div>
         <div>
         <Input
            label="House No:"
            type="number"
            {...register("house_no")}
            className="  sm:w-56 lg:w-full "
          />
         </div>

       <div>

          <AutoCompleteSearch name={"ward"} control={control} />
          {errors.ward_id && (
            <span className="text-red-900 text-sm font-mono ">
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
