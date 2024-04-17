import React, { useEffect, useState } from "react";
import { es } from "date-fns/locale";
import { format } from "date-fns";
import axios from "axios";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector
import { setDate, setTime } from "@/src/slices/deviceAndAppointmentSlice"; // Import actions

interface Schedule {
  id: number;
  hour: string;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

const SelectDateTime = ({ handlePrevStep, handleNextStep }) => {
  const dispatch = useDispatch(); // Use useDispatch hook
  const { time } = useSelector((state) => state.deviceAndAppointment); // Access state from Redux store
  const dateTimestamp = useSelector((state) => state.deviceAndAppointment.date); // Access timestamp from Redux store
  const [selectedHour, setSelectedHour] = useState<string>(time || "");
  const [selectedDay, setSelectedDay] = useState<Date>();
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const handleDateChange = (day: Date) => {
    setSelectedDay(day); // Actualiza el estado del componente

    // Serializa el objeto Date a un timestamp
    const dateTimestamp = day.getTime(); // Convertir a timestamp

    // Despacha la acción con el timestamp como payload
    dispatch(setDate(dateTimestamp)); // Despacha la acción (efecto secundario)
  };

  const handleHourChange = (hour: string) => {
    setSelectedHour(hour);
    dispatch(setTime(hour)); // Dispatch action to update global state
  };

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        if (selectedDay) {
          const isoDate = selectedDay.toISOString();
          const response = await axios.get(
            `http://localhost:3001/api/schedules/?date=${isoDate}`
          );
          setSchedules(response.data);
        }
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };

    fetchSchedules();

    return () => {
      // Cleanup function
    };
  }, [selectedDay]);

  const footer = selectedDay ? (
    <>
      <p>{format(selectedDay, "PPP")}.</p>
    </>
  ) : (
    <p>Seleccione una fecha</p>
  );

  // Loguear el estado global
  useEffect(() => {
    // Convertir timestamp a objeto Date
    if (dateTimestamp) {
      setSelectedDay(new Date(dateTimestamp));
    }
  }, [dateTimestamp]); // Update state when dateTimestamp changes

  return (
    <form>
      <Card className="max-w-[320px]">
        <CardHeader>
          <CardTitle>Seleccione dia y horario a convenir</CardTitle>
          {/* <CardDescription>Complete el siguiente formulario</CardDescription> */}
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDay}
            onSelect={handleDateChange}
            className="rounded-md border shadow"
            locale={es}
            disabled={
              (date) =>
                date < new Date(new Date().setHours(0, 0, 0, 0)) || // Deshabilitar días anteriores al día actual
                date.getDay() === 0 // Deshabilitamos los domingos
            }
          />
        </CardContent>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="hour">Seleccione un horario</Label>
              <Select
                required
                onValueChange={handleHourChange}
                value={selectedHour}
                disabled={!selectedDay}
              >
                <SelectTrigger id="hour">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {/* <SelectLabel>Horarios disponibles</SelectLabel> */}
                  {schedules.length > 0 &&
                    schedules
                      .filter((schedule) => schedule.available)
                      .map((schedule) => (
                        <SelectItem key={schedule.id} value={schedule.hour}>
                          {schedule.hour}
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handlePrevStep}>Regresar</Button>
          <Button
            onClick={handleNextStep}
            disabled={!selectedDay || !selectedHour}
          >
            Continuar
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default SelectDateTime;
