"use client";
import {
  Button,
  Input,
  List,
  ListItem,
  Option,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import axios from "../../../axios";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import globalAlert from "@/store/alert";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const CommunityFeedback = () => {
  const [openReasonsForm, setOpenReasonsForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [facilityData, setFacility] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [facility, setShowFacility] = useState(null);
  const [res, setRes] = useState({ show: false, message: "" });

  const router = useRouter();

  const setAlert = globalAlert((state) => state.setAlert);

  const { control, handleSubmit, register, reset } = useForm();

  const handleOtherReasons = () => {
    setOpenReasonsForm(true);
  };

  const selectHospital = (facilityName) => {
    setShowFacility(facilityName);
  };

  const handleSearch = async (event) => {
    const searchQuery = event.target.value;
    setSearchTerm(searchQuery);

    if (searchQuery) {
      try {
        await axios.get(`/get_facility/${searchQuery}`).then((res) => {
          if (res.status === 200) {
            setFacility(res.data);
            console.log(res.data);
          } else if (res.status == 404) {
            setFacility([]);
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setFacility([]);
      }
    } else {
      setFacility([]);
    }
  };

  const handleSubmitInfo = (data) => {
    console.log(data);
    axios.post(`/submitFeedback`, { feedback: data }).then((res) => {
      if (res.data.status === 200) {
        setRes({ ...res, show: true, message: "Feedback sent successfully" });
        reset();
        setTimeout(() => {
          setRes({ ...res, show: false, message: "" });
        }, [4000]);
      }
    });
  };

  const handleLogout = () => {
    Cookies.remove("USER_TOKEN_CHW");
    setTimeout(() => {
      router.push("/chw_login");
    }, 2000);
  };

  const resetFacility = () => {
    setShowFacility(null);
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center">
      <Button
        onClick={handleLogout}
        className="flex bg-blue-900 self-end  w-fit m-2 rounded-md p-2"
      >
        sign out
      </Button>
      <div
        style={{
          backgroundImage: 'url("/images/unicef.jpeg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.2, // Adjust the opacity here
          zIndex: -1, // Ensures the background is behind the content
        }}
      />
      <div className="relative z-10 flex mt-20 flex-col justify-center items-center">
        <Typography
          style={{ fontWeight: "bold", fontSize: "24px" }}
          className="mt-10"
        >
          VaxPro
        </Typography>
        <span className="mt-12 font-bold">
          Fill in the form below to submit feedback:
        </span>
        <form
          onSubmit={handleSubmit(handleSubmitInfo)}
          className="flex mt-8 flex-col gap-4  w-full items-center justify-center "
        >
          <Controller
            name="child_card_no"
            control={control}
            rules={{ required: "Child Card Number is required" }}
            render={({ field, fieldState: { error } }) => (
              <div className=" w-80 lg:w-96">
                <Input
                  type="text"
                  label="Child Card Number"
                  {...field}
                  {...register("child_card_no", {
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
                />
                {error && (
                  <p className="text-red-900 text-xs font-monte">
                    {error.message}
                  </p>
                )}
              </div>
            )}
          />

          {!openReasonsForm && (
            <div className=" w-80 lg:w-96">
              <Controller
                control={control}
                rules={{ required: "This field is required" }}
                name="reason"
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
                      label="Select Reason"
                      animate={{
                        mount: { y: 0 },
                        unmount: { y: 25 },
                      }}
                    >
                      <Option value="Child has relocated to another area">
                        Child has relocated to another area
                      </Option>
                      <Option value="Parent forgot the vaccination date">
                        Parent forgot the vaccination date
                      </Option>
                      <Option onClick={handleOtherReasons}>Other</Option>
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
          )}
          {openReasonsForm && (
            <Controller
              name="otherReason"
              control={control}
              rules={{ required: "Reason is required" }}
              render={({ field, fieldState: { error } }) => (
                <div className=" w-80 lg:w-96">
                  <Textarea label="Write reason here" {...field} />
                  {error && (
                    <p className="text-red-900 text-xs font-monte">
                      {error.message}
                    </p>
                  )}
                </div>
              )}
            />
          )}

          <div className="flex flex-col justify-between">
            {facility != null ? (
              <Typography className="text-blue-700 font-bold w-80 lg:w-96">
                {facility}
              </Typography>
            ) : (
              <Controller
                name="facility_reg_no"
                control={control}
                rules={{ required: "Reason is required" }}
                render={({ field, fieldState: { error } }) => (
                  <div className=" w-80 lg:w-96">
                    <Input
                      type="text"
                      value={searchTerm}
                      onFocus={() => setIsDropdownVisible(true)}
                      onChange={(e) => {
                        handleSearch(e);
                        field.onChange(e.target.value);
                      }}
                      label="Hospital Reg Number"
                    />
                    {error && (
                      <p className="text-red-900 text-xs font-monte">
                        {error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            )}
            {isDropdownVisible &&
              facility == null &&
              facilityData.length > 0 && (
                <List className=" w-80 lg:w-96">
                  {facilityData.map((facility, index) => (
                    <ListItem
                      style={{ backgroundColor: "gray", color: "white" }}
                      onClick={() => selectHospital(facility.facility_name)}
                      key={index}
                    >
                      {facility.facility_name}
                    </ListItem>
                  ))}
                </List>
              )}
            {facility != null && (
              <Button
                style={{ backgroundColor: "blue" }}
                type="button"
                className="w-fit mt-2"
                onClick={resetFacility}
              >
                Re-select
              </Button>
            )}
          </div>
          <Button
            style={{ backgroundColor: "blue" }}
            disabled={facility == null}
            type="submit"
            className=" w-80 lg:w-96"
          >
            Send Feedback
          </Button>
        </form>
      </div>
      {res.show && (
        <div className="bg-green-300 w-2/6 h-20 rounded absolute top-10 flex justify-center items-center text-xs">
          {res.message}
        </div>
      )}
    </div>
  );
};

export default CommunityFeedback;
