import React, { useEffect, useState } from "react";
import { es } from "date-fns/locale";
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
import { useDispatch, useSelector } from "react-redux";
import { setDate, setTime } from "@/src/slices/deviceAndAppointmentSlice";

const SelectDateTime = ({ handlePrevStep, handleNextStep }) => {
  const dispatch = useDispatch();
  const { time } = useSelector((state) => state.deviceAndAppointment);
  const dateTimestamp = useSelector((state) => state.deviceAndAppointment.date);
  const [selectedHour, setSelectedHour] = useState<string>(time || "");
  const [selectedDay, setSelectedDay] = useState<Date>();
  //const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [availableSchedules, setAvailableSchedules] = useState([]);

  const handleDateChange = (day: Date) => {
    if (day !== undefined) {
      // Borrar la selección de horario al cambiar de día
      dispatch(setTime(""));
      setSelectedHour(""); // Limpiar el estado local también
      const dateTimestamp = day.getTime();
      dispatch(setDate(dateTimestamp));
    }
  };

  const handleHourChange = (hour: string) => {
    setSelectedHour(hour);
    dispatch(setTime(hour));
    console.log("HORARIO SELECCIONADO", hour); // Usamos 'hour' en lugar de 'selectedHour'
  };

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        if (selectedDay) {
          const isoDate = selectedDay.toISOString();
          const response = await axios.get(
            `http://localhost:3001/api/calendar?date=${isoDate}`
          );
          console.log("RESPUESTA DEL SERVIDOR:", response.data);
          setAvailableSchedules(response.data);
        }
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };

    fetchSchedules();

    return () => {
      // Limpieza
    };
  }, [selectedDay]);

  // Loguear el estado global
  useEffect(() => {
    // Convertir timestamp a objeto Date
    if (dateTimestamp) {
      setSelectedDay(new Date(dateTimestamp));
    }
  }, [dateTimestamp]);

  return (
    <form>
      <Card className="max-w-[320px]">
        <CardHeader>
          <CardTitle>Seleccione día y horario a convenir</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDay}
            onSelect={handleDateChange}
            className="rounded-md border shadow"
            locale={es}
            disabled={(date) =>
              date < new Date(new Date().setHours(0, 0, 0, 0)) ||
              date.getDay() === 0
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
                disabled={!selectedDay} // Deshabilitar si no hay día seleccionado
              >
                <SelectTrigger id="hour">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {availableSchedules.length > 0 &&
                    availableSchedules
                      .filter(
                        (availableSchedule) => availableSchedule.availability
                      )
                      .map((availableSchedule) => {
                        const startTime = availableSchedule.startTime.substring(
                          0,
                          5
                        ); // Recortar los segundos y los dos últimos caracteres
                        const endTime = availableSchedule.endTime.substring(
                          0,
                          5
                        );
                        const value = `${startTime} - ${endTime}`; // Recortar los segundos y los dos últimos caracteres
                        return (
                          <SelectItem key={availableSchedule.id} value={value}>
                            {startTime} - {endTime}
                          </SelectItem>
                        );
                      })}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handlePrevStep}>Regresar</Button>
          <Button
            onClick={handleNextStep}
            disabled={!selectedDay || !selectedHour} // Deshabilitar si no hay día o hora seleccionados
          >
            Continuar
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default SelectDateTime;
