import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RootState } from "@/state/store";
import { set } from "@/state/user";
import { UserState } from "@/types/userTypes";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

const Login: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const user: UserState = useSelector<RootState, UserState>(
    (state) => state.user
  );

  useEffect(() => {
    if (authenticated) {
      if (user.isAdmin) router.push("/dashboard");
      else router.push("/home");
    } else {
      setLoading(false);
    }
  }, [authenticated, router, user.isAdmin]);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/login",
        values,
        {
          withCredentials: true,
        }
      );

      // Consoléa la respuesta del servidor
      console.log("Respuesta del servidor:", response.data);

      dispatch(set(response.data));
      toast.success("Usuario logueado satisfactoriamente", {
        duration: 2000,
      });
      setAuthenticated(true); // Usuario autenticado correctamente
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          console.log("El correo electrónico no se encuentra registrado.");
          console.error("Mensaje de error:", error.response?.data?.error);
        } else {
          toast.error(`${error.response?.data?.error}`, {
            duration: 2000,
          });
          console.error("Error al enviar datos:", error);
        }
      } else {
        console.error("Error desconocido:", error);
      }
    }
  };

  const handleRegisterClick = () => {
    router.push("/signup");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-2xl font-bold tracking-tight">
        <h2>Inicia sesión</h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-md w-full flex flex-col gap-4"
        >
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
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Contraseña"
                        type={showPassword ? "text" : "password"}
                        {...field}
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button type="submit" className="w-full">
            Iniciar sesión
          </Button>
          <Button
            type="button"
            onClick={handleRegisterClick}
            className="w-full"
          >
            Registrarse
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default Login;
