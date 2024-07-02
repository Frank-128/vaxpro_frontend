"use client";
import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Select, Option, Textarea, Input } from "@material-tailwind/react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import axios from "../axios";

const VaccinationReg = ({
  openAddVaccine,
  handleClickCloseAddVacc,
  notifyAddVaccine,
}) => {
  const [vaccine_name, setVaccineName] = useState("");
  const [frequency, setFrequency] = useState("");
  const [vaccine_against, setVaccineAgainst] = useState("");
  const [first_dose, setFirstDose] = useState("");
  const [second_dose, setSecondDose] = useState("");
  const [third_dose, setThirdDose] = useState("");
  const [fourth_dose, setFourthDose] = useState("");
  const [fifth_dose, setFifthDose] = useState("");
  const [admin_via, setAdminVia] = useState("");
  const [side_effects, setSideEffects] = useState("");

  const submitVaccine = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("vaccine_name", vaccine_name);
    formData.append("frequency", frequency);
    formData.append("vaccine_against", vaccine_against);
    formData.append("first_dose_after", first_dose);
    formData.append("second_dose_after", second_dose);
    formData.append("third_dose_after", third_dose);
    formData.append("fourth_dose_after", fourth_dose);
    formData.append("fifth_dose_after", fifth_dose);
    formData.append("admin_via", admin_via);
    formData.append("side_effects", side_effects);

    axios.post(`createVaccine`, formData).then((res) => {
      if (res.data.status === 200) {
        setVaccineName("");
        setVaccineAgainst("");
        setFrequency("");
        setFirstDose("");
        setSecondDose("");
        setThirdDose("");
        setFourthDose("");
        setFifthDose("");
        setAdminVia("");
        setSideEffects("");
        handleClickCloseAddVacc();

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
          <form onSubmit={submitVaccine}>
            <TextField
              label="Vaccine Name"
              variant="outlined"
              required
              className="flex 4xs:w-40 self-center 4xs:text-xs 3xs:w-56 2xs:w-80 xs:w-96 "
              fullWidth
              onChange={(e) => setVaccineName(e.target.value)}
              value={vaccine_name}
              type="text"
              name="vaccine_name"
              margin="normal"
            />
            <TextField
              label="Frequency"
              variant="outlined"
              fullWidth
              onChange={(e) => setFrequency(e.target.value)}
              value={frequency}
              required
              className="flex 4xs:w-40 self-center 4xs:text-xs 3xs:w-56  2xs:w-80 xs:w-96"
              name="frequency"
              type="number"
              margin="normal"
            />

            <TextField
              label="First Dose After"
              variant="outlined"
              required
              placeholder="In days"
              type="number"
              onChange={(e) => setFirstDose(e.target.value)}
              value={first_dose}
              className="flex 4xs:w-40 self-center 4xs:text-xs 3xs:w-56 2xs:w-80 xs:w-96"
              fullWidth
              name="first_dose_after"
              margin="normal"
            />

            <TextField
              label="Second Dose After"
              variant="outlined"
              placeholder="In days"
              onChange={(e) => setSecondDose(e.target.value)}
              value={second_dose}
              type="number"
              className="flex 4xs:w-40 self-center 4xs:text-xs 3xs:w-56 2xs:w-80 xs:w-96"
              fullWidth
              name="second_dose_after"
              margin="normal"
            />

            <TextField
              label="Third Dose After"
              variant="outlined"
              placeholder="In days"
              onChange={(e) => setThirdDose(e.target.value)}
              value={third_dose}
              type="number"
              className="flex 4xs:w-40 self-center 4xs:text-xs 3xs:w-56 2xs:w-80 xs:w-96"
              fullWidth
              name="third_dose_after"
              margin="normal"
            />
            <TextField
              label="Fourth Dose After"
              variant="outlined"
              placeholder="In days"
              onChange={(e) => setFourthDose(e.target.value)}
              value={fourth_dose}
              type="number"
              className="flex 4xs:w-40 self-center 4xs:text-xs 3xs:w-56 2xs:w-80 xs:w-96"
              fullWidth
              name="fourth_dose_after"
              margin="normal"
            />
            <TextField
              label="Fifth Dose After"
              variant="outlined"
              placeholder="In days"
              onChange={(e) => setFifthDose(e.target.value)}
              value={fifth_dose}
              type="number"
              className="flex 4xs:w-40 self-center 4xs:text-xs 3xs:w-56 2xs:w-80 xs:w-96"
              fullWidth
              name="fifth_dose_after"
              margin="normal"
            />

            <Button variant="contained" type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default VaccinationReg;
