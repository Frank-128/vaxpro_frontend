"use client";

import AddUser from "@/modules/user/AddUser";
import React, { Fragment, useEffect, useState } from "react";
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
  DialogHeader,
  DialogBody,
  DialogFooter,
  Chip,
  Input,
  Tabs,
  Tab,
  TabsHeader,
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
import axios from "axios";
import globalUser from "@/store/user";
import { useInitial } from "@/constants/functions";
import { useForm } from "react-hook-form";
import globalAlert from "@/store/alert";

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

  const [TABLE_HEAD3, setTABLE_HEAD3] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [responseMessage, setResponseMessage] = useState({
    responseMessage: "",
    success: true,
  });

  useEffect(() => {
    pathname.split("/");
    setSubPathname(pathname.split("/")[2]);
  }, [pathname]);

  const TABS = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Monitored",
      value: "monitored",
    },
    {
      label: "Unmonitored",
      value: "unmonitored",
    },
  ];

  const TABLE_HEAD = React.useMemo(
    () => [
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
      .delete(`api/user/${user_id}`, {
        headers: {
          Authorization: `Bearer ${authenticatedToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
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

  const handleUpdateChange = (e) => {
    const value = e.target.value;

    setSelectedRow({
      ...selectedRow,
      contacts: e.target.value,
    });
  };

  const submitUpdatedData = () => {
    axios
      .patch(
        `update_user/${selectedRow.id}`,
        {
          contacts: selectedRow.contacts,
        },
        {
          headers: {
            Authorization: `Bearer ${authenticatedToken}`,
          },
        }
      )
      .then((res) => {
        getInitialUsers();
        console.log(res.data);
        setSelectedRow({
          ...selectedRow,
          id: "",
          action: "",
          contacts: "",
        });
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
                  Members list
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
                <Button variant="outlined" size="sm" className="font-monte-1">
                  view all
                </Button>
                <Button
                  className="flex items-center gap-3 font-monte-1 "
                  size="sm"
                  onClick={() => setAddUserForm(true)}
                >
                  <Person />
                  Add member
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-end gap-4 md:flex-row">
              {/* <Tabs value="all" className="w-full md:w-max">
                <TabsHeader>
                  {TABS.map(({ label, value }) => (
                    <Tab key={value} value={value}>
                      &nbsp;&nbsp;{label}&nbsp;&nbsp;
                    </Tab>
                  ))}
                </TabsHeader>
              </Tabs> */}
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
                  ({ id, role, contacts, ward, region, district }, index) => {
                    return (
                      <Fragment key={id}>
                        <tr className="border-b capitalize px-8 border-black">
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

                          <td className="flex justify-between">
                            <Tooltip content="Edit Account">
                              <IconButton
                                variant="text"
                                onClick={() => {
                                  setSelectedRow({
                                    id: id,
                                    action: "update",
                                    contacts: contacts,
                                  });
                                }}
                              >
                                <Edit />
                              </IconButton>
                            </Tooltip>
                            <Tooltip content="View Account">
                              <IconButton
                                variant="text"
                                onClick={() =>
                                  setSelectedRow({ id: id, action: "view" })
                                }
                              >
                                <VisibilityOutlined />
                              </IconButton>
                            </Tooltip>
                            {loggedInUser.id !== id ? (
                              <Tooltip content="Delete Account">
                                <IconButton
                                  variant="text"
                                  onClick={() =>
                                    setSelectedRow({ id: id, action: "delete" })
                                  }
                                >
                                  <Delete />
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
                                <Input
                                  className="bg-gray-400 border border-transparent outline-none focus:outline-none "
                                  value={selectedRow?.contacts}
                                  onChange={handleUpdateChange}
                                />
                              </td>

                              <td className="flex ">
                                <Button
                                  className="py-2 px-12 bg-black font-monte-1"
                                  onClick={() => {
                                    submitUpdatedData();
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
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
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
          </CardFooter>
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
        className="flex flex-col items-center"
        size="xs"
        open={selectedRow.action === "delete"}
        handler={() => setSelectedRow({ id: "", action: "" })}
      >
        <DialogBody className="font-monte-1 text-black">
          Confirm to delete this account
        </DialogBody>
        <DialogFooter className="flex gap-8">
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
      </Dialog>
    </main>
  );
}

export default UserManagement;
