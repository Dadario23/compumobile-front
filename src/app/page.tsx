"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { set } from "@/state/user";
import { setAllUsers } from "@/state/allUsers";
import axios from "axios";
import { useDispatch } from "react-redux";
import Login from "@/components/Login";
import { SkeletonDemo } from "@/components/Skeleton";
import { SkeletonCard } from "@/components/SkeletonCard";

export default function Page() {
  const [loading, setLoading] = useState<boolean>(true);
  const [userExists, setUserExists] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users/me", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        if (res.data.id) {
          dispatch(set(res.data));
          console.log("usuario seteado en redux :)");
          setUserExists(true);
          if (res.data.isAdmin === true) {
            axios
              .get("http://localhost:3001/api/users/", {
                withCredentials: true,
              })
              .then((res2) => {
                if (Array.isArray(res2.data)) {
                  dispatch(setAllUsers(res2.data));
                }
              });
            router.push("/dashboard");
          } else {
            router.push("/home");
          }
        } else {
          setLoading(false);
          router.push("/home"); // Redirige a /home si el usuario no existe
        }
      })
      .catch((err) => {
        setLoading(false);
        router.push("/home"); // Redirige a /home si hay un error en la solicitud
      });
  }, [dispatch, router]);

  if (loading) {
    return (
      <>
        <div className="container mx-auto px-8 lg:px-12">
          <div className="container mx-auto px-4 lg:px-20 py-4 flex items-center justify-between">
            <SkeletonDemo />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-8 space-y-8 lg:space-y-0 mt-8">
          <div className="lg:w-1/2 flex justify-center">
            <SkeletonCard />
          </div>

          <div className="lg:w-1/2 flex justify-center">
            <SkeletonCard />
          </div>
        </div>
      </>
    );
  }

  // Si no está cargando y no hay usuario, el componente ya habrá redirigido

  return null;
}
