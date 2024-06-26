"use client";
import axios from "../axios";
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import clsx from "clsx";
import { useInitial } from "@/constants/functions";
import { useIdle } from "react-use";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import globalAlert from "@/store/alert";
import { Alert } from "@material-tailwind/react";
import { Error, Verified } from "@mui/icons-material";
import globalUser from "@/store/user";
import { useEcho } from "@/constants/echo";
import { Howl } from "howler";

function Main({ children }) {
  const { initialRequest, getInitialUsers, getBookings, getRoles } =
    useInitial();
  const [openSidebar, setOpenSidebar] = useState(true);
  const isIdle = useIdle(1000 * 60 * 60 * 2);
  const router = useRouter();
  const alertObj = globalAlert((state) => state.alert);
  const authenticatedToken = globalUser((state) => state.authenticatedToken);
  const echo = useEcho();
  const loggedInUser = globalUser((state) => state.loggedInUser);
  const setAlert = globalAlert((state) => state.setAlert);

  const sound = new Howl({
    src: ["/sound/new_message.wav"],
  });

  useEffect(() => {
    if (echo) {
      echo
        .private(`booking.${loggedInUser?.facilities?.facility_reg_no}`)
        .listen("BookingEvent", (event) => {
          sound.play();
          setAlert({
            message: event.message,
            visible: true,
            type: "success",
          });
          console.log("Real time event received", event);
        });
    }
  }, [echo, loggedInUser?.id]);

  useEffect(() => {
    initialRequest();
  }, [initialRequest]);

  useEffect(() => {
    getInitialUsers();
    getBookings();
    getRoles();
  }, [getBookings, getInitialUsers, getRoles]);

  // useEffect(() => {
  //     if(echo){
  //         echo.channel(`testChannel`).listen('testingEvent',event=>{
  //           console.log('Real time event received',event)
  //         })
  //       }
  // }, [echo]);

  useEffect(() => {
    if (isIdle) {
      Cookies.remove("USER_TOKEN");
      axios
        .post(`logout`, null, {
          headers: {
            Authorization: `Bearer ${authenticatedToken}`,
          },
        })
        .then((res) => {
          return router.push("/signin");
        });
    }
  }, [authenticatedToken, isIdle, router]);

  console.log(loggedInUser);

  return (
    <main>
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <section
        className={clsx("z-10 p-5 max-h-[calc(100vh-80px)] overflow-y-scroll", {
          "ml-[280px]": openSidebar,
          "ml-0": !openSidebar,
        })}
      >
        {children}
      </section>
      <Alert
        open={alertObj?.visible}
        icon={alertObj?.type === "success" ? <Verified /> : <Error />}
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
        color={alertObj?.type === "success" ? "green" : "red"}
        className={
          "rounded-sm  absolute top-1 right-1 z-[90]   w-1/3 font-medium text-white"
        }
      >
        {alertObj?.message}
      </Alert>
    </main>
  );
}

export default Main;
