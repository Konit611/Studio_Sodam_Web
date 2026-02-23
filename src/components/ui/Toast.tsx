"use client";

import { useEffect } from "react";

interface ToastProps {
  type: "success" | "error";
  message: string;
  onClose: () => void;
}

const TOAST_DURATION = 3000;

const TYPE_STYLES = {
  success: "bg-primary text-white",
  error: "bg-danger text-white",
};

export default function Toast({ type, message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, TOAST_DURATION);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`animate-slide-up rounded-lg px-4 py-3 text-sm font-medium shadow-lg ${TYPE_STYLES[type]}`}
      role="alert"
    >
      {message}
    </div>
  );
}
