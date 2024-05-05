import globalUser from "@/store/user";
import axios from "../axios";
import globalAllUsers from "@/store/all_users";
import globalAddress from "@/store/address";
import globalRoles from "@/store/roles";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { useCallback } from "react";

// export const useInitial = () => {
//   const setLoggedInUser = globalUser((state) => state.setLoggedInUser);
//   const setAuthenticatedToken = globalUser(
//     (state) => state.setAuthenticatedToken
//   );
//   const setAllUsers = globalAllUsers((state) => state.setAllUsers);
//   const setRegions = globalAddress((state) => state.setRegions);
//   const setRoles = globalRoles((state) => state.setRoles);
//   const setDistricts = globalAddress((state) => state.setDistricts);
//   const loggedInUser = globalUser((state) => state.loggedInUser);

//   const initialToken = ()=>{
//     const user_token = Cookies.get("USER_TOKEN");

//     const decrypted_token = CryptoJS.AES.decrypt(user_token, "vaxpro_tanzania");
//     const decrypted_token2 = decrypted_token.toString(CryptoJS.enc.Utf8);
//     return decrypted_token2;
//   }

//   const initialRequest =useCallback( async () => {
//     const decrypted_token2 = initialToken()
//     if (decrypted_token2) {
//       setAuthenticatedToken(decrypted_token2);

//       await axios
//         .get(`/api/user`, {
//           headers: {
//             Authorization: `Bearer ${decrypted_token2}`,
//           },
//         })
//         .then((res) => {
//           setLoggedInUser(res.data[0]);
//         });

//       await axios
//         .get(`api/regions`, {
//           headers: {
//             Authorization: `Bearer ${decrypted_token2}`,
//           },
//         })
//         .then((res) => {
//           setRegions(res.data);
//         });
//       if (loggedInUser.role?.account_type === "regional") {
//         await axios
//           .get(`api/region_districts/${loggedInUser.region.id}`, {
//             headers: {
//               Authorization: `Bearer ${decrypted_token2}`,
//             },
//           })
//           .then((res) => {
//             setDistricts(res.data);
//           });
//       }

//       await axios
//         .get(`api/roles`, {
//           headers: {
//             Authorization: `Bearer ${decrypted_token2}`,
//           },
//         })
//         .then((res) => {
//           setRoles(res.data);
//         });
//     } else {
//       console.log("wrong credentials");
//     }
//   },[loggedInUser?.region?.id, loggedInUser.role?.account_type, setAuthenticatedToken, setDistricts, setLoggedInUser, setRegions, setRoles])

//   const getInitialUsers =useCallback( async()=>{

//     const decrypted_token2 = initialToken()
//     console.log(loggedInUser)
//     await axios
//     .get(`api/all_users/${loggedInUser?.id}`, {
//       headers: {
//         Authorization: `Bearer ${decrypted_token2}`,
//       },
//     })
//     .then((res) => {
//       setAllUsers(res.data);
//     })

//   },[loggedInUser,setAllUsers])

//   return { initialRequest,getInitialUsers };
// };

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
        .get(`/api/user`, {
          headers: {
            Authorization: `Bearer ${decrypted_token2}`,
          },
        })
        .then((res) => {
          setLoggedInUser(res.data[0]);
        });

      axios
        .get(`api/regions`, {
          headers: {
            Authorization: `Bearer ${decrypted_token2}`,
          },
        })
        .then((res) => {
          setRegions(res.data);
        });
      if (loggedInUser.role?.account_type === "regional") {
        axios
          .get(`api/region_districts/${loggedInUser.region.id}`, {
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
          .get(`api/districts_wards/${loggedInUser.district?.id}`, {
            headers: {
              Authorization: `Bearer ${decrypted_token2}`,
            },
          })
          .then((res) => {
            setWards(res.data);
          });
      }

      axios
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
      .get(`api/all_users/${loggedInUser?.id}`, {
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

// chat gpt

// export const useInitial = () => {
//   const setLoggedInUser = globalUser((state) => state.setLoggedInUser);
//   const setAuthenticatedToken = globalUser((state) => state.setAuthenticatedToken);
//   const setAllUsers = globalAllUsers((state) => state.setAllUsers);
//   const setRegions = globalAddress((state) => state.setRegions);
//   const setRoles = globalRoles((state) => state.setRoles);
//   const setDistricts = globalAddress((state) => state.setDistricts);
//   const loggedInUser = globalUser((state) => state.loggedInUser);

//   const initialToken = useCallback(() => {
//     const user_token = Cookies.get("USER_TOKEN");
//     const decrypted_token = CryptoJS.AES.decrypt(user_token, "vaxpro_tanzania");
//     const decrypted_token2 = decrypted_token.toString(CryptoJS.enc.Utf8);
//     return decrypted_token2;
//   }, []);

//   const initialRequest = useCallback(() => {
//     const decrypted_token2 = initialToken();
//     if (decrypted_token2) {
//       setAuthenticatedToken(decrypted_token2);
//       axios.get(`/api/user`, {
//         headers: { Authorization: `Bearer ${decrypted_token2}` },
//       })
//       .then((userResponse) => {
//         setLoggedInUser(userResponse.data[0]);
//         return axios.get(`api/regions`, {
//           headers: { Authorization: `Bearer ${decrypted_token2}` },
//         });
//       })
//       .then((regionsResponse) => {
//         setRegions(regionsResponse.data);
//         // if (loggedInUser.role?.account_type === "regional") {
//           return axios.get(`api/region_districts/2`, {
//             headers: { Authorization: `Bearer ${decrypted_token2}` },
//           });
//         // } else {
//         //   return Promise.resolve(null);
//         // }
//       })
//       .then((regionDistrictsResponse) => {
//         if (regionDistrictsResponse) {
//           setDistricts(regionDistrictsResponse.data);
//         }
//         return axios.get(`api/roles`, {
//           headers: { Authorization: `Bearer ${decrypted_token2}` },
//         });
//       })
//       .then((rolesResponse) => {
//         setRoles(rolesResponse.data);
//       })
//       .catch((error) => {
//         console.error("Error in initialRequest:", error);
//       });
//     } else {
//       console.log("wrong credentials");
//     }
//   }, [initialToken, loggedInUser, setAuthenticatedToken, setDistricts, setLoggedInUser, setRegions, setRoles]);

//   const getInitialUsers = useCallback(() => {
//     const decrypted_token2 = initialToken();
//     console.log("inside get initial users",loggedInUser)
//     axios.get(`api/all_users/2}`, {
//       headers: { Authorization: `Bearer ${decrypted_token2}` },
//     })
//     .then((allUsersResponse) => {
//       setAllUsers(allUsersResponse.data);
//     })
//     .catch((error) => {
//       console.error("Error in getInitialUsers:", error);
//     });
//   }, [initialToken, loggedInUser, setAllUsers]);

//   return { initialRequest, getInitialUsers };
// };
