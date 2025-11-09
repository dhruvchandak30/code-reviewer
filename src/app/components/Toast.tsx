"use client";
import { useState } from "react";

export function useToast() {
  const [message, setMessage] = useState<string | null>(null);
  const show = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  };
  const Toast = () =>
    message ? (
      <div className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded">
        {message}
      </div>
    ) : null;
  return { show, Toast };
}
