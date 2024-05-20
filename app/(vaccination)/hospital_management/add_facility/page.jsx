"use client";
import React, { useEffect, useState } from "react";
import {
  Stepper,
  Step,
  Button,
  Card,
  Input,
  Select,
  MenuItem,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import globalUser from "@/store/user";
import globalAddress from "@/store/address";
import globalAlert from "@/store/alert";
import { useRouter } from "next/navigation";


export default function DefaultStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const [showWard, setShowWard] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const wards = globalAddress((state) => state.wards);
  const [wards, setWards] = useState([]);
  const [wardName, setWardName] = useState("");
  const authenticatedToken = globalUser((state)=>state.authenticatedToken)
  const setAlert = globalAlert(state=>state.setAlert)
  const router = useRouter()


  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const { register, handleSubmit, getValues } = useForm();

  const submitForm = (data) => {
            axios.post(
          "http://localhost:8000/api/facility",{"facility_reg_no":data.facility_reg_no,"facility_name":data.facility_name,"contacts":data.contacts,"ward_id":data.ward_id}
        ).then((res)=>{
          axios.post('http://localhost:8000/api/register',{contacts:data.contacts,role_id:10,account_type:"branch_manager",facility_id:res.data.facility.facility_reg_no}, {
            headers: {
              Authorization: `Bearer ${authenticatedToken}`,
            }}).then((res2)=>{

              setAlert({message:"Facility created successfully",visible:true,type:"success"});
              router.push('/hospital_management')
              
          }).catch((err)=>{
            setAlert({message:"Facility not created, please try again",visible:true,type:"error"});

          })
          .catch((err) => {
            console.log("error occured when creating user", err);
          });
      })
      .catch((er) => {
        console.log("error occurred when creating hospital facility", er);
      });
  };

  return (
    <div className="w-full h-fit py-4 px-8 flex flex-col gap-4">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step
          completedClassName="!bg-gray-400 cursor-pointer"
          activeClassName="!bg-blue-900 cursor-pointer"
          onClick={() => setActiveStep(0)}
        >
          1
        </Step>
        <Step
          completedClassName="!bg-gray-400 cursor-pointer"
          activeClassName="!bg-blue-900 cursor-pointer"
          onClick={() => setActiveStep(1)}
        >
          2
        </Step>
        <Step
          completedClassName="!bg-gray-400 cursor-pointer"
          activeClassName="!bg-blue-900 cursor-pointer"
          onClick={() => setActiveStep(2)}
        >
          3
        </Step>
      </Stepper>
      <form onSubmit={handleSubmit(submitForm)}>
        <Card
          className={activeStep !== 0 ? "hidden" : "flex flex-col gap-8 p-5"}
        >
          <Input label="Facility Name" {...register("facility_name")} />
          <Input
            label="Facility Registration No"
            {...register("facility_reg_no")}
          />
        </Card>

        <Card
          className={activeStep !== 1 ? "hidden" : "flex flex-col gap-8 p-5"}
        >
          <Input label="Contacts" {...register("contacts")} />
          <Input label="Role" defaultValue={"Role - Branch admin"} disabled />
        </Card>

        <Card
          className={activeStep !== 2 ? "hidden" : "flex flex-col gap-8 p-5"}
        >
          <div className="relative">
            <Input
              value={searchQuery}
              className="relative"
              label="Ward"
              onFocus={() => setShowWard(true)}
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={() => setShowWard(true)}
            />
            <div
              className={
                !showWard
                  ? "opacity-0 hidden"
                  : "absolute flex flex-col gap-2 h-48 overflow-y-scroll bg-gray-200/90 w-full rounded  z-10"
              }
            >
              {wards?.map(({ ward_name, id }, index) => (
                <span
                  key={id}
                  className="hover:bg-gray-300 p-2 cursor-pointer "
                  onClick={() => {
                    setShowWard(false);
                    setSearchQuery(ward_name);
                    register("ward_id", {
                      value: id,
                      required: true,
                    });
                  }}
                >
                  {ward_name}
                </span>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            className="bg-blue-900 sm:w-1/2 w-3/4 self-center"
          >
            Save facility
          </Button>
        </Card>
      </form>
      <div className="mt-16 flex justify-between">
        <Button onClick={handlePrev} disabled={isFirstStep}>
          Prev
        </Button>
        <Button onClick={handleNext} disabled={isLastStep}>
          Next
        </Button>
      </div>
    </div>
  );
}
