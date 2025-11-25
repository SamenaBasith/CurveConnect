"use client";

import { useRouter } from "next/navigation";
import { Button} from "@mui/material";
import StepperComponent from "@/components/Stepper";

export default function CardSentPage() {
  const router = useRouter();
  const steps = ["Select Card", "Add Details", "Confirmation"];

  return (
    <div className="p-10 flex flex-col items-center justify-center">
      <StepperComponent activeStep={2} />
      <div className="w-60 h-60 rounded-full bg-green-100 flex items-center justify-center">
        <svg
          className="w-20 h-20 text-green-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h1 className="p-10 text-2xl font-bold text-green-700">
        Card Sent Successfully!
      </h1>

      <Button
        variant="contained"
        className="bg-blue-600 hover:bg-blue-700"
        onClick={() => router.push("/choose-card")}
      >
        Send Another Card
      </Button>
    </div>
  );
}
