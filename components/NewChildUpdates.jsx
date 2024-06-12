"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Input, Typography } from "@material-tailwind/react";
import { TextFields } from "@mui/icons-material";
import { UpdateSchedAccordion } from "./UpdateSchedAccordion";

const NewChildUpdates = ({
  openVacUpdate,
  handleCloseVaccUpdate,
  vaccines,
  
}) => {
  return (
    <Dialog
      open={openVacUpdate}
      className="-m-4"
      onClose={handleCloseVaccUpdate}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" className="font-bold">
        {"Update Vaccines"}
      </DialogTitle>
      <DialogContent className="scrollbar-hidden">
        <DialogContentText id="alert-dialog-description">
          <UpdateSchedAccordion  vaccines={vaccines} />
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default NewChildUpdates;
