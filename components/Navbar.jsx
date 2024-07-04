"use client";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "@mui/icons-material";
import { Button, Input } from "@material-tailwind/react";
import globalUser from "@/store/user";
import axios from "../axios";

import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
  Typography,
  CardFooter,
  CardBody,
  Checkbox,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import Loading from "@/app/(vaccination)/loading";
import AsyncSelect from "react-select/async";

function Navbar({ openSidebar, setOpenSidebar }) {
  const loggedInUser = globalUser((state) => state.loggedInUser);
  const [logoutDiolog, setLogoutDialog] = useState(false);
  const router = useRouter();
  const authenticatedToken = globalUser((state) => state.authenticatedToken);
  const [searchChild, setSearchChild] = useState(null);
  const [loading, setLoading] = useState(false);
  const selectRef = useRef(null);

  const [deviceWidth, setDeviceWidth] = useState(typeof window === "undefined" ? 500 : window?.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setDeviceWidth(window.innerWidth);
    };


    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,

      width: deviceWidth > 700 ? 350 : deviceWidth > 400 ? 300 : 200,
      outline: "none",
      boxShadow: state.isFocused ? "0 0 0 1px black" : "none",
      "&:hover": {
        boxShadow: "0 0 0 1px black",
      },
    }),
    menu: (provided) => ({
      ...provided,
      width: deviceWidth > 700 ? 350 : deviceWidth > 400 ? 300 : 200,
      zIndex: 50,

      backgroundColor: "white",
    }),
  };

  const handleSelectedChild = (selectedChild) => {
    router.push(`/children/childdetails/${selectedChild?.value}`);
    setSearchChild(null);
  };

  const loadOptions = async (inputValue, callback) => {
    try {
      const response = await axios.get("children", {
        params: {
          cardNo: inputValue,
        },
      });
      const data = response.data;

      if (data) {
        const formattedOptions = data.map((item) => ({
          value: item.card_no,
          label: item.firstname + " " + item.surname + "--" + item.card_no,
        }));

        callback(formattedOptions);
      }
    } catch (error) {
      console.error("Error fetching data", error);
      callback([]);
    }
  };

  const logout = () => {
    setLoading(true);
    axios
      .post(`logout`, null, {
        headers: {
          Authorization: `Bearer ${authenticatedToken}`,
        },
      })
      .then((res) => {
        setTimeout(() => {
          router.push("/signin");
          setLoading(false);
        }, 2000);

        console.log(res.data, "LOGOUT ERROR");
      });
  };

  const handleOpen = () => {
    setLogoutDialog(false);
  };

  return (
    <nav
      className={`bg-white sticky left-0 top-0 p-2 h-20 z-10 flex-col md:flex-row flex justify-center items-start  lg:items-center w-screen lg:justify-between border-b-[0.5px] border-[#494747] transition-all duration-300 ${
        openSidebar
          ? "md:left-[280px] md:w-[calc(100vw-280px)] "
          : "md:left-0  "
      }`}
    >
      <div className="flex gap-2 md:px-0 px-4 items-center">
        <Menu onClick={() => setOpenSidebar(!openSidebar)} />
        { (loggedInUser?.role?.account_type === "branch_manager" ||  loggedInUser?.role?.account_type === "health_worker") && <AsyncSelect
          value={searchChild}
          styles={customStyles}
          loadOptions={loadOptions}
          onChange={handleSelectedChild}
          placeholder="Search the child here"
        />}
      </div>

      {loggedInUser ? (
        <div className="hidden xl:flex gap-6 justify-center items-center capitalize">
          <div className="flex gap-2">
            <p>Level:</p>
            <h1 className=" md:block hidden font-monte-1">
              {
                 loggedInUser.role?.account_type.split('_').slice().join(' ')}
            </h1>
          </div>
          {loggedInUser.region_id &&
            loggedInUser.role.account_type === "regional" && (
              <div className="flex gap-2">
                <p>Region:</p>

                <h1 className="md:block hidden font-monte-1">
                  {loggedInUser.region.region_name}
                </h1>
              </div>
            )}
          {loggedInUser.district_id && (
            <div className="text-sm">
              <div className="flex gap-2">
                <p>District:</p>

                <h1 className=" md:block hidden font-monte-1">
                  {loggedInUser.district?.district_name}
                </h1>
              </div>
              <div className="flex gap-2">
                <p> Region:</p>
                <h1 className=" md:block hidden font-monte-1">
                  {loggedInUser.district?.region.region_name}
                </h1>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-2">
            {loggedInUser.facilities && (
              <div className="flex gap-3">
                {" "}
                <p>Facility:</p>
                <h1 className=" md:block hidden font-monte-1">
                  {loggedInUser.facilities?.facility_name}
                </h1>
              </div>
            )}
            <div className="flex gap-3">
              <p>Role:</p>

              <h1 className=" md:block hidden font-monte-1">
                {loggedInUser.role?.role}
              </h1>
            </div>
          </div>

          <Button
            className=" py-2 px-6 bg-blue-900 rounded-[0.25rem]
           text-white border border-blue-900  shadow-none"
            onClick={() => {
              setLogoutDialog(true);
            }}
            ripple={false}
          >
            sign out
          </Button>
        </div>
      ) : (
        <div className=" hidden lg:flex w-4/12 h-full justify-center items-center">
          <Loading />
        </div>
      )}

      <Dialog
        size="xs"
        open={logoutDiolog}
        handler={handleOpen}
        className="bg-transparent shadow-none "
      >
        <Card className="mx-auto w-full max-w-[24rem] rounded-[0.35rem]">
          <CardBody className="flex flex-col font-monte-1 text-black gap-4">
            Are you sure you want to logout?
          </CardBody>
          <CardFooter className="pt-0 flex justify-end items-center gap-4">
            <Button
              loading={loading}
              disabled={loading}
              className="bg-red-900 rounded-[0.25rem] "
              onClick={() => {
                logout();
              }}
            >
              {loading ? <span>logging out</span> : <span>logout</span>}
            </Button>
            <Button
              className="text-white bg-[#212b36] rounded-[0.25rem] "
              onClick={() => {
                setLogoutDialog(false);
              }}
            >
              cancel
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </nav>
  );
}

export default Navbar;
