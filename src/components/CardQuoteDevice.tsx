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
import BudgetDialog from "./BudgetDialog ";

const CardQuoteDevice = () => {
  const dispatch = useDispatch();
  const { brand, model, failure } = useSelector(
    (state) => state.deviceAndAppointment
  );

  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>(
    brand || undefined
  );
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState<string | undefined>(
    model || undefined
  );
  const [selectedFailure, setSelectedFailure] = useState<string | undefined>(
    failure || undefined
  );

  const [repairCost, setRepairCost] = useState<number | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const uniqueBrands = await getUniqueBrandsWithId();
        setBrands(uniqueBrands);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []);

  useEffect(() => {
    if (selectedBrand !== undefined) {
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
    const price = await getPriceByBrandAndModel(selectedBrand, selectedModel);
    if (price) {
      const costData = {
        brand: selectedBrand,
        model: selectedModel,
        failure: selectedFailure,
        price,
      };
      setRepairCost(costData);
      setDialogOpen(true); // Abre el diálogo
    } else {
      console.log("Producto no encontrado");
    }
  };

  const isSubmitDisabled = !selectedBrand || !selectedModel || !selectedFailure;

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Presupuestar reparación</CardTitle>
          <CardDescription>Obtené el presupuesto en el momento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            {/* RENDER MARCAS */}
            <div className="flex flex-col space-y-1.5 w-full">
              <Label htmlFor="brand">Marca</Label>
              <Select onValueChange={handleBrandChange} value={selectedBrand}>
                <SelectTrigger id="brand" className="w-full">
                  <SelectValue placeholder="Selecciona la marca" />
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
            <div className="flex flex-col space-y-1.5 w-full">
              <Label htmlFor="model">Modelo</Label>
              <Select
                disabled={!selectedBrand}
                onValueChange={handleModelChange}
                value={!selectedBrand ? "" : selectedModel}
              >
                <SelectTrigger id="model" className="w-full">
                  <SelectValue placeholder="Selecciona el modelo" />
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
            <div className="flex flex-col space-y-1.5 w-full">
              <Label htmlFor="issue">Falla</Label>
              <Select
                disabled={!selectedBrand || !selectedModel}
                onValueChange={handleFailureChange}
                value={selectedFailure}
              >
                <SelectTrigger id="issue" className="w-full">
                  <SelectValue placeholder="Selecciona la falla" />
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
          <BudgetDialog
            cost={repairCost}
            isOpen={isDialogOpen}
            onOpenChange={setDialogOpen}
            onSubmit={handleSubmit}
            disabled={isSubmitDisabled} // Condición para habilitar/deshabilitar el botón
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardQuoteDevice;
