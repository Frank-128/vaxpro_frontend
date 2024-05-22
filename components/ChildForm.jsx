import { Card, Typography } from "@material-tailwind/react";
import { TextField } from "@mui/material";
import axios from "../axios";
import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ChildRegistrationForm = ({ register }) => {
  const [wards, setWards] = useState([]);
  const [children, setChildren] = useState([]);
  const [cardNoInput, setCardNoInput] = useState(""); 
  const router = useRouter();
  const [selectedCard, setSelectedCard] = useState();

  const handleWardChange = (event) => {
    const searchQuery = event.target.value;
    if (searchQuery) {

      axios.get(`wards?searchQuery=${searchQuery}`).then((res) => {

        if (res.status === 200) {
          setWards(res.data);
        }
      });
    }
  };

  const handleCardNoChange = (cardNo) => {
    setCardNoInput(cardNo);
    if (cardNo) {
      axios.get(`children?cardNo=${cardNo}`).then((res) => {
        if (res.status === 200) {
          setChildren(res.data);
        }
      });
    }
  };

  return (
    <Card color="transparent " className="items-center sm:w-full " shadow={false}>
      <Typography className="4xs:text-sm  " variant="h4" color="blue-gray">
        Register Child
      </Typography>

      <div className="mt-8 mb-2 items-center sm:w-1/3  justify-center  max-w-screen-lg  ">
        <div className="mb-1 flex  2xs:w-72 xs:w-full rounded-md 2xs:p-4 3xs:w-56 4xs:w-32 2xs:ml-0 xs:ml-0 flex-col gap-6">
          <Autocomplete
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 sm:w-56 lg:w-full "
            options={children}
            freeSolo
            getOptionLabel={(option) => option.card_no.toString()} // Convert to string
            onInputChange={(event, newValue) => handleCardNoChange(newValue)} // Modified to pass newValue directly
            inputValue={cardNoInput} // Controlled input value
            onChange={(event, newValue) => setSelectedCard(newValue)}
            renderInput={(params) => (
              <TextField  {...params} label="Search Child Card No" />
            )}
            getOptionKey={(option) => option.card_no}
          />

          {selectedCard && (
           <Link
           href={{
             pathname: '/childdetails',
             query: { cardNo: selectedCard.card_no, birth_date: selectedCard.birth_date },
           }}
         >
           Go to Child
         </Link>
          )}

          <TextField
            label="Card No"
            {...register("card_no")}
            type="number"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 sm:w-56  lg:w-full "
          />

          <TextField
            label="First Name"
            {...register("first_name")}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 sm:w-56  lg:w-full "
          />

          <TextField
            label="Middle Name"
            {...register("middle_name")}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900  sm:w-56 lg:w-full "
          />

          <TextField
            label="Last Name"
            {...register("last_name")}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 sm:w-56 lg:w-full "
          />

          <TextField
            label="Birth Date"
            type="date"
            {...register("birth_date")}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 sm:w-56 lg:w-full "
          />

          <TextField
            label="House No:"
            type="number"
            {...register("house_no")}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 sm:w-56 lg:w-full "
          />

          <Autocomplete
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 sm:w-56 lg:w-full "
            options={wards}
            getOptionLabel={(option) =>
              `${option.ward_name}-${option.district.district_name}-${option.id}`
            }
            onInputChange={handleWardChange}
            renderInput={(params) => (
              <TextField {...params} label="Ward" {...register("ward_id")} />
            )}
            getOptionKey={(option) => option.id}
          />


        </div>
      </div>
    </Card>
  );
};

export default ChildRegistrationForm;
