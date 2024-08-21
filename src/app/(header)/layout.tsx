"use client";
import React from "react";
import Header from "@/components/Header";

import { FloatingWhatsApp } from "react-floating-whatsapp";
export default function HeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const defaultMessage = `Hola, me gustaría realizar una reparación del `;
  const handleClick = () => {
    const phoneNumber = "1150610043"; // Número de teléfono con código de país si es necesario
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      defaultMessage
    )}`;
    window.open(whatsappUrl, "_blank");
  };
  return (
    <>
      <Header />
      <div className="container mx-auto px-8 lg:px-12">{children}</div>

      <FloatingWhatsApp
        phoneNumber="+5411506110043"
        accountName="Compumobile"
        avatar="https://scontent.feze8-1.fna.fbcdn.net/v/t39.30808-6/301515911_492578456250850_3464074576141268515_n.png?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFqqVcDEl6XmVMSKYmm_0ZgnxilefH82vSfGKV58fza9DcLqYAB9XUIw9S2mKCzGk4&_nc_ohc=bFOoTwdWyvAQ7kNvgFli5DX&_nc_ht=scontent.feze8-1.fna&_nc_gid=AfO8jC3PpxcY26k55t1ZCff&oh=00_AYDJWI63pjUI-Rf-u4peQcf51_Z1WB0p3g_08JU6LVbndw&oe=66CAFACE"
        statusMessage="Normalmente responde en 10 minutos"
        chatMessage="¡Hola! ¿Cómo podemos ayudarte?"
        placeholder="Escribe un mensaje..."
        darkMode={true}
        notification={true}
        notificationDelay={30}
        notificationSound={true}
      />
    </>
  );
}

/* 

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import authenticateRoute from "@/utils/routeAuthenticator";
import { useDispatch } from "react-redux";
import axios from "axios";
import { set } from "@/state/user";
import { setAllUsers } from "@/state/allUsers";
import Header from "@/components/Header";

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
      <Header />
      <div className="container mx-auto px-8 lg:px-12">{children}</div>
    </>
  );
}
*/
