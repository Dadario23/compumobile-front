import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { useSelector } from "react-redux";

const SummaryConfirmation = ({ handlePrevStep, handleSubmit }) => {
  // Utiliza useSelector para seleccionar los valores del estado global que necesitas
  const { brand, model, failure, date, time } = useSelector(
    (state) => state.deviceAndAppointment
  );

  const formattedDate = date ? new Date(date) : null;

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
    </Card>
  );
};

export default SummaryConfirmation;
