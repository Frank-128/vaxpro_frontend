"use client";
import { Button, Input } from "@material-tailwind/react";
import {
  PermIdentityOutlined,
  LockOutlined,
  LockOpenOutlined,
} from "@mui/icons-material";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "../../../axios";
import { useRouter } from "next/navigation";
import useGlobal from "@/store/user";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const route = useRouter();
  const setLoggedInUser = useGlobal((state) => state.setLoggedInUser);
  const setAuthenticatedToken = useGlobal((state)=> state.setAuthenticatedToken)


  const login = async (data) => {
    await axios.post(`/api/login`, data).then(async (res) => {
      if (res.data.status === 200) {
        sessionStorage.setItem("USER_TOKEN", JSON.stringify(res.data.token));
        setAuthenticatedToken(res.data.token)
        await axios
        .get(`/api/user`, {
          headers: {
            Authorization: `Bearer ${res.data.token}`,
          },
        })
        .then((res) => {
            setLoggedInUser(res.data);
            route.push("/");
          });
      } else {
        console.log("wrong credentials");
      }
    });
  };

  return (
    <main className="h-screen w-screen flex flex-col gap-6 pt-60 items-center">
      <span className="font-monte-1 text-xl md:text-3xl">Vaccination</span>
      <form
        onSubmit={handleSubmit(login)}
        className="md:w-[40%] w-[80%] flex flex-col gap-3"
      >
        <Input
          label="Role"
          icon={<PermIdentityOutlined />}
          {...register("role_id", { required: true })}
          className=""
        />
        {errors.role && (
          <p className="text-red-900 text-xs">This field is required</p>
        )}
        <Input
          label="Password"
          type="password"
          icon={!watch("password") ? <LockOutlined /> : <LockOpenOutlined />}
          {...register("password", { required: true })}
          className=""
        />
        {errors.password && (
          <p className="text-red-900 text-xs">This field is required</p>
        )}
        <Button className="4xs:w-full w-48" type="submit">
          sign in
        </Button>
      </form>
    </main>
  );
};

export default Login;
