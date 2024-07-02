"use client";

import AddUser from "@/modules/user/AddUser";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Button,
  Alert,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
  Tooltip,
  IconButton,
  Dialog,
  DialogBody,
  DialogFooter,
  Input,

} from "@material-tailwind/react";
import {
  Close,
  Delete,
  Edit,
  Person,
  Search,
  UnfoldMore,
  VisibilityOutlined,
} from "@mui/icons-material";
import globalAllUsers from "@/store/all_users";
import axios from "../../../../axios";
import globalUser from "@/store/user";
import { useInitial } from "@/constants/functions";
import { useForm } from "react-hook-form";
import globalAlert from "@/store/alert";
import clsx from "clsx";
import { document } from "postcss";

function UserManagement() {
  const { getInitialUsers } = useInitial();
  const [selectedRow, setSelectedRow] = useState({
    id: "",
    action: "",
    contacts: "",
  });
  const pathname = usePathname();
  const [subPathname, setSubPathname] = useState();
  const [addUserForm, setAddUserForm] = useState(false);
  const TABLE_ROWS = globalAllUsers((state) => state.allUsers);
  const authenticatedToken = globalUser((state) => state.authenticatedToken);
  const loggedInUser = globalUser((state) => state.loggedInUser);
  const setAlert = globalAlert((state) => state.setAlert);
  const [isFocused, setIsFocused] = useState();

  const formRef = useRef(null);

  const [TABLE_HEAD3, setTABLE_HEAD3] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isLoading },
  } = useForm();

  const [responseMessage, setResponseMessage] = useState({
    responseMessage: "",
    success: true,
  });


  useEffect(() => {
    pathname.split("/");
    setSubPathname(pathname.split("/")[2]);
  }, [pathname]);



  const TABLE_HEAD = React.useMemo(
    () => [
      {name:'N/C',accounts: ['default']},
      { name: "Role", accounts: ["default"] },
      { name: "Region", accounts: ["ministry"] },
      { name: "District", accounts: ["regional"] },
      { name: "Ward", accounts: ["district"] },
      { name: "Contacts", accounts: ["default"] },
      { name: "Actions", accounts: ["default"] },
    ],
    []
  );

  useEffect(() => {
    const TABLE_HEAD2 = TABLE_HEAD.filter(
      (head) =>
        head.accounts.includes("default") ||
        (head.accounts.includes(loggedInUser.role?.account_type) &&
          loggedInUser.role?.account_type !== subPathname)
    );
    setTABLE_HEAD3(TABLE_HEAD2);
  }, [TABLE_HEAD, loggedInUser, subPathname]);

  const userHandler = (user_id) => {
    axios
      .delete(`user/${user_id}`, {
        headers: {
          Authorization: `Bearer ${authenticatedToken}`,
        },
      })
      .then((res) => {
        setAlert({
          visible: true,
          message: "user deleted successfully",
          type: "success",
        });
        getInitialUsers();
      })
      .catch((err) => {
        setAlert({ visible: true, message: err.data.message, type: "error" });
      });
  };

  const submitUpdatedData = (data) => {
    axios
      .patch(
        `update_user/${selectedRow.id}`,
        {
          contacts: "+255" + data.contacts,
        },
        {
          headers: {
            Authorization: `Bearer ${authenticatedToken}`,
          },
        }
      )
      .then((res) => {
        getInitialUsers();

        setSelectedRow({
          ...selectedRow,
          id: "",
          action: "",
          contacts: "",
        });
        setAlert({ visible: true, message: res.data.message, type: "success" });

      })
      .catch((err) => {
        // setLoading(false);
        if (
          err?.response?.status === 400 &&
          err?.response?.data.error === "contacts"
        ) {
          setError("contacts", {
            type: err.status,
            message: err.response.data.message,
          });
        } else {
          // handleClose();
          setAlert({ visible: true, message: err.message, type: "error" });
        }
      });
  };

  return (
    <main>
      <div>
        <Card className="h-ful w-full font-monte p-6 border-t">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="font-monte-1"
                >
                  Accounts list
                </Typography>
                <Typography color="gray" className="mt-1 font-monte">
                  Table for
                  <span className="font-monte-1 capitalize">
                    {subPathname === "regional" ? (
                      <span>&nbsp;&nbsp;Regional Accounts</span>
                    ) : subPathname === "ministry" ? (
                      <span>&nbsp;&nbsp;Ministry Accounts</span>
                    ) : subPathname === "district" ? (
                      <span>&nbsp;&nbsp;District Accounts</span>
                    ) : subPathname === "community_health_worker" ? (
                      <span>&nbsp;&nbsp;Community Health Worker AccountS </span>
                    ) : subPathname === "branch_admin" ? (
                      <span>&nbsp;&nbsp;Branch Adminstrator AccountS</span>
                    ) : subPathname === "health_worker" ? (
                      <span>&nbsp;&nbsp;Health Worker Accounts</span>
                    ) : (
                      ""
                    )}
                  </span>
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row ">
                {/*<Button variant="outlined" size="sm" className="font-monte-1">*/}
                {/*  view all*/}
                {/*</Button>*/}
                <Button
                  className="flex bg-blue-900 items-center gap-3 font-monte-1 "
                  size="sm"
                  onClick={() => setAddUserForm(true)}
                >
                  <Person />
                  Add Account
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-end gap-4 md:flex-row">
              <div className="w-full md:w-72">
                <Input
                  className="font-monte"
                  label="Search"
                  icon={<Search />}
                />
              </div>
            </div>
          </CardHeader>
          <CardBody className="overflow-scroll px-0 ">
            <table className="mt-4 w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD3.map(({ name, accounts }, index) => (
                    <th
                      key={name}
                      className="cursor-pointer border-y border-blue-gray-100 text-ellipsis
                       bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="flex items-center   font-monte-1
                        justify-between gap-2  leading-none opacity-70"
                      >
                        {name}
                        {index !== TABLE_HEAD.length - 1 && <UnfoldMore />}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.filter((row) => {
                  row.role.account_type === subPathname;
                  if (
                    loggedInUser?.region_id !== null &&
                    row.role.account_type === subPathname &&
                    (loggedInUser?.region_id === row?.region_id ||
                      loggedInUser.region_id === row.district?.region_id)
                  ) {
                    return true;
                  } else if (
                    loggedInUser.district_id !== null &&
                    row.role.account_type === subPathname &&
                    loggedInUser.district_id === row.district_id
                  ) {
                    return true;
                  } else if (row.role.account_type === subPathname) {
                    return true;
                  }
                }).map(
                  ({ id, role, contacts, ward, region, district },index) => {
                    return (
                      <Fragment key={id}>
                        <tr className="border-b capitalize px-8 border-black">
                          <td className={""}>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-monte pl-4"
                            >
                              {index+1}
                            </Typography>
                          </td>
                          <td className={""}>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-monte"
                            >
                              {role.role}
                            </Typography>
                          </td>
                          {loggedInUser.role.account_type === "ministry" &&
                              subPathname === "regional" && (
                                  <td>{region?.region_name}</td>
                              )}

                          {loggedInUser.role.account_type === "regional" &&
                              subPathname === "district" && (
                                  <td>{district?.district_name}</td>
                              )}

                          {subPathname === "community_health_worker" && (
                              <td className={""}>
                                <div className="w-max">{ward?.ward_name}</div>
                              </td>
                          )}
                          <td>
                            <div>{contacts}</div>
                          </td>

                          <td className="flex justify-around">
                            <Tooltip content="Edit Account">
                              <IconButton
                                  variant="text"
                                  onClick={() => {
                                    clearErrors("contacts");
                                    setSelectedRow({
                                      id: id,
                                      action: "update",
                                      contacts: contacts,
                                    });
                                    setValue(
                                        "contacts",
                                        contacts.split("+255")[1]
                                    );
                                  }}
                              >
                                <Edit/>
                              </IconButton>
                            </Tooltip>
                            {/* <Tooltip content="View Account">
                              <IconButton
                                  variant="text"
                                  onClick={() =>
                                      setSelectedRow({id: id, action: "view"})
                                  }
                              >
                                <VisibilityOutlined/>
                              </IconButton>
                            </Tooltip> */}
                            {loggedInUser.id !== id ? (
                                <Tooltip content="Delete Account">
                                  <IconButton
                                      variant="text"
                                      onClick={() =>
                                          setSelectedRow({id: id, action: "delete"})
                                      }
                                  >
                                    <Delete/>
                                  </IconButton>
                                </Tooltip>
                            ) : (
                                <div className="w-10"></div>
                            )}
                          </td>
                        </tr>
                        {selectedRow.id === id &&
                            selectedRow.action === "update" && (
                                <tr
                                    key={id}
                                    className="capitalize w-full shadow-xl border border-1 bg-white py-3
                              rounded-xl flex justify-evenly items-center absolute left-0 z-50"
                            >
                              <td className="border-transparent">
                                <form
                                  ref={formRef}
                                  className=""
                                  onSubmit={handleSubmit(submitUpdatedData)}
                                >
                                  <div className="flex font-monte-1 relative">
                                    <span
                                      className={clsx(
                                          { " absolute inset-y-0 left-0 px-2 text-black flex items-center bg-gray-300":true,
                                          'border-r border-2 border-black': isFocused,
                                          "border-r border-gray-500":
                                            !isFocused,
                                        }
                                      )}
                                    >
                                      +255
                                    </span>

                                    <Input
                                      labelProps={{
                                        className:
                                          "before:content-none after:content-none",
                                      }}
                                      onFocus={() => setIsFocused(true)}
                                      autoComplete="off"
                                      className="text-black font-monte-1 pl-16 border focus:border-2 rounded-l-none !border-t-blue-gray-200 focus:!border-t-gray-900"
                                      size="lg"
                                      placeholder="Contacts"
                                      {...register("contacts", {
                                        onBlur: () => setIsFocused(false),
                                        required: "This field is required",
                                        maxLength: {
                                          value: 9,
                                          message:
                                            "Phone number should be exactly 9 digits",
                                        },
                                        minLength: {
                                          value: 9,
                                          message:
                                            "Phone number should be exactly 9 digits",
                                        },
                                        pattern: {
                                          value: /^[67][12345789][0-9]+$/,
                                          message: "Please enter valid number",
                                        },
                                      })}
                                      defaultValue={getValues("contacts")}
                                      onChange={(e) => {
                                        setValue("contacts", e.target.value, {shouldValidate:true})

                                      }}
                                    />
                                  </div>
                                  {errors.contacts && (
                                    <p className="text-red-900 text-xs font-monte">
                                      {errors.contacts.message}
                                    </p>
                                  )}
                                </form>
                              </td>

                              <td className="flex ">
                                <Button
                                  className="py-2 px-12 bg-black font-monte-1 "
                                  onClick={(e) => {
                                    if (formRef.current) {
                                      const event = new Event("submit", {
                                        cancelable: true,
                                        bubbles: true,
                                      });
                                      formRef.current.dispatchEvent(event);
                                    }
                                  }}
                                >
                                  edit
                                </Button>
                              </td>
                              <td
                                onClick={() => {
                                  setSelectedRow({
                                    ...selectedRow,
                                    id: "",
                                    action: "",
                                    contacts: "",
                                  });

                                }}
                                className="text-black hover:border hover:bg-gray-300 hover:rounded-xl hover:p-1 hover:cursor-pointer"
                              >
                                <Close fontSize="large" />
                              </td>
                            </tr>
                          )}
                      </Fragment>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
          {/* <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-monte-1"
            >
              Page 1 of 10
            </Typography>
            <div className="flex gap-2">
              <Button variant="outlined" size="sm">
                Previous
              </Button>
              <Button variant="outlined" size="sm">
                Next
              </Button>
            </div>
          </CardFooter> */}
        </Card>
      </div>

      {addUserForm && (
        <AddUser
          addUserForm={addUserForm}
          setAddUserForm={setAddUserForm}
          subPathname={subPathname}
          responeMessage={responseMessage}
          setResponseMessage={setResponseMessage}
        />
      )}



      <Dialog
        className="flex flex-col items-center bg-transparent shadow-none"
        size="xs"
        open={selectedRow.action === "delete"}
        handler={() => setSelectedRow({ id: "", action: "" })}
      >
        <Card className="md:p-4 p-2">
        <DialogBody className="font-monte-1 text-black">
          Confirm to delete this account
        </DialogBody>
        <DialogFooter className="flex md:gap-8 gap-4">
          <Button
            color=""
            className="font-monte-1"
            onClick={() => setSelectedRow({ id: "", action: "" })}
          >
            Cancel
          </Button>
          <Button
            color="green"
            className="font-monte-1"
            onClick={() => {
              userHandler(selectedRow.id);
              setSelectedRow({ action: "" });
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
        </Card>
      </Dialog>
    </main>
  );
}

export default UserManagement;
