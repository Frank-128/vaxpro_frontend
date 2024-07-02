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
  Typography,
} from "@material-tailwind/react";
import { Close } from "@mui/icons-material";
import React, { useState } from "react";
import globalUser from "@/store/user";
import { useForm, Controller } from "react-hook-form";
import axios from "../../axios";
import globalAddress from "@/store/address";
import globalRoles from "@/store/roles";
import { useInitial } from "@/constants/functions";
import globalAlert from "@/store/alert";
import clsx from "clsx";

const AddUser = ({ addUserForm, setAddUserForm, subPathname }) => {
  const [loading, setLoading] = useState(false);
  const [existingUser, setExistingUser] = useState({
    error: false,
    message: "",
  });
  const loggedInUser = globalUser((state) => state.loggedInUser);
  const authenticatedToken = globalUser((state) => state.authenticatedToken);
  const regions = globalAddress((state) => state.regions);
  const roles = globalRoles((state) => state.roles);
  const { initialRequest } = useInitial();
  const districts = globalAddress((state) => state.districts);
  const setAlert = globalAlert((state) => state.setAlert);
  const wards = globalAddress((state) => state.wards);
  const [isFocused, setIsFocused] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm();

  const handleClose = () => {
    setAddUserForm(false);
    setExistingUser({ error: false, message: "" });
  };

  const innerWidth = typeof window !== "undefined" && window.innerWidth ;

  const registerUser = (data) => {
    setLoading(true);
    var data2 = [];

    data2 = {
      ...data,
      account_type: subPathname,
      contacts: "+255" + data.contacts,
    };

    if (loggedInUser.role.account_type === "regional") {
      data2 = {
        ...data2,
        region_id: loggedInUser.region_id,
      };
    } else if (loggedInUser.role.account_type === "district") {
      data2 = {
        ...data2,
        district_id: loggedInUser.district_id,
      };
    } else if (loggedInUser.role.account_type === "branch_manager") {
      data2 = {
        ...data2,
        facility_id: loggedInUser.facility_id,
      };
    } else if (loggedInUser.role.account_type === "branch_manager") {
      data2 = {
        ...data2,
        facility_id: loggedInUser.facility_id,
      };
    }

    // console.log(data2, "the data to be submitted");

      axios
        .post(`register`, data2, {
          headers: {
            Authorization: `Bearer ${authenticatedToken}`,
          },
        })
        .then((res) => {
          console.log(res.data, "datasssss");
          initialRequest();
          setLoading(false);
          if (res.data.status === 200) {
            setAlert({
              visible: true,
              message: res.data.message,
              type: "success",
            });
            handleClose();
          } else if (res.data.status === 401) {
            setAlert({
              visible: true,
              message: "Unauthenticated please log in",
              type: "error",
            });
          } else if (res.data.status === 409) {
            setExistingUser({ message: res.data.message, error: true });
          }
        }).catch((err)=>{

          setLoading(false);
          console.log(err)
          if(err?.response?.status === 400 && err?.response?.data.error === "contacts"){
            setError('contacts',{type:err.status,message:err.response.data.message});
          }
          else{
            handleClose();
            setAlert({ visible: true, message: err.message, type: "error" });
          }
        }

        );
    }


console.log(errors)
  return (
    <Dialog
      className={`font-monte ${innerWidth<768 &&'flex  justify-center'}`}
      open={addUserForm}
      size={innerWidth>768 ? "sm" : "xxl"}
      handler={handleClose}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <form onSubmit={handleSubmit(registerUser)}>
        <DialogHeader className="flex justify-between items-center">
          <Typography className="text-black text-2xl font-bold">
            Create New Account
          </Typography>
          <Close fontSize="large" onClick={() => handleClose()} />
        </DialogHeader>
        <DialogBody className={`flex flex-col gap-3 `}>
          {existingUser.error && (
            <p
              className="p-2 border border-red-900 rounded bg-gradient-to-r from-red-300 to-red-500
             flex justify-center text-xs text-white font-monte-1 "
            >
              {existingUser.message}
            </p>
          )}

          {/* roles  */}
          {(loggedInUser.role.account_type === "ministry" ||
            "regional" ||
            "district") && (
            <Controller
              control={control}
              rules={{ required: "This field is required" }}
              name="role_id"
              render={({
                field: { onChange, onBlur, value, ref },
                fieldState: { error },
              }) => (
                <div className="font-monte-1">
                  <Select
                    className="text-black font-monte-1"
                    onChange={onChange}
                    onBlur={onBlur}
                    onFocus={() =>
                      setExistingUser({ error: false, message: "" })
                    }
                    selected={value}
                    value={value}
                    size="lg"
                    label="Role"
                    animate={{
                      mount: { y: 0 },
                      unmount: { y: 25 },
                    }}
                  >
                    {roles
                      .filter(({ role, account_type }) => {
                        /*
                          account type === subPathname returns all the roles in the respective level
                          example all roles in the ministry,or region according to the pathname

                          loggedInUser.role.account_type == subPathname checks to see if the logged in
                          user is actually the account is of the ministry level for example

                        */
                        if (
                          // loggedInUser.role.account_type !== "district"
                          // ?
                          account_type === subPathname &&
                          loggedInUser.role.account_type === subPathname
                          // :
                          // account_type === subPathname
                        ) {
                          return loggedInUser.role?.role !== role;
                        } else if (
                          account_type === subPathname &&
                          loggedInUser.role.role === role
                        ) {
                          console.log("entered here so wasup");
                          return true;
                        } else if (
                          account_type === "community_health_worker" &&
                          subPathname === "community_health_worker"
                        ) {
                          return true;
                        } else if (
                          account_type == "health_worker" &&
                          subPathname === "health_worker"
                        ) {
                          return true;
                        }
                      })
                      .map(({ role, id }) => (
                        <Option
                          key={id}
                          className="text-black font-monte-1"
                          value={id}
                        >
                          {role}
                        </Option>
                      ))}
                  </Select>

                  {error && (
                    <p className="text-red-900 text-xs font-monte">
                      {error.message}
                    </p>
                  )}
                </div>
              )}
            />
          )}

          {loggedInUser.role.account_type === "ministry" &&
            subPathname === "regional" && (
              <Controller
                control={control}
                rules={{ required: "This field is required" }}
                name="region_id"
                render={({
                  field: { onChange, onBlur, value, ref },
                  fieldState: { error },
                }) => (
                  <div className="font-monte-1 text-black">
                    <Select
                      className="text-black font-monte-1"
                      onChange={onChange}
                      onBlur={onBlur}
                      selected={value}
                      value={value}
                      size="lg"
                      label="Region"
                      animate={{
                        mount: { y: 0 },
                        unmount: { y: 25 },
                      }}
                    >
                      {regions.map(({ region_name, id }, index) => (
                        <Option
                          key={index}
                          className="text-black font-monte-1"
                          value={id}
                        >
                          {region_name}
                        </Option>
                      ))}
                    </Select>

                    {error && (
                      <p className="text-red-900 text-xs font-monte">
                        {error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            )}

          {loggedInUser.role.account_type === "regional" &&
            subPathname === "district" && (
              <Controller
                control={control}
                rules={{ required: "This field is required" }}
                name="district_id"
                render={({
                  field: { onChange, onBlur, value, ref },
                  fieldState: { error },
                }) => (
                  <div className="font-monte-1 text-black">
                    <Select
                      className="text-black font-monte-1"
                      onChange={onChange}
                      onBlur={onBlur}
                      selected={value}
                      value={value}
                      size="lg"
                      label="District"
                      animate={{
                        mount: { y: 0 },
                        unmount: { y: 25 },
                      }}
                    >
                      {districts.map(({ district_name, id }, index) => (
                        <Option
                          key={index}
                          className="text-black font-monte-1"
                          value={id}
                        >
                          {district_name}
                        </Option>
                      ))}
                    </Select>

                    {error && (
                      <p className="text-red-900 text-xs font-monte">
                        {error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            )}

          {loggedInUser.role.account_type === "district" && (
            <Controller
              control={control}
              rules={{ required: "This field is required" }}
              name="ward_id"
              render={({
                field: { onChange, onBlur, value, ref },
                fieldState: { error },
              }) => (
                <div className="font-monte-1 text-black">
                  <Select
                    className="text-black font-monte-1"
                    onChange={onChange}
                    onBlur={onBlur}
                    selected={value}
                    value={value}
                    size="lg"
                    label="Ward"
                    animate={{
                      mount: { y: 0 },
                      unmount: { y: 25 },
                    }}
                  >
                    {wards.map(({ ward_name, id }, index) => (
                      <Option
                        key={index}
                        className="text-black font-monte-1"
                        value={id}
                      >
                        {ward_name}
                      </Option>
                    ))}
                  </Select>

                  {error && (
                    <p className="text-red-900 text-xs font-monte">
                      {error.message}
                    </p>
                  )}
                </div>
              )}
            />
          )}

          {loggedInUser.role.account_type === "branch_manager" && (
            <>
              <div className="font-monte-1">
                <Input
                  className="text-black font-monte-1"
                  size="lg"
                  label="Staff Id"
                  {...register("staff_id", { required: true })}
                />
                {errors.staff_id && (
                  <p className="text-red-900 text-xs font-monte">
                    This field is required
                  </p>
                )}
              </div>
              <div className="font-monte-1">
                <Input
                  className="text-black font-monte-1"
                  size="lg"
                  label="First Name"
                  {...register("first_name", { required: true })}
                />
                {errors.first_name && (
                  <p className="text-red-900 text-xs font-monte">
                    This field is required
                  </p>
                )}
              </div>
              <div className="font-monte-1">
                <Input
                  className="text-black font-monte-1"
                  size="lg"
                  label="Last Name"
                  {...register("last_name", { required: true })}
                />
                {errors.last_name && (
                  <p className="text-red-900 text-xs font-monte">
                    This field is required
                  </p>
                )}
              </div>
            </>
          )}
          <div className="">
            <div className="flex font-monte-1 relative">
              <span
                className={clsx({
                  " absolute inset-y-0 left-0 px-2 text-black flex items-center bg-gray-300":true,
                  "border-r-2 border-black": isFocused,
                  "border-r border-gray-500": !isFocused,
                }
                )}
              >
                +255
              </span>

              <Input
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onFocus={() => setIsFocused(true)}
                autoComplete="off"
                className="text-black font-monte-1 pl-16 border focus:border-2 rounded-l-none !border-t-blue-gray-200 focus:!border-t-gray-900"
                size="lg"
                placeholder="Contacts"
                {...register("contacts", {
                  onBlur: ()=>setIsFocused(false),
                  required: "This field is required",
                  maxLength: {
                    value: 9,
                    message: "Phone number should be exactly 9 digits",
                  },
                  minLength: {
                    value: 9,
                    message: "Phone number should be exactly 9 digits",
                  },
                  pattern: {
                    value: /^[67][12345789][0-9]+$/,
                    message: "Please enter valid number",
                  },
                })}
              />
            </div>
            {errors.contacts && (
              <p className="text-red-900 text-xs font-monte">
                {errors.contacts.message}
              </p>
            )}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button loading={loading} className="font-monte-1" type="submit">
            submit
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
};

export default AddUser;
