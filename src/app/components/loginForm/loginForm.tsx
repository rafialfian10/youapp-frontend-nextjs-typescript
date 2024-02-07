"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

import { LoginValues } from "@/types/login";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// ---------------------------------------------------------

function LoginForm() {
  // session
  const { data: session, status } = useSession();

  const router = useRouter();

  // state visible password
  const [passwordVisible, setPasswordVisible] = useState(false);

  const errorMessages = {
    email: "Email is required",
    password: "Password is required",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginValues>();

  const onSubmit: SubmitHandler<LoginValues> = async (data, e) => {
    e?.preventDefault();
    try {
      const response = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (response?.ok) {
        toast.success("Login Successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          style: { marginTop: "65px" },
        });
        reset();
        router.push(`/pages/initialState`);
        return;
      } else if (response?.error || response?.status === 401) {
        toast.error("Login Failed, wrong email or password", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          style: { marginTop: "65px" },
        });
      }
    } catch (err) {
      console.log("Login failed", err);
    }
  };

  const onError = () => {
    console.log("Login failed");
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/pages/initialState");
    }
  }, [status]);

  return (
    <div className="w-full mb-5">
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="w-full mb-5">
          <input type="hidden" {...register("username")} />
        </div>
        <div className="w-full mb-5">
          <input
            type="text"
            autoComplete="off"
            placeholder="Enter Username/Email"
            className="w-full h-50 p-2 rounded-md text-base text-[#FFFFFF] font-inter font-normal leading-4 outline-none bg-[#243c41]"
            {...register("email", {
              required: errorMessages.email,
            })}
          />
          {errors.email && (
            <p className="mt-1 text-red-500 text-left text-sm">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="w-full relative mb-8">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Create Password"
            autoComplete="off"
            className="w-full h-50 p-2 rounded-md text-base text-[#FFFFFF] font-inter font-normal leading-4 outline-none bg-[#243c41]"
            {...register("password", {
              required: errorMessages.password,
            })}
          />
          <span className="absolute top-3 right-3">
            <FontAwesomeIcon
              className="w-5 h-5 text-[#FFFFFF]"
              icon={passwordVisible ? faEyeSlash : faEye}
              onClick={() => setPasswordVisible(!passwordVisible)}
            />
          </span>
          {errors.password && (
            <p className="mt-1 text-red-500 text-left text-sm">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full h-50 mb-5 transition-opacity duration-300 ease-in-out hover:opacity-100 opacity-30 rounded-md bg-gradient-to-r from-teal-500 to-blue-500 hover:cursor-pointer outline-none"
        >
          <p className="text-center text-lg text-[#FFFFFF] font-medium font-inter leading-5 tracking-wide">
            Login
          </p>
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
