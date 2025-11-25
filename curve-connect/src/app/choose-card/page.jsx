"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import greetingCardData from "@/constants/greetingCardData";
import SelectCard from "@/components/selectCard";
import StepperComponent from "@/components/Stepper";
import { Typography, Button, Grid } from "@mui/material";

export default function ChooseCardPage() {
  const [selectedId, setSelectedId] = useState(null);
  const router = useRouter();
  const steps = ["Select Card", "Add Details", "Confirmation"];

  const handleConfirm = () => {
    if (!selectedId) return;
    router.push(`/send-card?template=${selectedId}`);
  };

  const handleReset = () => setSelectedId(null);

  return (
    <div className="p-10 max-w-1xl flex flex-col items-center justify-center">
      <StepperComponent activeStep={0} />
      <Typography
        variant="h5"
        sx={{
          mb: 6,
          fontWeight: "bold",
          color: "#0047AB",
          mx: "auto",
          textAlign: "center",
        }}
      >
        Choose a Card Template
      </Typography>

      <Grid container spacing={2}>
        {greetingCardData.map((card) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={card.id}>
              <SelectCard
                card={card}
                selected={card.id === selectedId}
                onSelect={setSelectedId}
              />
            </Grid>
          );
        })}
      </Grid>

      <div className="flex gap-4 justify-center mt-6">
        <Button
          variant="contained"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          onClick={handleConfirm}
          disabled={!selectedId}
        >
          Confirm Selection
        </Button>
        <Button
          variant="contained"
          className="px-6 py-2 rounded-lg"
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
