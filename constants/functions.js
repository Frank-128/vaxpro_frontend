import globalUser from "@/store/user";
import axios from "../axios";
import globalAllUsers from "@/store/all_users";
import globalAddress from "@/store/address";
import globalRoles from "@/store/roles";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { useCallback } from "react";
import globalBookings from "@/store/bookings";

export const useInitial = () => {
  const setLoggedInUser = globalUser((state) => state.setLoggedInUser);
  const setAuthenticatedToken = globalUser(
    (state) => state.setAuthenticatedToken
  );
  const setAllUsers = globalAllUsers((state) => state.setAllUsers);
  const setRegions = globalAddress((state) => state.setRegions);
  const setRoles = globalRoles((state) => state.setRoles);
  const setDistricts = globalAddress((state) => state.setDistricts);
  const loggedInUser = globalUser((state) => state.loggedInUser);
  const setWards = globalAddress((state) => state.setWards);
  const setBookings = globalBookings((state) => state.setBookings);

  const initialToken = () => {
    const user_token = Cookies.get("USER_TOKEN");
    const decrypted_token = CryptoJS.AES.decrypt(user_token, "vaxpro_tanzania");
    const decrypted_token2 = decrypted_token.toString(CryptoJS.enc.Utf8);
    return decrypted_token2;
  };

  const initialRequest = useCallback(() => {
    const decrypted_token2 = initialToken();
    if (decrypted_token2) {
      setAuthenticatedToken(decrypted_token2);

      axios
        .get(`user`, {
          headers: {
            Authorization: `Bearer ${decrypted_token2}`,
          },
        })
        .then((res) => {
          setLoggedInUser(res.data[0]);
        });

      axios
        .get(`regions`, {
          headers: {
            Authorization: `Bearer ${decrypted_token2}`,
          },
        })
        .then((res) => {
          setRegions(res.data);
        });
      if (loggedInUser.role?.account_type === "regional") {
        axios
          .get(`region_districts/${loggedInUser.region.id}`, {
            headers: {
              Authorization: `Bearer ${decrypted_token2}`,
            },
          })
          .then((res) => {
            setDistricts(res.data);
          });
      }
      if (loggedInUser.role?.account_type === "district") {
        axios
          .get(`districts_wards/${loggedInUser.district?.id}`, {
            headers: {
              Authorization: `Bearer ${decrypted_token2}`,
            },
          })
          .then((res) => {
            setWards(res.data);
            console.log(res.data, "RESPONSE DATA");
          });
      }
      if (loggedInUser.role?.account_type === "health_worker") {
        axios.get(`hospital_bookings/123705-1`).then((res) => {
          setBookings(res.data);
        });
      }

      axios
        .get(`roles`, {
          headers: {
            Authorization: `Bearer ${decrypted_token2}`,
          },
        })
        .then((res) => {
          setRoles(res.data);
        });
    } else {
      console.log("wrong credentials");
    }
  }, [
    loggedInUser.district?.id,
    loggedInUser.region?.id,
    loggedInUser.role?.account_type,
    setAuthenticatedToken,
    setDistricts,
    setLoggedInUser,
    setRegions,
    setRoles,
    setWards,
  ]);

  const getInitialUsers = useCallback(() => {
    const decrypted_token2 = initialToken();

    axios
      .get(`all_users/${loggedInUser?.id}`, {
        headers: {
          Authorization: `Bearer ${decrypted_token2}`,
        },
      })
      .then((res) => {
        setAllUsers(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [loggedInUser, setAllUsers]);

  return { initialRequest, getInitialUsers };
};

export const verifyToken = async (token) => {
  try {
    const response = await fetch("http://localhost:8000/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    // const data = await response.json();
    return response.status;
  } catch (err) {
    return err;
  }
};
