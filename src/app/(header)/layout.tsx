"use client";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import authenticateRoute from "@/utils/routeAuthenticator";
import { useDispatch } from "react-redux";
import axios from "axios";
import { set } from "@/state/user";
import { setAllUsers } from "@/state/allUsers";

export default function HeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  //autenticar rutas
  const route = authenticateRoute(usePathname());
  //
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users/me", { withCredentials: true })
      .then((res) => {
        if (res.data.id) {
          dispatch(set(res.data));
          if (res.data.isAdmin === true) {
            axios
              .get("http://localhost:3001/api/users/", {
                withCredentials: true,
              })
              .then((res2) => {
                if (Array.isArray(res2.data)) {
                  dispatch(setAllUsers(res2.data));
                }
                if (route.isUserRoute) {
                  console.log("Forbidden route");
                  router.push("/");
                } else setLoading(false);
              });
          } else if (route.isAdminRoute) {
            console.log("Forbidden route");
            router.push("/");
          } else setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Something was wrong...", err);
      });
  }, []);

  if (loading)
    return (
      <div className="flex w-full h-full items-center justify-center">
        <div className="flex flex-row rounded-2xl p-4 text-white">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status"
          ></div>
        </div>
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-screen-lg px-4">
        {" "}
        {/* Ancho máximo para escritorio y márgenes a los lados */}
        {children}
      </div>
    </>
  );
}
