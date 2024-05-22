"use client"
import React, { useState } from 'react'

import { Edit, Error, HouseSharp, LocalHospital, PersonAdd, Search, Verified } from '@mui/icons-material';

import { FACILITY_ROWS } from '@/constants';
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
  Alert,
  Spinner,
} from "@material-tailwind/react";
import FacilityDialog from '@/components/facility/FacilityDialog';
import { useEffect } from 'react';
import axios from "../../../axios";
import Link from 'next/link';
import globalUser from '@/store/user';
 
const TABLE_HEAD = ["Facility Reg No", "Facility Name", "Location", "Contacts", ""];
 

  
 
 export default function FacilityTable() {

    const [searchTerm,setSearchTerm] = useState("")
    const [facilities,setFacilities] = useState(null)
    const [showAlert,setShowAlert] = useState({status:false,type:"",message:""})
    const [interval,setInterval] = useState(0)
    const loggedInUser = globalUser(state=>state.loggedInUser)
    const filteredArray = facilities?.filter((item)=>item.facility_name.toLowerCase().replace(/\s/g, "").includes(searchTerm.toLowerCase()) || searchTerm == "" )

    useEffect(()=>{
      const fetchDistrictFacilites = async()=>{
        await axios.get('district_facilities/'+loggedInUser?.district_id).then((res)=>{
        console.log(res.data) 
        setFacilities(res.data)
        }).catch((err)=>{
          console.log(err)
        })
      }
      fetchDistrictFacilites()
    },[])
  return (
       <section className='h-full w-full flex justify-center items-center p-4'>
    <Card className="w-11/12  h-5/6 overflow-x-scroll">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-2 flex md:flex-row flex-col items-center justify-between  md:gap-8">
          <div>
            <Typography className='md:text-xl lg' color="blue-gray">
              Facility list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal md:block hidden">
              See information about all facilities
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 m-2 p-2 sm:flex-row">
          <Input
              size='md'
              label="Search"
              icon={<Search className="h-5 w-5" />}
              onChange={(e)=>setSearchTerm(e.target.value)}
              
            />
         <Link href={'/hospital_management/add_facility'}>
         <Button
        
        className="flex items-center sm:w-72 w-48 justify-items-center gap-3 bg-[#1d3472]"
        size="sm"
      >
        <HouseSharp />
        Add Facility
      </Button>
         </Link>
          </div>
        </div>
       
      </CardHeader>
      <CardBody color='red' className="px-0">
        <table className="w-full min-w-max table-auto overflow-x-scroll text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {facilities == null ? <tr><Spinner /> </tr>: filteredArray?.length == 0 ? <i className='p-2'>There are no records available</i> : filteredArray?.splice(interval,5).map(
              ({  facility_reg_no,facility_name,contacts,region,district }, index) => {
                const isLast = index === FACILITY_ROWS?.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr className='overflow-x-scroll w-full hover:bg-black/10 cursor-pointer' key={index}>
                    <td className={classes}>
                      
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {facility_reg_no}
                          </Typography>
                         
                    </td>
                    <td className={classes}>
                      
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                         {facility_name}
                      </Typography>
                     
                    
                  </td>
                    <td className={classes}>
                      
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {region + ", "+ district}
                        </Typography>
                       
                      
                    </td>
                    
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {contacts}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit facility">
                        <IconButton variant="text">
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Add branch admin">
                        <IconButton variant="text">
                          <PersonAdd />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of {
            FACILITY_ROWS?.length % 5 == 0 ? FACILITY_ROWS?.length/ 5 : Math.ceil(FACILITY_ROWS?.length / 5)
          } 
         
        </Typography>
        <div className="flex gap-2">
          <Button disabled={interval < 1} onClick={()=>{  setInterval(interval-5)}} variant="outlined" size="sm">
            Previous
          </Button>
          <Button disabled={interval > filteredArray?.length || interval === filteredArray?.length} onClick={()=>{  setInterval(interval+5)}} variant="outlined" size="sm">
            Next
          </Button>
        </div>
       
      </CardFooter>
     
    </Card>

  
   </section>
  );
}