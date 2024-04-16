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

export function FormDeviceCheck({
  formData,
  setFormData,
  handleNextStep,
  handleChange,
}) {
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
    if (selectedBrand !== "") {
      //console.log("PETICION GET DE LOS MODELOS DE LA MARCA SELECCIONADA");
      fetch(
        `http://localhost:3001/api/models/getModelsByBrand?brand=${selectedBrand}`
      )
        .then((response) => response.json())
        .then((data) => setModels(data));
    }
    //console.log("EN EL USE EFFECT DE SELECTBRAND");
  }, [selectedBrand]);

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

  /* useEffect(() => {
    setSelectedBrand(brand || undefined);
  }, [brand]);

  useEffect(() => {
    setSelectedModel(model || undefined);
  }, [model]);

  useEffect(() => {
    setSelectedFailure(failure || undefined);
  }, [failure]); */

  // Aquí puedes agregar console.log para consoluegar el estado global
  //console.log("Estado global - Marca:", brand);
  //console.log("Estado global - Modelo:", model);
  //console.log("Estado global - Falla:", failure);

  //console.log("MARCA SELECCIONADA", selectedBrand);
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
            <Select
              required
              onValueChange={handleBrandChange}
              value={selectedBrand}
            >
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
              value={selectedModel}
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
      <CardFooter className="flex justify-end">
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
