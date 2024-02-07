"use client";

import Link from "next/link";

import RegisterForm from "@/app/components/registerForm/registerForm";
import BackButton from "@/app/components/backButton/backButton";
// ----------------------------------------------------------------

export default function Register() {
  return (
    <section className="w-full md:w-60 min-h-screen md:max-h-dvh m-auto md:mt-14 py-10 md:py-0 flex flex-col items-center">
      <header className="w-full mb-14 px-5 md:hidden">
        <BackButton />
      </header>
      <div className="flex w-80 flex-col items-center">
        <h1 className="w-full mb-8 px-5 text-3xl text-left md:text-center text-white font-inter font-bold leading-10">
          Register
        </h1>
        <RegisterForm />
        <p className="font-inter text-13 font-normal leading-6 text-center text-white">
          Have an account?{" "}
          <Link href={`/pages/login`} className="hover:cursor-pointer ">
            Login here
          </Link>
        </p>
      </div>
    </section>
  );
}
