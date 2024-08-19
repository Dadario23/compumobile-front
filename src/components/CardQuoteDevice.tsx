"use client";
import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  setBrand,
  setDate,
  setFailure,
  setIdHour,
  setModel,
  setTime,
} from "@/slices/deviceAndAppointmentSlice";
import {
  getPriceByBrandAndModel,
  getUniqueBrandsWithId,
  getModelsByBrand,
} from "../services/googleSheetService";
import { BudgetDialog } from "./BudgetDialog ";

const CardQuoteDevice = () => {
  const dispatch = useDispatch();
  const { brand, model, failure } = useSelector(
    (state) => state.deviceAndAppointment
  );
  const { id: userId } = useSelector((state) => state.user);

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
    // Obtener las marcas únicas al montar el componente
    const fetchBrands = async () => {
      try {
        const uniqueBrands = await getUniqueBrandsWithId(); // Llama a la función para obtener las marcas
        console.log("marcas", uniqueBrands);
        setBrands(uniqueBrands);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []);

  useEffect(() => {
    if (selectedBrand !== undefined) {
      // Obtener los modelos filtrados por la marca seleccionada
      const fetchModels = async () => {
        try {
          const models = await getModelsByBrand(selectedBrand);
          setModels(models);
        } catch (error) {
          console.error("Error fetching models:", error);
        }
      };

      fetchModels();
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
    dispatch(setIdHour(""));
    setSelectedBrand("");
    setSelectedModel("");
    setSelectedFailure("");
  };

  const handleSubmit = async () => {
    getPriceByBrandAndModel(selectedBrand, selectedModel).then((price) => {
      console.log("marca seleccionada", selectedBrand);
      console.log("modelo seleccionado", selectedModel);
      if (price) {
        alert(
          `El cambio de pantalla para su equipo ${selectedBrand} ${selectedModel} es de ${price}`
        );
      } else {
        console.log("Producto no encontrado");
      }
    });
    alert("PRESUPUESTANDO EQUIPO");
  };

  return (
    <div className="p-4">
      {/* <h1 className="text-2xl font-bold mb-4">Presupuestá tu equipo</h1> */}
      <Card>
        <CardHeader>
          <CardTitle>Presupuestar reparación</CardTitle>
          <CardDescription>Obtené el presupuesto en el momento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            {/* RENDER MARCAS */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="brand">Marca</Label>
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
                  <SelectItem value="no-image">Cambio de pantalla</SelectItem>
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
            onClick={handleSubmit}
            disabled={!selectedBrand || !selectedModel || !selectedFailure}
          >
            Presupuestar
          </Button>
          <BudgetDialog />
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardQuoteDevice;
