"use client"
import {
    Dialog,
    DialogBody,
    DialogHeader,
    Input,
    Select,
    Option,
    DialogFooter,
    Button,
    Typography,
  } from "@material-tailwind/react";
  import { Close } from "@mui/icons-material";
  import React, { useState } from "react";
  
  const AddUser = () => {
    const [openDialog, setOpenDialog] = useState(false);
  
    const regions = ["Mbeya", "Dodoma", "others"];
    const districts = ["Temeke", "Ilala", "others"];
    const hospitals = ["Mlalakua", "Mpakani", "others"];
  
    const widthOfTheInput = 30;;;;
  
  
    const handleClose = () => {
      setOpenDialog(false);
    };
    return (
      <Dialog
        open={openDialog}
        handler={handleClose}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader className="flex justify-between items-center">
          <Typography className="text-black text-3xl font-bold">
            Add User
          </Typography>{" "}
          <Close fontSize="large" onClick={() => handleClose()} />
        </DialogHeader>
        <DialogBody className="flex flex-col gap-4">
          <Input size="lg" label="Role" className="bg-red-500 w-full" />
          <Select
            size="lg"
            label="Region"
            animate={{
              mount: { y: 0 },
              unmount: { y: 25 },
            }}
          >
            {regions.map((region, index) => (
              <Option key={index} className="text-black">
                {region}
              </Option>
            ))}
          </Select>
          <Select
            size="lg"
            label="District"
            animate={{
              mount: { y: 0 },
              unmount: { y: 25 },
            }}
          >
            {districts.map((district, index) => (
              <Option key={index} className="text-black">
                {district}
              </Option>
            ))}
          </Select>
          <Select
            size="lg"
            label="Hospital"
            animate={{
              mount: { y: 0 },
              unmount: { y: 25 },
            }}
          >
            {hospitals.map((hospital, index) => (
              <Option key={index} className="text-black">
                {hospital}
              </Option>
            ))}
          </Select>
          <Input size="lg" label="Phone Number" />
        </DialogBody>
        <DialogFooter>
          <Button>submit</Button>
        </DialogFooter>
      </Dialog>
    );
  };
  
  export default AddUser;
  