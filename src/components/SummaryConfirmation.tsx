import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation"; // Importamos useRouter de next/router
import {
  setBrand,
  setDate,
  setFailure,
  setModel,
  setTime,
  setIdHour,
} from "@/slices/deviceAndAppointmentSlice";

const SummaryConfirmation = ({ handlePrevStep }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { brand, model, failure, date, time, idHour } = useSelector(
    (state) => state.deviceAndAppointment
  );

  const { id: userId } = useSelector((state) => state.user);
  //console.log("TIME", time);
  // console.log("IDHOUR", idHour);
  //console.log("USER ID", userId);

  const formattedDate = date ? new Date(date) : null;

  const handleSubmit = async () => {
    try {
      // Realiza una solicitud HTTP al servidor para crear la reserva
      const response = await axios.post(
        "http://localhost:3001/api/appointments/create",
        {
          userId,
          scheduleId: idHour,
        }
      );

      // Redirige a la página de confirmación después de la creación exitosa de la reserva
      handleClear();
      toast.success("reserva realizada satisfactoriamente", {
        duration: 2000,
      });
      router.push("/"); // Ajusta la ruta de la página de confirmación según tus necesidades
    } catch (error) {
      console.error("Error creating reservation:", error);
      // Maneja cualquier error de creación de reserva aquí
    }
  };

  const handleClear = () => {
    dispatch(setBrand(""));
    dispatch(setModel(""));
    dispatch(setFailure(""));
    dispatch(setDate(""));
    dispatch(setTime(""));
    dispatch(setIdHour(null));
  };

  return (
    <Card className="max-w-[320px]">
      <CardHeader>
        <CardTitle>Step 3: Resumen de la Información y Confirmación</CardTitle>
        <CardDescription>Complete el siguiente formulario</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <h3>Resumen de la Información</h3>
          {/* Renderiza la información del estado global */}
          <p>Marca: {brand}</p>
          <p>Modelo: {model}</p>
          <p>Falla: {failure}</p>
          <p>Fecha: {formattedDate && formattedDate.toLocaleDateString()}</p>
          <p>Hora: {time}hs</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handlePrevStep}>Regresar</Button>
        <Button onClick={handleSubmit}>Confirmar</Button>
      </CardFooter>
      <Toaster />
    </Card>
  );
};

export default SummaryConfirmation;
