"use client";
import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { Input, Select, Option } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller } from "react-hook-form";
import clsx from "clsx";
import axios from "../../../axios";
import { useSearchParams } from "next/navigation";
import globalAlert from "@/store/alert";
import { useRouter } from "next/navigation";
import AutoCompleteSearch from "@/components/AutoCompleteSearch";
import globalUser from "@/store/user";

const InfoUpdate = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    validate,
    setValue,
    getValues,
    defaultValue,
    watch,
    trigger,
    setError,
    formState: { errors, touchedFields, isValid, isSubmitted },
    control,
  } = useForm({
    defaultValues: {
      card_no: "",
      firstname: "",
      middlename: "",
      surname: "",
      gender: "",
      date_of_birth: "",
      ward_id: "",
      house_no: "",
      nida_id: "",
      parent_first_name: "",
      parent_middle_name: "",
      parent_last_name: "",
      relationship_with_child: "",
      contacts: "",
    },
  });

  const loggedInUser = globalUser((state) => state.loggedInUser);

  const router = useRouter();

  const searchParams = useSearchParams();
  const card_number = searchParams.get("cardNo");
  const [ward, setWard] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [originalNidaId, setOriginalNidaId] = useState(null);

  const [wards, setWards] = useState([]);

  useEffect(() => {
    axios.get(`/getChildData/${card_number}`).then((res) => {
      if (res.status === 200) {
        setWard(res.data[0].ward);
        const defaultValues = res.data.map((child) => ({
          card_no: child.card_no,
          firstname: child.firstname,
          middlename: child.middlename,
          gender: child.gender,
          surname: child.surname,
          date_of_birth: child.date_of_birth,
          ward: child.ward_id,
          gender: child.gender,
          house_no: child.house_no,
          nida_id: child.parents_guardians[0].nida_id,
          par_first_name: child.parents_guardians[0].firstname,
          par_middle_name: child.parents_guardians[0].middlename,
          par_last_name: child.parents_guardians[0].lastname,
          contacts: child.parents_guardians[0].user.contacts,
          relation: child.parents_guardians[0].pivot.relationship_with_child,

          // ... other fields
        }));

        if (defaultValues.length > 0) {
          setValue("card_no", defaultValues[0].card_no);
          setValue("first_name", defaultValues[0].firstname);
          setValue("middle_name", defaultValues[0].middlename);
          setValue("last_name", defaultValues[0].surname);
          setValue("house_no", defaultValues[0].house_no);
          setValue("ward_id", defaultValues[0].ward);

          setValue("gender", defaultValues[0].gender);
          setValue("birth_date", defaultValues[0].date_of_birth);
          setValue("nida_id", defaultValues[0].nida_id);
          setValue("par_first_name", defaultValues[0].par_first_name);
          setValue("par_middle_name", defaultValues[0].par_middle_name);
          setValue("par_last_name", defaultValues[0].par_last_name);
          setValue("contact", defaultValues[0].contacts);
          setValue("relation", defaultValues[0].relation);

          setOriginalNidaId(defaultValues[0].nida_id);

          // ... set other fields
        }
      }
    });
  }, [card_number, setValue]);

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
    today.setHours(0, 0, 0, 0);
    return selectedDate <= today || "Date should not exceed today's date";
  };

  const handleNidaChange = async (e) => {
    const nidaNo = e.target.value;
    try {
      if (nidaNo.length === 20) {
        const result = await trigger("nida_id");
        if (result) {
          const parentRes = await axios.get(`parents?nidaNo=${e.target.value}`);
          console.log(parentRes);

          if (parentRes.status === 200 && parentRes.data.length > 0) {
            const parentData = parentRes.data[0];

            setAvailableParent({ status: true, parent: parentData });
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitUpdates = (data) => {
    axios
      .post(`/updateChildParentInfo`, {
        child_parent_data: data,
        facility_id: loggedInUser?.facility_id,
        modified_by: loggedInUser?.id,
        original_card_no: card_number,
        original_nida_no: originalNidaId,
      })
      .then((res) => {
        if (res.data.message) {
          setAlert({
            message: res.data.message,
            visible: true,
            type: "success",
          });

          router.push(`/childdetails?cardNo=${res.data.child_card_number}`);
        } else {
          setAlert({ message: res.data.error, visible: true, type: "error" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitUpdates)}
      className="flex flex-col gap-4 items-center w-full justify-center "
    >
      <div className="font-bold">Child Information</div>
      <div className="flex gap-6 flex-col w-full lg:flex-row items-center justify-center lg:w-1/2 ">
        <div className="flex flex-col gap-3 w-full justify-center  items-center ">
          <div className="w-full sm:w-56 lg:w-64 md:w-56 xs:w-64">
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
              })}
              // className=" sm:w-56 lg:w-64 md:w-40 "
              //// containerProps={{ className: "4xs:min-w-72 " }}
            />
          </div>
          {errors.card_no && (
            <span className="text-red-900 text-sm font-mono ">
              {errors.card_no.message}
            </span>
          )}

          <div className="w-full sm:w-56 lg:w-64 md:w-56 xs:w-64">
            <Input
              label="First Name"
              {...register("first_name", {
                required: "This field is required",
              })}
              // className="  sm:w-56  lg:w-64 "
              // containerProps={{ className: "4xs:min-w-72 " }}
            />
          </div>
          {errors.first_name && (
            <span className="text-red-900 text-sm font-mono ">
              {errors.first_name.message}
            </span>
          )}

          <div className="w-full sm:w-56 lg:w-64 md:w-56 xs:w-64">
            <Input
              label="Middle Name"
              {...register("middle_name", {
                required: "This field is required",
              })}
              // className="   sm:w-56 lg:w-64 "
              // containerProps={{ className: "4xs:min-w-72 " }}
            />
          </div>
          {errors.middle_name && (
            <span className="text-red-900 text-sm font-mono ">
              {errors.middle_name.message}
            </span>
          )}

          <div className="w-full sm:w-56 lg:w-64 md:w-56 xs:w-64">
            <Input
              label="Last Name"
              {...register("last_name", {
                required: "This field is required",
              })}
              // className="  sm:w-56 lg:w-64 "
              // containerProps={{ className: "4xs:min-w-72 " }}
            />
          </div>
          {errors.last_name && (
            <span className="text-red-900 text-sm font-mono ">
              {errors.last_name.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3 w-full justify-center items-center ">
          <div className="w-full sm:w-56 lg:w-64 md:w-56 xs:w-64">
            <Input
              label="Birth Date "
              type="date"
              {...register("birth_date", {
                required: "This field is required",
                validate: validateDate,
              })}
              // className="  sm:w-56 lg:w-64 "
              // containerProps={{ className: "4xs:min-w-72 " }}
            />
          </div>
          {errors.birth_date && (
            <span className="text-red-900 text-sm font-mono ">
              {errors.birth_date.message}
            </span>
          )}

          <div className="w-full sm:w-56 lg:w-64 md:w-56 xs:w-64">
            <Input label="House No:" type="number" {...register("house_no")} />
          </div>

          <div className="w-full sm:w-56 lg:w-64 md:w-56 xs:w-64">
            <AutoCompleteSearch
              name={"ward_id"}
              control={control}
              ward={ward}
              register={register}
            />
          </div>
          {errors.ward_id && (
            <span className="text-red-900 text-sm font-mono ">
              {errors.ward_id.message}
            </span>
          )}

          <div className="w-full sm:w-56 lg:w-64 md:w-56 xs:w-64">
            <Controller
              control={control}
              rules={{ required: "This field is required" }}
              name="gender"
              render={({
                field: { onBlur, value, onChange },
                fieldState: { error },
              }) => (
                <div>
                  <Select
                    onChange={onChange}
                    onBlur={onBlur}
                    selected={value}
                    value={value}
                    label="Gender"
                    // className=" sm:w-64 pl-3 lg:w-64 rounded-md  md:w-56"
                    animate={{
                      mount: { y: 0 },
                      unmount: { y: 25 },
                    }}
                    // containerProps={{ className: "4xs:min-w-72 " }}
                  >
                    <Option value="Male">Male</Option>
                    <Option value="Female">Female</Option>
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
        </div>
      </div>

      <div className="font-bold">Parent / Guardian Information</div>

      <div className="flex gap-6 flex-col w-full lg:flex-row items-center justify-center lg:w-1/2 ">
        <div className="flex flex-col gap-3 w-full justify-center items-center ">
          <div className="w-full sm:w-56 lg:w-64 md:w-56 xs:w-64">
            <Input
              label="First Name"
              {...register("par_first_name", {
                required: "This field is required",
              })}
              // className="  md:w-56 lg:w-64  sm:w-64 "
              // containerProps={{ className: "4xs:min-w-72 " }}
            />
          </div>
          {errors.par_first_name && (
            <p className="text-red-900 text-xs font-monte">
              {errors.par_first_name.message}
            </p>
          )}

          <div className="w-full sm:w-56 lg:w-64 md:w-56 xs:w-64">
            <Input
              label="Middle Name"
              {...register("par_middle_name", {
                required: "This field is required",
              })}
              // className="  md:w-56 lg:w-64 sm:w-64 "
              // containerProps={{ className: "4xs:min-w-72 " }}
            />
          </div>
          {errors.par_middle_name && (
            <p className="text-red-900 text-xs font-monte">
              {errors.par_middle_name.message}
            </p>
          )}

          <div className="w-full sm:w-56 lg:w-64 md:w-56 xs:w-64">
            <Input
              label="Last Name"
              {...register("par_last_name", {
                required: "This field is required",
              })}
              // className="  md:w-56 lg:w-64  sm:w-64  "
              // containerProps={{ className: "4xs:min-w-72 " }}
            />
          </div>
          {errors.par_last_name && (
            <p className="text-red-900 text-xs font-monte">
              {errors.par_last_name.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-3 w-full justify-center items-center ">
          <div className="w-full sm:w-56 lg:w-64 md:w-56 xs:w-64">
            <Input
              defaultValue={getValues("nida_id")}
              onChange={(e) => setValue("nida_id", e.target.value)}
              label="Nida ID:"
              {...register("nida_id", {
                required: "This field is required",
                maxLength: {
                  value: 20,
                  message: "Nida number can not have more than 20 numbers",
                },
                minLength: {
                  value: 0,
                  message: "Nida number can not have less than 20 numbers",
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Please enter valid Nida number",
                },
                //   onChange: handleNidaChange,
              })}
              // className="  md:w-56 lg:w-64 sm:w-64 "
              // containerProps={{ className: "4xs:min-w-72 " }}
            />
          </div>
          {errors.nida_id && (
            <p className="text-red-900 text-xs font-monte">
              {errors.nida_id.message}
            </p>
          )}

          <div className="w-full sm:w-56 lg:w-64 md:w-56 xs:w-64">
            {/* <span
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

            */}

            <Input
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onFocus={() => setIsFocused(true)}
              autoComplete="off"
              // className="text-black font-monte-1 pl-16 border lg:w-64  focus:border-2  !border-t-blue-gray-200 focus:!border-t-gray-900"
              size="lg"
              placeholder="Contacts"
              // containerProps={{ className: "4xs:min-w-72 " }}
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

          <div className="w-full sm:w-56 lg:w-64 md:w-56 xs:w-64">
            <Controller
              control={control}
              rules={{ required: "This field is required" }}
              name="relation"
              render={({
                field: { onBlur, value, onChange },
                fieldState: { error },
              }) => (
                <div>
                  <Select
                    onChange={onChange}
                    onBlur={onBlur}
                    selected={value}
                    // containerProps={{ className: "4xs:min-w-72 " }}
                    value={value}
                    label="Relation with Child"
                    // className=" sm:w-64 pl-3 lg:w-64 rounded-md  md:w-56"
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
          </div>
        </div>
      </div>
      <button type="submit" className="p-2 rounded-md bg-[#212B36] w-64 text-white">
        Update
      </button>
    </form>
  );
};

export default InfoUpdate;
