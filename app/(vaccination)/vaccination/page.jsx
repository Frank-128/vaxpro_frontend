"use client";
import { Button, TextField } from "@mui/material";
import { Select, Option, Textarea } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import VaccinationReg from "@/components/VaccinationReg";
import VaccinationEdit from "@/components/VaccinationEdit";
import VaccinationDel from "@/components/VaccinationDel";
import axios from "../../../axios";
import globalVaccines from "@/store/vaccines";

const Vaccinaions = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openAddVaccine, setOpenAddVaccine] = useState(false);
  const [openDeleteVaccine, setCloseDeleteVaccine] = useState(false);
  const [vaccineId, setVaccineId] = useState(0);

  const [childVaccines, setVaccineFetch] = useState([]);
  const setVaccines = globalVaccines(state=>state.setVaccines)

  useEffect(() => {

    axios.get(`getVaccines`).then((res) => {

      if (res.data.status === 200) {
        setVaccines(res.data.vaccines)
        setVaccineFetch(res.data.vaccines);
      }
    });
  },[]);

  const handleClickOpenAddVacc = () => {
    setOpenAddVaccine(true);
  };

  const handleClickOpenEdit = (id) => {
    setOpenEdit(true);
    setVaccineId(id);
  };

  const handleClickCloseAddVacc = () => {
    setOpenAddVaccine(false);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleCloseDelete = () => {
    setCloseDeleteVaccine(false);
  };

  const handleOpenDelete = (id) => {
    setCloseDeleteVaccine(true);
    setVaccineId(id);
  };

  const notifyDeleteVaccine = (id) => {
    setVaccineFetch(childVaccines.filter(vaccine => vaccine.id !== id));
  };

  const notifyAddVaccine = (newVaccine) => {
    setVaccineFetch([...childVaccines, newVaccine]);
  };

  const notifyEditVaccine = (editedVaccine) => {
    setVaccineFetch(childVaccines.map(vaccine => vaccine.id === editedVaccine.id ? editedVaccine : vaccine ));
  }



  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-between w-full">
        <span className="font-bold mb-5 mt-5 4xs:flex 4xs:text-xs 3xs:text-lg 4xs:self-center xs:text-xl ">
          Vaccination Registration
        </span>
        <Button
          onClick={handleClickOpenAddVacc}
          className="bg-[#212B36] h-12 mt-2 text-white hover:bg-[#787a7c]"
        >
          Add Vaccine
        </Button>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S/No</TableCell>
              <TableCell>Vaccine Name</TableCell>
              <TableCell>Frequency</TableCell>
              <TableCell>First Dose After (days)</TableCell>
              <TableCell>Second Dose After (days)</TableCell>
              <TableCell>Third Dose After (days)</TableCell>
              <TableCell>Fourth Dose After (days)</TableCell>
              <TableCell>Fifth Dose After (days)</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {childVaccines.length > 0 ? (
              childVaccines.map((vaccine, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{vaccine.name}</TableCell>
                    <TableCell>{vaccine.frequency}</TableCell>
                    <TableCell>{vaccine.first_dose_after}</TableCell>
                    <TableCell>{vaccine.second_dose_after}</TableCell>
                    <TableCell>{vaccine.third_dose_after}</TableCell>
                    <TableCell>{vaccine.fourth_dose_after}</TableCell>
                    <TableCell>{vaccine.fifth_dose_after}</TableCell>
                    <TableCell className="flex gap-4">
                      <Button
                        onClick={() => handleClickOpenEdit(vaccine.id)}
                        className="bg-blue-200"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleOpenDelete(vaccine.id)}
                        className="bg-red-400 text-white"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow className=" mt-10">
                <TableCell
                  className="font-bold"
                  colSpan={12}
                  style={{ textAlign: "center" }}
                >
                  No Vaccines Found!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <VaccinationReg
        openAddVaccine={openAddVaccine}
        handleClickCloseAddVacc={handleClickCloseAddVacc}
        notifyAddVaccine={notifyAddVaccine}
      />
      <VaccinationEdit
        openEdit={openEdit}
        vaccineId={vaccineId}
        handleCloseEdit={handleCloseEdit}
        notifyEditVaccine={notifyEditVaccine}
      />
      <VaccinationDel
        vaccineId={vaccineId}
        openDeleteVaccine={openDeleteVaccine}
        handleCloseDelete={handleCloseDelete}
        notifyDeleteVaccine={notifyDeleteVaccine}
      />
    </div>
  );
};

export default Vaccinaions;
