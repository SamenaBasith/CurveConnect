"use client";

import { Suspense } from "react";
import SendCardContent from "./SendCardContent";

export default function SendCardPage() {
  return (
    <Suspense fallback={<p className="text-center p-6">Loading...</p>}>
      <SendCardContent />
    </Suspense>
  );
}
