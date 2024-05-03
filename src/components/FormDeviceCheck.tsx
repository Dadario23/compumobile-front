"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  setBrand,
  setModel,
  setFailure,
  setDate,
  setTime,
} from "@/src/slices/deviceAndAppointmentSlice";
import { useDispatch, useSelector } from "react-redux";

interface Model {
  id: number;
  name: string;
}

interface Brand {
  id: number;
  name: string;
}

export function FormDeviceCheck({ handleNextStep }) {
  const dispatch = useDispatch();
  const { brand, model, failure } = useSelector(
    (state) => state.deviceAndAppointment
  );

  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>(
    brand || undefined
  ); // Inicializar con la marca seleccionada del estado global si está disponible
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState<string | undefined>(
    model || undefined
  ); // Inicializar con el modelo seleccionado del estado global si está disponible
  const [selectedFailure, setSelectedFailure] = useState<string | undefined>(
    failure || undefined
  ); // Inicializar con la falla seleccionada del estado global si está disponible

  useEffect(() => {
    // Realizar una solicitud HTTP al endpoint de marcas
    fetch("http://localhost:3001/api/brands/getAllBrands")
      .then((response) => response.json())
      .then((data) => setBrands(data));
  }, []);

  useEffect(() => {
    if (selectedBrand !== undefined) {
      fetch(
        `http://localhost:3001/api/models/getModelsByBrand?brand=${selectedBrand}`
      )
        .then((response) => response.json())
        .then((data) => setModels(data))
        .catch((error) => console.error("Error fetching models:", error));
      setSelectedModel(undefined);
    }
  }, [selectedBrand]);

  useEffect(() => {
    if (model) {
      setSelectedModel(model);
    }
  }, [model]);

  const handleBrandChange = (value: string | undefined) => {
    dispatch(setBrand(value));
    setSelectedBrand(value);
  };

  const handleModelChange = (value: string | undefined) => {
    dispatch(setModel(value));
    setSelectedModel(value);
  };

  const handleFailureChange = (value: string | undefined) => {
    dispatch(setFailure(value));
    setSelectedFailure(value);
  };

  const handleClear = () => {
    dispatch(setBrand(""));
    dispatch(setModel(""));
    dispatch(setFailure(""));
    dispatch(setDate(""));
    dispatch(setTime(""));
    setSelectedBrand("");
    setSelectedModel("");
    setSelectedFailure("");
  };

  return (
    <Card className="max-w-[320px]">
      <CardHeader>
        <CardTitle>Ingrese el equipo que desea reparar</CardTitle>
        <CardDescription>Formulario de ingreso</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          {/* RENDER MARCAS */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="brand">Marca del equipo</Label>
            <Select onValueChange={handleBrandChange} value={selectedBrand}>
              <SelectTrigger id="brand">
                <SelectValue placeholder="Select" />
                <SelectContent position="popper">
                  {brands.map((brand) => (
                    <SelectItem key={brand.id} value={brand.name}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectTrigger>
            </Select>
          </div>
          {/*  RENDER MODELOS */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="model">Modelo</Label>

            <Select
              disabled={!selectedBrand}
              onValueChange={handleModelChange}
              value={!selectedBrand ? "" : selectedModel}
            >
              <SelectTrigger id="model">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="popper">
                {models.length > 0 &&
                  models.map((model) => (
                    <SelectItem key={model.id} value={model.name}>
                      {model.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          {/*  RENDER FALLAS */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="issue">Falla</Label>
            <Select
              disabled={!selectedBrand || !selectedModel}
              onValueChange={handleFailureChange}
              value={selectedFailure}
            >
              <SelectTrigger id="issue">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="no-charge">No carga</SelectItem>
                <SelectItem value="no-image">No da imagen</SelectItem>
                <SelectItem value="logo-stuck">Se queda en el logo</SelectItem>
                <SelectItem value="not-turning-on">No enciende</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handleClear} disabled={!selectedBrand}>
          Limpiar
        </Button>
        <Button
          onClick={handleNextStep}
          disabled={!selectedBrand || !selectedModel || !selectedFailure}
        >
          Continuar
        </Button>
      </CardFooter>
    </Card>
  );
}
