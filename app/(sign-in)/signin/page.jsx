"use client";
import { Button, Input } from "@material-tailwind/react";
import {
  PermIdentityOutlined,
  LockOutlined,
  LockOpenOutlined,
} from "@mui/icons-material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "../../../axios";
import { useRouter } from "next/navigation";
import globalUser from "@/store/user";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [loading, setLoading] = React.useState({ loading: false, error: "" });
  const setLoggedInUser = globalUser((state) => state.setLoggedInUser);
  const setAuthenticatedToken = globalUser(
    (state) => state.setAuthenticatedToken
  );

  const login =  (data) => {
    setLoading({ loading: true });
     axios.post(`login`, data).then( (res) => {
      if (res.data.status === 200) {
        const encryptionKey = "vaxpro_tanzania";

        const encryptedData = CryptoJS.AES.encrypt(
          res.data.token,
          encryptionKey
        ).toString();

        Cookies.set("USER_TOKEN", encryptedData);
        setAuthenticatedToken(res.data.token);
         axios
          .get(`user`, {
            headers: {
              Authorization: `Bearer ${res.data.token}`,
            },
          })
          .then((res) => {
            setLoggedInUser(res.data[0]);
            router.push("/");

          });
      } else {
        setLoading({ loading: false, error: "Wrong Credentials" });
      }
    }).catch((err)=>{
      setLoading({ loading: false, error: "Network error please try again later" });
    });
  };

  useEffect(()=>{

    return ()=>{
      setLoading({ loading: false })
    }
  },[])

  return (
    <main className="h-screen w-screen flex flex-col bg-blue-gray-100 gap-6 pt-60 items-center">
      <form
        onSubmit={handleSubmit(login)}
        className="md:w-[30%] w-[80%] bg-white flex flex-col gap-3 shadow rounded-md border-black border-[0.2px] px-4 py-3"
      >
      <span className="font-monte-1 text-xl md:text-3xl text-center">VaxPro</span>
        {loading.error && (
          <p
            className="text-red-800 bg-gradient-to-r from-red-100 text-xs
         to-red-300 border border-red-900 rounded p-2 flex justify-center items-center"
          >
            {loading.error}
          </p>
        )}
        <Input
          label="Profile Id"
          icon={<PermIdentityOutlined />}
          {...register("uid", {
            required: true,
            onChange: () => {
              setLoading({ error: "" });
            },
          })}
          className=""
        />
        {errors.role && (
          <p className="text-red-900 text-xs font-monte">This field is required</p>
        )}
        <Input
          label="Password"
          type="password"
          icon={!watch("password") ? <LockOutlined /> : <LockOpenOutlined />}
          {...register("password", {
            required: true,
            onChange: () => {
              setLoading({ error: "" });
            },
          })}
          className=""
        />
        {errors.password && (
          <p className="text-red-900 text-xs font-monte">This field is required</p>
        )}
          <span className={'text-xs p-1 text-black w-fit cursor-pointer'} onClick={()=>router.push('password-recovery')}>forgot password?</span>
        <Button
          loading={loading.loading}
          className="4xs:w-full w-48 flex justify-center"
          type="submit"
        >
          sign in
        </Button>
      </form>
    </main>
  );
};

export default Login;
