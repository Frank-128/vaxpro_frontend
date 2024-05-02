"use client";
import {
  Dialog,
  DialogBody,
  DialogHeader,
  Input,
  Select,
  Option,
  DialogFooter,
  Button,
  Alert,
  Typography,
} from "@material-tailwind/react";
import { Close } from "@mui/icons-material";
import React, { useState } from "react";
import useGlobal from "@/store/user";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

const AddUser = ({
  subPathname,
  responseMessage,
  setResponseMessage,
  setShowAlert,
}) => {
  const [openDialog, setOpenDialog] = useState(true);
  const [loading, setLoading] = useState(false);

  const loggedInUser = useGlobal((state) => state.loggedInUser);
  const authenticatedToken = useGlobal((state) => state.authenticatedToken);
  const [region, setRegion] = useState();
  const [district, setDistrict] = useState();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const regions = ["Mbeya", "Dodoma", "others"];
  const districts = ["Temeke", "Ilala", "others"];
  const hospitals = ["Mlalakua", "Mpakani", "others"];

  const handleClose = () => {
    setOpenDialog(false);
  };

  const registerUser = (data) => {
    setLoading(true);
    if (loggedInUser.role_id === "1000-1") {
      const data2 = { ...data, account_type: subPathname };
      try {
        axios
          .post(`/api/register`, data2, {
            headers: {
              Authorization: `Bearer ${authenticatedToken}`,
            },
          })
          .then((res) => {
            console.log(res.data,"datasssss")
            setLoading(false);
            setOpenDialog(false);
            if (res.data.status === 200) {
              setResponseMessage({
                responseMessage: res.data.message,
                success: true,
              });
              setShowAlert(true);
            } else if (res.data.status === 401) {
              setResponseMessage({
                responseMessage: res.data.message,
                success: false,
              });
              setShowAlert(true);
            }
          });
      } catch (err) {
        setLoading(false);
        setResponseMessage({
          responseMessage: "Unknown error occured",
          success: false,
        });
        setShowAlert(true);
      }
    }
  };
  return (
    <Dialog
      className={`font-monte-3`}
      open={openDialog}
      size="sm"
      handler={handleClose}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <form onSubmit={handleSubmit(registerUser)} className={`font-monte`}>
        <DialogHeader className="flex justify-between items-center">
          <Typography className="text-black text-3xl font-monte-1">
            Add User
          </Typography>
          <Close fontSize="large" onClick={() => handleClose()} />
        </DialogHeader>
        <DialogBody className={`flex flex-col gap-3 `}>
          <Input
            size="lg"
            label="Role"
            className={`bg-red-500 w-full font-monte`}
            {...register("role", { required: true })}
          />
          {errors.role && (
            <p className="text-red-900 text-xs">This field is required</p>
          )}

          {loggedInUser.role.account_type === "ministry" &&
            subPathname === "regional" && (
              <Controller
                control={control}
                rules={{ required: "This field is required" }}
                name="region"
                render={({
                  field: { onChange, onBlur, value, ref },
                  fieldState: { error },
                }) => (
                  <>
                    <Select
                      onChange={onChange}
                      onBlur={onBlur}
                      selected={value}
                      value={value}
                      size="lg"
                      label="Region"
                      // error={error.region ? 'This field is required' : ''}
                      animate={{
                        mount: { y: 0 },
                        unmount: { y: 25 },
                      }}
                    >
                      {regions.map((region, index) => (
                        <Option
                          key={index}
                          className="text-black"
                          value={region}
                        >
                          {region}
                        </Option>
                      ))}
                    </Select>

                    {error && (
                      <p className="text-red-900 text-xs">{error.message}</p>
                    )}
                  </>
                )}
              />
            )}

          {loggedInUser.role.account_type === "regional" && (
            <Select
              size="lg"
              label="District"
              animate={{
                mount: { y: 0 },
                unmount: { y: 25 },
              }}
              {...register("district")}
            >
              {districts.map((district, index) => (
                <Option key={index} className="text-black">
                  {district}
                </Option>
              ))}
            </Select>
          )}

          {loggedInUser.role.account_type === "district" && (
            <Select
              size="lg"
              label="Hospital"
              animate={{
                mount: { y: 0 },
                unmount: { y: 25 },
              }}
              {...register("facility")}
            >
              {hospitals.map((hospital, index) => (
                <Option key={index} className="text-black">
                  {hospital}
                </Option>
              ))}
            </Select>
          )}

          <Input size="lg" label="Contacts" {...register("contacts", {required:true})} />
          {errors.contacts && (
            <p className="text-red-900 text-xs">This field is required</p>
          )}
        </DialogBody>
        <DialogFooter>
          <Button loading={loading} type="submit">
            submit
          </Button>
        </DialogFooter>
      </form>
      {/* <Alert color={responseMessage.success ? "green":"red"}  >{responseMessage.responeMessage}</Alert> */}
    </Dialog>
  );
};

export default AddUser;
