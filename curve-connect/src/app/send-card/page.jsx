"use client";

import { Suspense } from "react";
import SendCardContent from "./SendCardContent";

export default function SendCardPage() {
  return (
    <Suspense fallback={<p className="text-center p-6 ">Loading...</p>}>
      <SendCardContent />
    </Suspense>
  );
}

// Page wrapper (SendCardPage) — Client Component + Suspense
// SendCardContent contains the clinet component with hook (useSearchParams) → no CSR bailout.
// React sees the Client Component suspended and knows how to handle it.
