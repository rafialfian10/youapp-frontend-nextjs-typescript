"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { registerUser } from "@/redux/features/registerSlice";

import { RegisterValues } from "@/types/register";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// ------------------------------------------------------------------

function RegisterForm() {
  // dispatch
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  // state visible pssword
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const errorMessages = {
    username: "Username is required",
    email: "Email is required",
    password: "Password is required",
    cpassword: "Confirm password is required",
    passwordValidation:
      "Password must contain at least one uppercase and lowercase letter, one digit, and be at least 8 characters long.",
    passwordMatch: "The confirm password does not match the password",
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<RegisterValues>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<RegisterValues> = async (formData) => {
    try {
      const response = await dispatch(registerUser({ formData }));
      if (response.payload.message === "User has been created successfully") {
        toast.success("Register successfully", {
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
        router.push(`/pages/login`);
        reset();
      } else if (response.payload.message === "User already exists") {
        toast.error("User already exists", {
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
    } catch (error) {
      console.log("Register failed", error);
    }
  };

  const onError = () => {
    console.log("Register failed");
  };

  return (
    <div className="w-full mb-5">
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="w-full mb-5">
          <input
            type="email"
            placeholder="Enter Email"
            autoComplete="off"
            className="w-full h-50 p-2 rounded-md text-base text-white font-inter font-normal leading-4 outline-none bg-[#243c41]"
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
        <div className="w-full mb-5">
          <input
            type="text"
            placeholder="Create Username"
            autoComplete="off"
            className="w-full h-50 p-2 rounded-md text-base text-white font-inter font-normal leading-4 outline-none bg-[#243c41]"
            {...register("username", {
              required: errorMessages.username,
            })}
          />
          {errors.username && (
            <p className="mt-1 text-red-500 text-left text-sm">
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="w-full relative mb-5">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Create Password"
            autoComplete="off"
            className="w-full h-50 p-2 rounded-md text-base text-white font-inter font-normal leading-4 outline-none bg-[#243c41]"
            {...register("password", {
              required: errorMessages.password,
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*.])[A-Za-z\d@$%^&*#.,]{8,}$/,
                message: errorMessages.passwordValidation,
              },
            })}
          />
          <span className="absolute top-3 right-3">
            <FontAwesomeIcon
              className="w-5 h-5 text-white"
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
        <div className="w-full relative mb-8">
          <input
            type={confirmPasswordVisible ? "text" : "password"}
            placeholder="Create Password"
            autoComplete="off"
            className="w-full h-50 p-2 rounded-md text-base text-white font-inter font-normal leading-4 outline-none bg-[#243c41]"
            {...register("cpassword", {
              required: errorMessages.cpassword,
              validate: (value) =>
                value === watch("password") || errorMessages.passwordMatch,
            })}
          />
          <span className="absolute top-3 right-3">
            <FontAwesomeIcon
              className="w-5 h-5 text-white"
              icon={confirmPasswordVisible ? faEyeSlash : faEye}
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            />
          </span>
          {errors.cpassword && (
            <p className="mt-1 text-red-500 text-left text-sm">
              {errors.cpassword.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full h-50 mb-5 transition-opacity duration-300 ease-in-out hover:opacity-100 opacity-30 rounded-md bg-gradient-to-r from-teal-500 to-blue-500 hover:cursor-pointer outline-none"
        >
          <p className="text-center text-lg text-white font-medium font-inter leading-5 tracking-wide">
            Register
          </p>
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
