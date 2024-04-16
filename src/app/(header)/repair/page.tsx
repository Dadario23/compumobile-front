"use client";
import React, { useState } from "react";
import SelectDateTime from "@/components/SelectDateTime";
import SummaryConfirmation from "@/components/SummaryConfirmation";
import { FormDeviceCheck } from "@/components/FormDeviceCheck";

const RepairForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    failure: "",
    date: "",
  });

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos al servidor o realizar cualquier otra acción necesaria
    console.log("Datos del formulario:", formData);
    // Lógica para enviar datos o realizar otras acciones
  };

  return (
    <div>
      {step === 1 && (
        <FormDeviceCheck
          formData={formData}
          setFormData={setFormData}
          handleNextStep={handleNextStep}
          handleChange={handleChange} // Pasar handleChange a FormDeviceCheck
        />
      )}
      {step === 2 && (
        <SelectDateTime
          formData={formData}
          setFormData={setFormData}
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
          handleChange={handleChange} // Pasar handleChange a SelectDateTime
        />
      )}
      {step === 3 && (
        <SummaryConfirmation
          formData={formData}
          handlePrevStep={handlePrevStep}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default RepairForm;
