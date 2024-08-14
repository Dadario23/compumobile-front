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
import {
  setDate,
  setTime,
  setIdHour,
} from "@/src/slices/deviceAndAppointmentSlice";

const SelectDateTime = ({ handlePrevStep, handleNextStep }) => {
  const dispatch = useDispatch();
  const { time, idHour } = useSelector((state) => state.deviceAndAppointment);
  const dateTimestamp = useSelector((state) => state.deviceAndAppointment.date);
  const [selectedHour, setSelectedHour] = useState({ hour: time, id: idHour });
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [availableSchedules, setAvailableSchedules] = useState([]);

  const handleDateChange = (day: Date | null | undefined) => {
    if (day) {
      dispatch(setTime(""));
      dispatch(setIdHour(null));
      setSelectedHour({ hour: "", id: null });
      const dateTimestamp = day.getTime();
      dispatch(setDate(dateTimestamp));
      setSelectedDay(day);
    }
  };

  const handleHourChange = (value: string) => {
    try {
      const parsedValue = JSON.parse(value);
      setSelectedHour(parsedValue);
      dispatch(setTime(parsedValue.hour));
      dispatch(setIdHour(parsedValue.id));
      console.log(
        "HORARIO SELECCIONADO",
        parsedValue.hour,
        "ID HORARIO",
        parsedValue.id
      );
    } catch (error) {
      console.error("Error parsing value:", error);
    }
  };

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        if (selectedDay) {
          const isoDate = selectedDay.toISOString();
          const response = await axios.get(
            `http://localhost:3001/api/schedules?date=${isoDate}`
          );
          console.log("RESPUESTA DEL SERVIDOR:", response.data);
          setAvailableSchedules(response.data);
        } else {
          setAvailableSchedules([]);
        }
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };

    fetchSchedules();
  }, [selectedDay]);

  useEffect(() => {
    if (dateTimestamp) {
      setSelectedDay(new Date(dateTimestamp));
    }
  }, [dateTimestamp]);

  useEffect(() => {
    if (!selectedDay) {
      setSelectedHour({ hour: "", id: null });
    }
  }, [selectedDay]);

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
                value={selectedHour.hour ? JSON.stringify(selectedHour) : ""}
                disabled={!selectedDay}
              >
                <SelectTrigger id="hour">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>

                <SelectContent position="popper">
                  {availableSchedules.length > 0 &&
                    availableSchedules.map((schedule) => {
                      const value = JSON.stringify({
                        hour: `${schedule.startHour.substring(
                          0,
                          5
                        )} - ${schedule.endHour.substring(0, 5)}`,
                        id: schedule.id,
                      });
                      return (
                        <SelectItem key={schedule.id} value={value}>
                          {schedule.startHour.substring(0, 5)} -{" "}
                          {schedule.endHour.substring(0, 5)}
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
            disabled={!selectedDay || !selectedHour.hour}
          >
            Continuar
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default SelectDateTime;
