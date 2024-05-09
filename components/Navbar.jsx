"use client";
import React, { useEffect, useState } from "react";
import { Menu } from "@mui/icons-material";
import { Button, Input } from "@material-tailwind/react";
import globalUser from "@/store/user";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loading from "@/app/(vaccination)/loading";

function Navbar({ openSidebar, setOpenSidebar }) {
  const loggedInUser = globalUser((state) => state.loggedInUser);
  const [logoutDiolog, setLogoutDialog] = useState(false);
  const router = useRouter();
  const authenticatedToken = globalUser((state) => state.authenticatedToken);
  const [loading, setLoading] = useState(false);

  const logout = () => {
    setLoading(true);
    axios
      .post(`/api/logout`, null, {
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

  return (
    <nav
      className={`bg-white sticky left-0 top-0 p-2  h-20 z-10  flex items-center w-screen justify-between border-b-[0.5px] border-[#494747] transition-all duration-300 ${
        openSidebar
          ? "md:left-[280px] md:w-[calc(100vw-280px)] "
          : "md:left-0  "
      }`}
    >
      <div className="flex gap-2 items-center ">
        <Menu onClick={() => setOpenSidebar(!openSidebar)} />
        <Input label="search" />
      </div>
      <div className="flex gap-6 justify-center items-center capitalize">
        <div className="flex gap-2">
          <p>Level:</p>
          <h1 className=" md:block hidden font-monte-1">
            {loggedInUser.role?.account_type}
          </h1>
        </div>
        {loggedInUser.region_id &&
          loggedInUser.role.account_type === "regional" && (
            <div className="flex gap-2">
              <p>Region:</p>
              <h1 className=" md:block hidden font-monte-1">
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
          {loggedInUser.facility && (
            <div className="flex gap-3">
              {" "}
              <p>Facility:</p>
              <h1 className=" md:block hidden font-monte-1">
              {loggedInUser.facility?.facility_name}

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
          className="bg-white py-2 px-3 text-black border border-black font-monte-3"
          onClick={() => {
            setLogoutDialog(true);
          }}
        >
          sign out
        </Button>
      </div>

      <Dialog
        open={logoutDiolog}
        handler={() => setLogoutDialog(false)}
        size="xs"
      >
        <DialogHeader></DialogHeader>
        <DialogBody className="text-black font-monte-1">
          Are you sure you want to logout?
        </DialogBody>
        <DialogFooter className="flex gap-8">
          <Button
            className="bg-[#212b36]"
            onClick={() => {
              setLogoutDialog(false);
            }}
          >
            cancel
          </Button>
          <Button
            loading={loading}
            disabled={loading}
            className="bg-red-900"
            onClick={() => {
              logout();
            }}
          >
            {loading ? <span>logging out</span> : <span>logout</span>}
          </Button>
        </DialogFooter>
      </Dialog>
    </nav>
  );
}

export default Navbar;
