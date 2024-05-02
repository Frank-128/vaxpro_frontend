"use client";

import AddUser from "@/modules/user/AddUser";
import React, { useEffect, useState } from "react";
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
  Avatar,
  Chip,
  Input,
  Tabs,
  Tab,
  TabsHeader,
} from "@material-tailwind/react";
import {
  Delete,
  Edit,
  Person,
  Search,
  UnfoldMore,
  VisibilityOutlined,
} from "@mui/icons-material";
import useAllUserGlobal from "@/store/all_users";

function UserManagement() {
  const pathname = usePathname();
  const [subPathname, setSubPathname] = useState();
  const [addUserForm, setAddUserForm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  var TABLE_ROWS = useAllUserGlobal((state) => state.allUsers);
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

  const TABLE_HEAD = ["Role", "Account type", "Contacts", "Created", "Actions"];
  console.log(TABLE_ROWS);

  return (
    <main>
      {/* <div className="flex justify-between">
        <span>User Management</span>
        <Button
          className="font-monte-1"
          onClick={() => setAddUserForm(!addUserForm)}
        >
          Add user
        </Button>
      </div> */}

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
                  See information about all members
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
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <Tabs value="all" className="w-full md:w-max">
                <TabsHeader>
                  {TABS.map(({ label, value }) => (
                    <Tab key={value} value={value}>
                      &nbsp;&nbsp;{label}&nbsp;&nbsp;
                    </Tab>
                  ))}
                </TabsHeader>
              </Tabs>
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
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={head}
                      className="cursor-pointer border-y border-blue-gray-100 text-ellipsis
                       bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="flex items-center   font-monte-1
                        justify-between gap-2  leading-none opacity-70"
                      >
                        {head}
                        {index !== TABLE_HEAD.length - 1 && <UnfoldMore />}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map(
                  (
                    {
                      role,
                      role_id,
                      contacts,
                      email,
                      job,
                      org,
                      created_at,
                      date,
                    },
                    index
                  ) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={name} className="border-b p-8 border-black">
                        <td className={""}>
                          <div className="flex items-center gap-3">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-monte"
                            >
                              {role.role}
                            </Typography>
                          </div>
                        </td>
                        <td className={"classes"}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {role.account_type}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {org}
                            </Typography>
                          </div>
                        </td>
                        <td className={"classes"}>
                          <div className="w-max">{contacts}</div>
                        </td>
                        <td className={"classes"}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-monte"
                          >
                            {created_at}
                          </Typography>
                        </td>
                        <td className={" flex justify-between"}>
                          <Tooltip content="Edit User">
                            <IconButton variant="text">
                              <Edit />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="View User">
                            <IconButton variant="text">
                              <VisibilityOutlined />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="Delete User">
                            <IconButton variant="text">
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </td>
                      </tr>
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
          subPathname={subPathname}
          responeMessage={responseMessage}
          setResponseMessage={setResponseMessage}
          setShowAlert={setShowAlert}
        />
      )}
      <Alert
        className="z-50"
        open={showAlert}
        onClose={() => {
          setShowAlert(false);
        }}
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
        color={responseMessage.success ? "green" : "red"}
      >
        {responseMessage.responseMessage}
      </Alert>
    </main>
  );
}

export default UserManagement;
