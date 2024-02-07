"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
// -----------------------------------------------

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 2000);
  }, []);

  return (
    <section className="w-full min-h-screen flex flex-col lg:flex-row items-center justify-center space-y-16 lg:space-y-0 space-x-8 2xl:space-x-0">
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center lg:px-2 xl:px-0 text-center">
        <p className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider text-gray-300">
          404
        </p>
        <p className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider text-gray-300 mt-2">
          Page Not Found
        </p>
        <p className="text-lg md:text-xl lg:text-2xl text-gray-500 my-12">
          Sorry, the page you are looking for could not be found.
        </p>
      </div>
    </section>
  );
}
