"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// ------------------------------------------------------------

export default function AuthUser(Component: any) {
  return function WithAuth(props: any) {
    const { data: session, status } = useSession();

    const router = useRouter();

    useEffect(() => {
      if (status === "loading") {
        return;
      }

      if (status === "unauthenticated" || !session?.user) {
        router.push("/pages/login");
        return;
      }
    }, [status, session, router]);

    if (status === "loading") {
      return null;
    }

    if (!session) {
      return null;
    }

    return <Component {...props} />;
  };
}
