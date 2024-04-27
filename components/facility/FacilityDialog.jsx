"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Select,
  Option,
  Spinner,
} from "@material-tailwind/react";
import { HouseSharp } from "@mui/icons-material";
import { api_facilities, district_wards } from "@/constants";
import axios from "axios";

export default function FacilityDialog({setShowAlert}) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [wards,setWards] = useState([])
  const [facilityObject,setFacilityObject] = useState({});
  const handleOpen = () => setOpen((cur) => !cur);

  const handleSubmit = async () => {
    setLoading(true);
    console.log(facilityObject)
    await axios
      .post("http://localhost:8000/api/facility", facilityObject)
      .then((res) => {
        console.log(res.data);
        setShowAlert({status:true,type:"success",message:"Hospital facility created successfully"})

       
      })
      .catch((err) => {
        console.log(err);
        if(err.response.status == 400){

          setShowAlert({status:true,type:"error",message:"Hospital facility already exists"})
        }else{
          setShowAlert({status:true,type:"error",message:"Network error please try again later"})
        }

      });
      setOpen(false)
    setLoading(false);
     setTimeout(()=>{
      setShowAlert({status:false,type:"",message:""})
        },3000)
  };

  useEffect(()=>{
    const fetchWards = async()=>{
      await axios.get("http://localhost:8000/api/district_wards/13").then((res)=>{
        setWards(res.data)
       
      }).catch((err)=>{
        console.log(err)
      })
    }
    fetchWards()
  },[])

  

  return (
    <>
      <Button
        onClick={handleOpen}
        className="flex items-center sm:w-72 w-48 justify-items-center gap-3 bg-[#1d3472]"
        size="sm"
      >
        <HouseSharp />
        Add Facility
      </Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
     
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Add new facility
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Please fill out the form.
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Facility name
            </Typography>

            <Select onChange={(e)=>setFacilityObject({...facilityObject,facility_name:e.facility_name,facility_reg_no:e.facility_reg_no})} className="absolute mt-1" label="facility name">
              {api_facilities.map((item, index) => {
                return <Option key={index} value={item}>{item.facility_name}</Option>;
              })}
            </Select>
            <Typography className="-mb-2" variant="h6">
              Contacts
            </Typography>
            <Input onChange={(e)=>setFacilityObject({...facilityObject,contacts:e.target.value})} label="contacts" size="lg" />

            <Typography className="-mb-2" variant="h6">
              Ward
            </Typography>
            <Select  onChange={(e)=>setFacilityObject({...facilityObject,ward_id:e})} className="absolute mt-1" label="ward">
              {wards?.map((item, index) => {
                return <Option key={index} value={item.id}>{item.ward_name}</Option>;
              })}
            </Select>
          </CardBody>
          <CardFooter className="pt-0 ">
            <Button
              className="bg-[#1d3472] text-center"
              onClick={handleSubmit}
              disabled={facilityObject == {}}
              fullWidth
            >
              {!loading ? " Add facility" : <Spinner />}
            </Button>
          </CardFooter>
        </Card>
       
      </Dialog>
    </>
  );
}
