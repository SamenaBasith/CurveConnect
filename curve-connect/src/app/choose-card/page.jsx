"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import greetingCardData from "@/constants/greetingCardData";

export default function ChooseCardPage() {
  const steps = ["Choose Card", "Add Details", "Confirm & Send"];

  const [activeStep, setActiveStep] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState({
    senderEmail: "",
    recipientEmail: "",
    message: "",
    signature: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [savedData, setSavedData] = useState(null);

  const [validationErrors, setValidationErrors] = useState([]);

  const selectedCard =
    greetingCardData.find((card) => card.id === selectedId) || null;

  function handleSelect(id) {
    setSelectedId(id);
  }

  function handleNextFromSelect() {
    if (!selectedId) {
      setSnack({
        open: true,
        severity: "warning",
        message: "Please select a card before continuing.",
      });
      return;
    }
    setActiveStep(1);
  }

  function handleBackFromDetails() {
    setActiveStep(0);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function validateForm() {
    const errors = [];

    const emailRegex = /^[a-zA-Z0-9._%+-]+@kpmg\..+$/;
    // Basic validation — replace with more robust approach if needed

    if (!selectedId) errors.push("Please select a card design");

    if (!form.senderEmail || !emailRegex.test(form.senderEmail)) {
      errors.push("Sender email must be a valid KPMG email address");
    }

    if (
      !form.recipientEmail ||
      !emailRegex.test(form.recipientEmail)
    ) {
      errors.push(
        "Recipient email must be a valid KPMG email address"
      );
    }

    if (!form.message || form.message.trim().length < 3) {
      errors.push(
        "Please enter a short personalised message (at least 3 characters)."
      );
    }

    if (!form.signature || form.signature.trim().length < 1) {
      errors.push("Please provide your name or signature.");
    }

    return errors;
  }

  function handleOpenConfirmPopup() {
    const errors = validateForm();
    setValidationErrors(errors);

    if (errors.length > 0) {
      setModalOpen(false);
    }

    setModalOpen(true);
  }

  function handleFinalConfirm() {
    const payload = {
      selectedCard,
      ...form,
      savedAt: new Date().toISOString(),
    };
    setSavedData(payload);
    setModalOpen(false);
    setSnack({
      open: true,
      severity: "success",
      message: "Saved — ready to send via SendGrid.",
    });
    setActiveStep(2);
  }

  function ResetAll() {
    setActiveStep(0);
    setSelectedId(null);
    setForm({
      senderEmail: "",
      recipientEmail: "",
      message: "",
      signature: "",
    });
    setSavedData(null);
  }

  useEffect(() => {
    console.log("active step: ", activeStep);
  }, [activeStep]);

  return (
    <div className="p-4 md:p-8 pb-20">
      {/* Stepper at top */}
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{ mb: 4 }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Step 0 — choose card */}
      {activeStep === 0 && (
        <>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Choose a card design
          </Typography>

          {/* responsive grid: 1 column on xs, 2 on sm, 3 on md+ */}
          <Grid container spacing={2}>
            {greetingCardData.map((card) => {
              const isSelected = card.id === selectedId;
              return (
                <Card
                  key={card.id}
                  className={`cursor-pointer transition-all ${
                    isSelected
                      ? "ring-2 ring-blue-600"
                      : "ring-1 ring-gray-300"
                  }`}
                  sx={{ borderRadius: 3 }}
                  onClick={() => handleSelect(card.id)}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={card.src}
                      alt={card.alt}
                      sx={{ height: 160, objectFit: "cover" }}
                    />
                    <CardContent sx={{ textAlign: "center", p: 1 }}>
                      <Typography variant="body2">
                        {card.alt}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              );
            })}
          </Grid>

          {/* Bottom centre confirm button */}
          <Box>
            <div className="flex flex-col items-center gap-3 mt-6 mb-10">
              <Button
                variant="contained"
                className="bg-blue-600 hover:bg-blue-700 text-white normal-case px-6 py-2 rounded-lg shadow-md"
                onClick={handleNextFromSelect}
                disabled={!selectedId}
              >
                Confirm Selection
              </Button>
              <Button
                variant="outlined"
                className="normal-case px-6 py-2 rounded-lg"
                onClick={ResetAll}
              >
                Reset
              </Button>
            </div>
          </Box>
        </>
      )}

      {/* Step 1 — details form */}
      {activeStep === 1 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="h6">Add your details</Typography>

          {/* Show chosen image at centre */}
          {selectedCard && (
            <Card sx={{ width: { xs: "100%", sm: 360 }, mb: 2 }}>
              <CardMedia
                component="img"
                height="200"
                image={selectedCard.src}
                alt={selectedCard.alt}
              />
              <CardContent>
                <Typography variant="body2">
                  {selectedCard.alt}
                </Typography>
              </CardContent>
            </Card>
          )}

          <Box
            sx={{
              width: "100%",
              maxWidth: 640,
              display: "grid",
              gap: 2,
            }}
          >
            <TextField
              label="Your email"
              name="senderEmail"
              value={form.senderEmail}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Recipient email"
              name="recipientEmail"
              value={form.recipientEmail}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Personal message"
              name="message"
              value={form.message}
              onChange={handleChange}
              multiline
              minRows={4}
              fullWidth
            />
            <TextField
              label="Signature (your name)"
              name="signature"
              value={form.signature}
              onChange={handleChange}
              fullWidth
            />
          </Box>

          {/* Validation Errors */}
          {validationErrors && validationErrors.length > 0 && (
            <div className="mb-4 bg-red-50 border border-red-300 rounded-lg p-4">
              {validationErrors.map((err, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 mb-1 text-red-700"
                >
                  <span className="text-red-600 font-bold">✖</span>
                  <p className="text-sm">{err}</p>
                </div>
              ))}
            </div>
          )}

          {/* Bottom centre: Back + Confirm inputs */}
          <Box>
            <div className="flex flex-col items-center gap-3 mt-6 mb-10">
              <Button
                variant="outlined"
                onClick={handleBackFromDetails}
                className="normal-case px-6 py-2 rounded-lg"
              >
                Back
              </Button>

              <Button
                variant="contained"
                onClick={handleOpenConfirmPopup}
                className="bg-blue-600 hover:bg-blue-700 text-white normal-case px-6 py-2 rounded-lg shadow-md"
                disabled={
                  validationErrors.length > 0 ||
                  form.senderEmail === "" ||
                  form.recipientEmail === "" ||
                  form.message === "" ||
                  form.signature === ""
                }
              >
                Review & Confirm
              </Button>
            </div>
          </Box>
        </Box>
      )}

      {/* Step 2 — final saved state (after confirming in modal) */}
      {activeStep === 2 && savedData && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="h6">Ready to send</Typography>
          <Card sx={{ width: { xs: "100%", sm: 420 } }}>
            <CardMedia
              component="img"
              height="300"
              image={savedData.selectedCard.src}
              alt={savedData.selectedCard.alt}
            />
            <CardContent>
              <Typography variant="subtitle1">
                To: {savedData.recipientEmail}
              </Typography>
              <Typography
                variant="body2"
                sx={{ whiteSpace: "pre-wrap", mt: 1 }}
              >
                {savedData.message}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                — {savedData.signature}
              </Typography>
            </CardContent>
          </Card>

          <Typography sx={{ mt: 1 }}>
            Your data is ready. Call your SendGrid function on the
            server to send the card.
          </Typography>

          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Button
              variant="outlined"
              onClick={() => setActiveStep(1)}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              onClick={() =>
                setSnack({
                  open: true,
                  severity: "info",
                  message:
                    "Pretend sending... (implement server SendGrid call)",
                })
              }
            >
              Send (placeholder)
            </Button>
          </Box>
        </Box>
      )}

      {/* Confirmation modal (step 1 -> popup) */}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle className="text-lg font-semibold text-gray-800">
          Confirm Your Inputs
        </DialogTitle>

        <DialogContent className="space-y-4">
          {selectedCard && (
            <Card
              className="shadow-md rounded-xl overflow-hidden"
              sx={{ mb: 2 }}
            >
              <CardMedia
                component="img"
                height="180"
                className="h-48 object-cover"
                image={selectedCard.src}
                alt={selectedCard.alt}
              />
              <CardContent>
                <Typography className="text-gray-700 text-center">
                  {selectedCard.alt}
                </Typography>
              </CardContent>
            </Card>
          )}

          <div>
            <Typography
              variant="subtitle2"
              className="font-semibold text-gray-700"
            >
              From
            </Typography>
            <Typography sx={{ mb: 1 }} className="text-gray-600">
              {form.senderEmail}
            </Typography>
          </div>

          <div>
            <Typography
              variant="subtitle2"
              className="font-semibold text-gray-700"
            >
              To
            </Typography>
            <Typography sx={{ mb: 1 }} className="text-gray-600">
              {form.recipientEmail}
            </Typography>
          </div>

          <div>
            <Typography
              variant="subtitle2"
              className="font-semibold text-gray-700"
            >
              Message
            </Typography>
            <Typography className="text-gray-600 whitespace-pre-wrap">
              {form.message}
            </Typography>
          </div>

          <div>
            <Typography
              variant="subtitle2"
              className="font-semibold text-gray-700"
            >
              Signature
            </Typography>
            <Typography sx={{ mb: 2 }} className="text-gray-600">
              {form.signature}
            </Typography>
          </div>
        </DialogContent>

        <DialogActions className="flex justify-end gap-2 p-4">
          <Button
            onClick={() => setModalOpen(false)}
            className="normal-case"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            className="normal-case"
            onClick={handleFinalConfirm}
          >
            Confirm & Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
