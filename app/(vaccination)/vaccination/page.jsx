"use client";
import React, { useEffect, useState } from "react";

import { Card, Typography, Button } from "@material-tailwind/react";
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
  const setVaccines = globalVaccines((state) => state.setVaccines);

  useEffect(() => {
    axios.get(`getVaccines`).then((res) => {
      if (res.data.status === 200) {
        setVaccines(res.data.vaccines);
        setVaccineFetch(res.data.vaccines);
      }
    });
  }, []);

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
    setVaccineFetch(childVaccines.filter((vaccine) => vaccine.id !== id));
  };

  const notifyAddVaccine = (newVaccine) => {
    setVaccineFetch([...childVaccines, newVaccine]);
  };

  const notifyEditVaccine = (editedVaccine) => {
    setVaccineFetch(
      childVaccines.map((vaccine) =>
        vaccine.id === editedVaccine.id ? editedVaccine : vaccine
      )
    );
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-between w-full">
        <span className="font-bold mb-5 mt-5 4xs:flex 4xs:text-xs 3xs:text-lg 4xs:self-center xs:text-xl ">
          Vaccination Registration
        </span>
        <Button
          onClick={handleClickOpenAddVacc}
          className="bg-blue-900 h-12 mt-2 text-white hover:bg-[#787a7c]"
        >
          Add Vaccine
        </Button>
      </div>
      <Card className="h-full w-full overflow-scroll m-4">
        <table className="w-full min-w-max table-auto text-center">
          <thead className="border-b h-12 bg-blue-gray-50 p-4">
            <tr>
              <th className="w-1/9 p-2 font-bold">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold leading-none opacity-70"
                >
                  S/No
                </Typography>
              </th>
              <th className="w-1/9 p-2 font-bold">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold leading-none opacity-70"
                >
                  Vaccine Name
                </Typography>
              </th>
              <th className="w-1/9 p-2 font-bold">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold leading-none opacity-70"
                >
                  Frequency
                </Typography>
              </th>
              <th className="w-1/9 p-2 font-bold">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold leading-none opacity-70"
                >
                  1st Dose After
                </Typography>
              </th>
              <th className="w-1/9 p-2 font-bold">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold leading-none opacity-70"
                >
                  2nd Dose After
                </Typography>
              </th>
              <th className="w-1/9 p-2 font-bold">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold leading-none opacity-70"
                >
                  3rd Dose After
                </Typography>
              </th>
              <th className="w-1/9 p-2 font-bold">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold leading-none opacity-70"
                >
                  4th Dose After
                </Typography>
              </th>
              <th className="w-1/9 p-2 font-bold">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold leading-none opacity-70"
                >
                  5th Dose After
                </Typography>
              </th>
              <th className="w-1/9 p-2 font-bold">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold leading-none opacity-70"
                >
                  Action
                </Typography>
              </th>
            </tr>
          </thead>

          <tbody>
            {childVaccines.length > 0 ? (
              childVaccines.map((vaccine, index) => {
                return (
                  <tr
                    key={index}
                    className={`odd:bg-gray-100 even:bg-gray-200`}
                  >
                    <td className="p-4 w-1/9">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {index + 1}
                      </Typography>
                    </td>
                    <td className="p-4 w-1/9">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {vaccine.name}
                      </Typography>
                    </td>
                    <td className="p-4 w-1/9">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {vaccine.frequency}
                      </Typography>
                    </td>
                    <td className="p-4 w-1/9">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {vaccine.first_dose_after}
                      </Typography>
                    </td>
                    <td className="p-4 w-1/9">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {vaccine.second_dose_after}
                      </Typography>
                    </td>
                    <td className="p-4 w-1/9">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {vaccine.third_dose_after}
                      </Typography>
                    </td>
                    <td className="p-4 w-1/9">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {vaccine.fourth_dose_after}
                      </Typography>
                    </td>
                    <td className="p-4 w-1/9">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {vaccine.fifth_dose_after}
                      </Typography>
                    </td>
                    <td className="p-4 w-1/9 flex gap-2">
                      <Button
                        onClick={() => handleClickOpenEdit(vaccine.id)}
                        className="bg-blue-500 w-24"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleOpenDelete(vaccine.id)}
                        className="bg-red-400 w-24"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className=" mt-10">
                <td
                  className="font-bold"
                  colSpan={12}
                  style={{ textAlign: "center" }}
                >
                  No Vaccines Found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
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
