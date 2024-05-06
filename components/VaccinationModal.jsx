"use client";
import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { Checkbox } from "@material-tailwind/react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "../app/axios";

const VaccinationModal = ({ openAddVaccine, handleClickCloseAddVacc, notifyAddVaccine }) => {
  const [vaccines, setVaccines] = useState([]);

  useEffect(() => {
    axios.get(`/getVaccines`).then((res) => {
      if (res.data.status == 200) {
        console.log(res.data.vaccines)
        setVaccines(res.data.vaccines)
      }
    })
  }, [])


  const submitAddedVaccine = (e) => {
    e.preventDefault();
    axios.post(`/addChildVaccinnes`, formData).then((res) => {
      if (res.data.status === 200) {
        notifyAddVaccine(res.data.vaccine);

      }
    });
  };

  return (
    <Dialog
      open={openAddVaccine}
      className="-m-4"
      onClose={handleClickCloseAddVacc}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" className="font-bold">
        {"Add Vaccine"}
      </DialogTitle>
      <DialogContent className="scrollbar-hidden">
        <DialogContentText id="alert-dialog-description">
          <form onSubmit={submitAddedVaccine}>
            {vaccines.map((vaccine, index) => {
              return (
                <div key={vaccine.id} className="flex flex-col">
                <Checkbox label={vaccine.name} value={vaccine.id} />
              </div>
              )
            })}
            <Button
              variant="contained"
              type="submit"
              className="w-56 self-center bg-[#212B36] mt-5 4xs:w-40 3xs:w-56 2xs:w-80 xs:w-96 "
            >
              Add Vaccine(s)
            </Button>
          </form>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default VaccinationModal;
