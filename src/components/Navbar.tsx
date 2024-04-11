import React from "react";
import { useRouter } from "next/navigation";
import { dataLogout } from "@/services/dataAuth";
import { useDispatch } from "react-redux";
import { clear } from "@/state/user";
import { ModeToggle } from "./ModeToggle";
import logoutIcon from "../assets/icons8-logout-50.png";
import Image from "next/image";

const Navbar: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const clickLogout = async () => {
    dispatch(clear(null));
    try {
      await dataLogout();
      router.push("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleClickRepair = () => {
    router.push("/repair");
  };

  const handleClickHome = () => {
    router.push("/home");
  };

  const handleClickProfile = () => {
    router.push("/profile");
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between py-4 px-4 lg:px-8">
      <div className="flex items-center mx-4 lg:mx-0">
        <h1
          className=" text-2xl font-bold cursor-pointer"
          onClick={() => handleClickHome()}
        >
          COMPUMOBILE
        </h1>
      </div>
      <div className="flex items-center mt-4 lg:mt-0 mx-4 lg:mx-0 space-x-4">
        <a
          onClick={() => handleClickRepair()}
          className="transition-colors text-foreground/60 hover:text-foreground/80 cursor-pointer"
          target="_blank"
          rel="noreferrer"
        >
          Reparar
        </a>
        <a
          onClick={() => handleClickProfile()}
          className="transition-colors text-foreground/60 hover:text-foreground/80 cursor-pointer"
          target="_blank"
          rel="noreferrer"
        >
          Mi perfil
        </a>
        <a
          onClick={() => clickLogout()}
          className="transition-colors text-foreground/60 hover:text-foreground/80 cursor-pointer"
          target="_blank"
          rel="noreferrer"
        >
          <Image width="25" height="25" src={logoutIcon} alt="exit--v2" />
        </a>
        <img
          width="25"
          height="25"
          src="https://img.icons8.com/ios-filled/50/exit.png"
          alt="exit"
        />

        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
