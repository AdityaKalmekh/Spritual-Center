"use client";

import { Login_Interface } from "../../../interface/Login.js";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { DevoteeAction } from "../../../lib/features/DevoteeSlice.tsx";

const Login = () => {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Login_Interface>();
  const [otp, setOtp] = useState(false);
  const dispatch = useDispatch();

  const submitHandler = async (data: any) => {
    $("#authInfo").hide();
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });
    const resolveResponse = await response.json();
    if (resolveResponse.Role === "Admin") {
      router.push("/admin/userlist");
    } else if (resolveResponse.Role === "Devotee") {
      setOtp(true);
      if (resolveResponse.Otp === data.otp) {
        dispatch(DevoteeAction.setDevoteeId(resolveResponse.DevoteeId));
        router.push("/devotee/mypayments");
      }
    } else {
      $("#authInfo").show();
    }
  };

  return (
    <>
      <h2 className="card-title text-center my-2">Login</h2>
      <div className="container w-25 mt-4 card shadow p-2">
        <form onSubmit={handleSubmit((data) => submitHandler(data))}>
          <div className="form-group p-2">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              className="form-control border border-dark"
              {...register("username", {
                required: { value: true, message: "Username is required" },
              })}
            />
            {errors.username && (
              <span className="text-danger">{errors.username.message}</span>
            )}
          </div>
          <div className="form-group p-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="form-control border border-dark"
              {...register("password", {
                required: { value: true, message: "Password is required" },
              })}
            />
            {errors.password && (
              <span className="text-danger">{errors.password.message}</span>
            )}
          </div>
          <div className="form-group p-2">
            <label htmlFor="password">Role</label>
            <select
              id="role"
              {...register("role", {
                required: { value: true, message: "Select a Role" },
              })}
              className="form-control border border-dark"
            >
              <option value="">Select a Role</option>
              <option value="Admin">Admin</option>
              <option value="Devotee">Devotee</option>
            </select>
            {errors.role && (
              <span className="text-danger">{errors.role.message}</span>
            )}
          </div>
          {otp && (
            <div className="form-group p-2">
              <label htmlFor="password">OTP</label>
              <input
                type="text"
                id="otp"
                placeholder="Otp"
                className="form-control border border-dark"
                {...register("otp", {
                  required: { value: true, message: "Otp is required" },
                })}
              />
              {errors.otp && (
                <span className="text-danger">{errors.otp.message}</span>
              )}
            </div>
          )}
          <div className="form-group text-center">
            <button id="submit" className="btn w-75">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
