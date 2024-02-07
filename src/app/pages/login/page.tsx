"use client";

import Link from "next/link";

import LoginForm from "@/app/components/loginForm/loginForm";
import BackButton from "@/app/components/backButton/backButton";
// -----------------------------------------------------------

export default function Login() {
  return (
    <section className="w-full md:w-60 min-h-screen md:max-h-dvh m-auto md:mt-14 py-10 md:py-0 flex flex-col items-center">
      <header className="w-full mb-14 px-5 md:hidden">
        <BackButton route="/pages/register" />
      </header>
      <div className="flex w-80 flex-col items-center">
        <h1 className="w-full mb-8 px-5 text-3xl text-left md:text-center text-white font-inter font-bold leading-10">
          Login
        </h1>
        <LoginForm />
        <p className="text-center text-white font-normal font-inter leading-6">
          No account?{" "}
          <Link href={`/pages/register`} className="hover:cursor-pointer ">
            Register here
          </Link>
        </p>
      </div>
    </section>
  );
}
