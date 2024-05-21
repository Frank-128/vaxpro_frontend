"use client";
import { Button } from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "../axios";

const VaccinationDel = ({
  openDeleteVaccine,
  handleCloseDelete,
  vaccineId,
  notifyDeleteVaccine,

}) => {



  const handleDeleteVaccine = (e, id) => {
    e.preventDefault();


    axios.delete(`deleteVaccine/` + id).then((res) => {

      if (res.data.status === 200) {
        console.log(res.data.message);
        handleCloseDelete();

        notifyDeleteVaccine(id);
      }
    });
  };

  return (
    <Dialog
      open={openDeleteVaccine}
      onClose={handleCloseDelete}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle className="text-red-600" id="alert-dialog-title">
        {"Delete Vaccine!"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this Vaccine?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          className=" hover:text-black text-white bg-red-400"
          onClick={(e) => handleDeleteVaccine(e, vaccineId)}
        >
          Delete
        </Button>
        <Button
          className="bg-blue-400 hover:text-black text-white"
          onClick={handleCloseDelete}
          autoFocus
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VaccinationDel;
