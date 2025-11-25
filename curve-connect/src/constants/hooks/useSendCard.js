import { useState } from "react";
import { useRouter } from "next/navigation";

export default function useSendCard(selectedId, selectedCard) {
  const router = useRouter();

  const [form, setForm] = useState({ recipientEmail: "", message: "", signature: "" });
  const [status, setStatus] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const validateForm = () => {
    const errors = [];
    if (!form.recipientEmail.includes("@")) errors.push("Enter a valid recipient email");
    if (!form.message || form.message.trim().length < 3) errors.push("Message must be at least 3 characters");
    if (!form.signature || form.signature.trim().length < 1) errors.push("Signature is required");
    return errors;
  };

  const openModal = () => {
    const errors = validateForm();
    setValidationErrors(errors);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const confirmSend = async () => {
    const errors = validateForm();
    setValidationErrors(errors);
    if (errors.length > 0) return;

    setModalOpen(false);
    setStatus("Sending...");

    try {
      const res = await fetch("/api/send-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId: selectedId, ...form, cardSrc: selectedCard.src }),
      });

      if (res.ok) {
        router.push("/card-sent");
        setForm({ recipientEmail: "", message: "", signature: "" });
      } else {
        const data = await res.json();
        setStatus(`Error sending card: ${data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error(err);
      setStatus("Error sending card");
    }
  };

  return {
    form,
    status,
    modalOpen,
    validationErrors,
    handleChange,
    openModal,
    closeModal,
    confirmSend,
  };
}
