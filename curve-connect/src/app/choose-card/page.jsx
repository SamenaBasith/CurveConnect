"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import greetingCardData from "@/constants/greetingCardData";
import SelectCard from "@/components/SelectCard";
import StepperComponent from "@/components/Stepper";
import { Typography, Button, Grid } from "@mui/material";
import CardFilter from "@/components/CardFilter";

export default function ChooseCardPage() {
  const [selectedId, setSelectedId] = useState(null);
  const router = useRouter();
  const [filter, setFilter] = useState("All");

  // Filter cards before mapping
  const filteredCards =
    filter === "All"
      ? greetingCardData
      : greetingCardData.filter((card) => card.type === filter);

  const handleConfirm = () => {
    if (!selectedId) return;
    router.push(`/send-card?template=${selectedId}`);
  };

  const handleReset = () => setSelectedId(null);

  return (
    <div className="p-10 flex flex-col items-center justify-center">
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
      <CardFilter
        options={["All", "Thank You", "Congratulations", "Birthday", "Christmas", "Values"]}
        selected={filter}
        onChange={setFilter}
      />

      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {filteredCards.map((card) => {
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
