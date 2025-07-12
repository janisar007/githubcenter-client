// components/Toast.tsx

import { toast, Toaster } from "sonner";
import type { ToastT } from "sonner";

interface ToastProps {
  message: string;
  type?: ToastT["type"];
  duration?: number;
}

export const Toast = ({ message, type = "info", duration = 6000 }: ToastProps) => {
  return toast(message, {
    duration,
    position: "top-center",
    action: {
      label: "Dismiss",
      onClick: () => toast.dismiss(),
    },
  });
};

export const ToastProvider = () => {
  return (
    <Toaster
      position="top-center"
      visibleToasts={1}
      toastOptions={{
        duration: 6000,
      }}
    />
  );
};