"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Stepper, Step, StepLabel } from "@mui/material";
import greetingCardData from "@/constants/greetingCardData";

import PreviewCard from "@/components/PreviewCard";
import CardForm from "@/components/CardForm";
import ConfirmModal from "@/components/ConfirmModal";
import useSendCard from "@/constants/hooks/useSendCard";

export default function SendCardPage() {
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("template");

  const [selectedCard, setSelectedCard] = useState(null);
  const { form, status, modalOpen, validationErrors, handleChange, openModal, closeModal, confirmSend } = useSendCard(selectedId);

  const [activeStep, setActiveStep] = useState(1);
  const steps = ["Select Card", "Add Details", "Confirmation"];

  useEffect(() => {
    if (!selectedId) return;
    const card = greetingCardData.find((c) => c.id === selectedId);
    if (!card) return;
    setSelectedCard(card);
  }, [selectedId]);

  if (!selectedCard) return <p className="text-center p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map(label => (
          <Step key={label}><StepLabel>{label}</StepLabel></Step>
        ))}
      </Stepper>

      <PreviewCard card={selectedCard} />
      <CardForm
        form={form}
        onChange={handleChange}
        onReview={openModal}
        onChangeTemplate={() => window.location.href = "/choose-card"} 
        status={status}
      />
      <ConfirmModal
        open={modalOpen}
        onClose={closeModal}
        onConfirm={confirmSend}
        card={selectedCard}
        form={form}
        validationErrors={validationErrors}
      />
    </div>
  );
}
