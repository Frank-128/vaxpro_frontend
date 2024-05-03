import globalUser from "@/store/user";
import axios from "../axios";
import globalAllUsers from "@/store/all_users";
import globalAddress from "@/store/address";
import globalRoles from "@/store/roles";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

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

  const initialRequest = async () => {
    const user_token = Cookies.get("USER_TOKEN");
    const decrypted_token = CryptoJS.AES.decrypt(user_token, "vaxpro_tanzania");
    const decrypted_token2 = decrypted_token.toString(CryptoJS.enc.Utf8);
    if (user_token) {
      setAuthenticatedToken(decrypted_token2);

      await axios
        .get(`/api/user`, {
          headers: {
            Authorization: `Bearer ${decrypted_token2}`,
          },
        })
        .then((res) => {
          setLoggedInUser(res.data[0]);
        });

      await axios
        .get(`api/all_users`, {
          headers: {
            Authorization: `Bearer ${decrypted_token2}`,
          },
        })
        .then((res) => {
          setAllUsers(res.data);
        });

      await axios
        .get(`api/regions`, {
          headers: {
            Authorization: `Bearer ${decrypted_token2}`,
          },
        })
        .then((res) => {
          setRegions(res.data);
        });
      if (loggedInUser.role?.account_type === "regional") {
        await axios
          .get(`api/region_districts/${loggedInUser.region.id}`, {
            headers: {
              Authorization: `Bearer ${decrypted_token2}`,
            },
          })
          .then((res) => {
            setDistricts(res.data);
          });
      }

      await axios
        .get(`api/roles`, {
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
  };
  return { initialRequest };
};
