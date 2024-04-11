"use client";
import * as z from "zod";
import React, { useState } from "react";

import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const formSchema = z
  .object({
    name: z.string(),
    surname: z.string(),
    email: z.string().email(),
    password: z.string().min(3),
    passwordConfirm: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      message: "Las contraseñas no coinciden",
      path: ["passwordConfirm"],
    }
  );

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/register",
        values
      );

      //console.log("RESPUESTA DEL SERVIDOR", response.data);
      toast.success("Usuario registrado con exito");
      router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        console.log("MENSAJE DEL SERVIDOR", error.response.data.error);
        toast.error(error.response.data.error);
      } else {
        console.error(
          "Error del servidor: Error en el servidor, intente más tarde ...",
          error
        );
        toast.error("Error en el servidor, intente más tarde ...");
      }
    }
  };

  const handleLoginClick = () => {
    router.push("/");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-2xl font-bold tracking-tight">
        <h2>Regístrate</h2>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-md w-full flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nombre"
                      type="text"
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Apellido"
                      type="text"
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Correo Electrónico"
                      type="email"
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <div className="relative">
                    <Input
                      placeholder="Contraseña"
                      type={showPassword ? "text" : "password"}
                      {...field}
                      required
                      className="w-full pr-10" // Agregamos padding a la derecha para dejar espacio al botón
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        top: "50%",
                        right: "0.75rem",
                        transform: "translateY(-50%)",
                      }}
                      className="absolute z-10 hover:bg-transparent"
                    >
                      {showPassword ? (
                        <FontAwesomeIcon icon={faEyeSlash} />
                      ) : (
                        <FontAwesomeIcon icon={faEye} />
                      )}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Confirma la contraseña</FormLabel>
                  <div className="relative">
                    <Input
                      placeholder="Confirme la contraseña"
                      type={showConfirmPassword ? "text" : "password"}
                      {...field}
                      required
                      className="w-full pr-10" // Agregamos padding a la derecha para dejar espacio al botón
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      style={{
                        top: "50%",
                        right: "0.75rem",
                        transform: "translateY(-50%)",
                      }}
                      className="absolute z-10 hover:bg-transparent"
                    >
                      {showConfirmPassword ? (
                        <FontAwesomeIcon icon={faEyeSlash} />
                      ) : (
                        <FontAwesomeIcon icon={faEye} />
                      )}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Button type="submit" className="w-full">
            Registrarse
          </Button>
          <Button type="button" onClick={handleLoginClick} className="w-full">
            Iniciar sesión
          </Button>
        </form>
      </Form>
      <ToastContainer />
    </main>
  );
}
