"use client";
import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
// import { Select, Option, Textarea } from "@material-tailwind/react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "../axios";

const VaccinationEdit = ({
  openEdit,
  handleCloseEdit,
  vaccineId,
  notifyEditVaccine,
}) => {
  const [vaccineInputs, setVaccineInputs] = useState({
    name: "",
    frequency: "",
    vaccine_against: "",
    first_dose_after: "",
    second_dose_after: "",
    third_dose_after: "",
    fourth_dose_after: "",
    fifth_dose_after: "",
    administered_via: "",
    side_effects: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVaccineInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    axios.get(`getVaccine/` + vaccineId).then((res) => {
      if (res.data.status === 200) {
        console.log(res.data.vaccine);
        setVaccineInputs(res.data.vaccine);
      }
    });
  }, [vaccineId]);

  const updateVaccine = (e) => {
    e.preventDefault();

    axios.put(`updateVaccine/` + vaccineId, vaccineInputs).then((res) => {
      if (res.data.status === 200) {
        handleCloseEdit();
        notifyEditVaccine(res.data.vaccine);
      }
    });
  };

  return (
    <Dialog
      open={openEdit}
      className="-m-4"
      onClose={handleCloseEdit}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" className="font-bold">
        {"Edit Vaccine"}
      </DialogTitle>
      <DialogContent className="scrollbar-hidden">
        <DialogContentText id="alert-dialog-description">
          <form onSubmit={updateVaccine}>
            <TextField
              label="Vaccine Name"
              variant="outlined"
              required
              onChange={handleChange}
              value={vaccineInputs.name || ""}
              className="flex 4xs:w-40 self-center 4xs:text-xs 3xs:w-56 2xs:w-80 xs:w-96 "
              fullWidth
              type="text"
              name="name"
              margin="normal"
            />
            <TextField
              label="Frequency"
              variant="outlined"
              fullWidth
              required
              onChange={handleChange}
              value={vaccineInputs.frequency || ""}
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
              onChange={handleChange}
              value={vaccineInputs.first_dose_after || ""}
              type="number"
              className="flex 4xs:w-40 self-center 4xs:text-xs 3xs:w-56 2xs:w-80 xs:w-96"
              fullWidth
              name="first_dose_after"
              margin="normal"
            />

            <TextField
              label="Second Dose After"
              variant="outlined"
              placeholder="In days"
              onChange={handleChange}
              value={vaccineInputs.second_dose_after || ""}
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
              onChange={handleChange}
              value={vaccineInputs.third_dose_after || ""}
              type="number"
              className="flex 4xs:w-40 self-center 4xs:text-xs 3xs:w-56 2xs:w-80 xs:w-96"
              fullWidth
              name="third_dose_after"
              margin="normal"
            />
            <TextField
              label="Fourth Dose After"
              variant="outlined"
              onChange={handleChange}
              value={vaccineInputs.fourth_dose_after || ""}
              placeholder="In days"
              type="number"
              className="flex 4xs:w-40 self-center 4xs:text-xs 3xs:w-56 2xs:w-80 xs:w-96"
              fullWidth
              name="fourth_dose_after"
              margin="normal"
            />
            <TextField
              label="Fifth Dose After"
              variant="outlined"
              onChange={handleChange}
              value={vaccineInputs.fifth_dose_after || ""}
              placeholder="In days"
              type="number"
              className="flex 4xs:w-40 self-center 4xs:text-xs 3xs:w-56 2xs:w-80 xs:w-96"
              fullWidth
              name="fifth_dose_after"
              margin="normal"
            />

            <Button variant="contained" type="submit" className="w-full ">
              Update
            </Button>
          </form>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default VaccinationEdit;
