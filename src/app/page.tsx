"use client";
import { useRouter } from "next/navigation"; // Importamos useRouter de next/router
import React, { useEffect, useState } from "react";
import { set } from "@/state/user";
import { setAllUsers } from "@/state/allUsers";
import axios from "axios";
import { useDispatch } from "react-redux";
import Login from "@/components/Login";

export default function Page() {
  const [loading, setLoading] = useState<boolean>(true);
  const [userExists, setUserExists] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter(); // Usamos useRouter para la redirección

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
            router.push("/dashboard"); // Redireccionamos al dashboard si es admin
          } else {
            router.push("/home"); // Redireccionamos a home si no es admin
          }
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Something was wrong...", err);
        setLoading(false); // En caso de error, detenemos el loading
      });
  }, [dispatch, router]);

  if (loading) {
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
  }

  if (!userExists) {
    return (
      <main>
        <Login />
      </main>
    );
  }

  // Si ya no está cargando y no se ha redirigido, renderizamos null
  return null;
}
