"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import clsx from "clsx";
import useGlobal from "@/store/user";
import axios from "../axios";
import useAllUserGlobal from "@/store/all_users";

function Main({ children }) {
  const [openSidebar, setOpenSidebar] = useState(true);
  const setLoggedInUser = useGlobal((state) => state.setLoggedInUser);
  const setAuthenticatedToken = useGlobal(
    (state) => state.setAuthenticatedToken
  );
  const setAllUsers = useAllUserGlobal((state) => state.setAllUsers);

  useEffect(() => {
    const requestUser = async () => {
      const user_token = sessionStorage.getItem("USER_TOKEN");
      if (user_token) {
        const user_token2 = JSON.parse(user_token);
        setAuthenticatedToken(user_token2);
        
        await axios
          .get(`/api/user`, {
            headers: {
              Authorization: `Bearer ${user_token2}`,
            },
          })
          .then((res) => {
            setLoggedInUser(res.data[0]);
          });

        await axios
          .get(`api/all_users`, {
            headers: {
              Authorization: `Bearer ${user_token2}`,
            },
          })
          .then((res) => {
            setAllUsers(res.data);
          });
      } else {
        console.log("wrong credentials");
      }
    };

    requestUser();
  }, []);
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
    </main>
  );
}

export default Main;
