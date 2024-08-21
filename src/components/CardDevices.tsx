"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Device } from "@/types/Device";
import { RootState } from "@/state/store"; // Asegúrate de ajustar la ruta según sea necesario
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

const CardDevices = () => {
  // Tipar el selector con RootState para evitar el error de 'unknown'
  const userId = useSelector((state: RootState) => state.user.id);
  const [devices, setDevices] = useState<Device[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/devices/user/${userId}`
        );
        setDevices(response.data);
      } catch (error) {
        setError("Error fetching devices");
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!devices || devices.length === 0) {
    return <div>No device registered</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Device Information</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {devices.map((device) => (
          <Card key={device.id} className="w-full">
            <CardHeader>
              <CardTitle>Device Information</CardTitle>
              <CardDescription>Details of your device.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Marca:</strong> {device.brand}
              </p>
              <p>
                <strong>Modelo:</strong> {device.model}
              </p>
              <p>
                <strong>Falla:</strong> {device.fail}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Deploy</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CardDevices;
