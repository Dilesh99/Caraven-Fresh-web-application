"use client"; // Toaster is a Client Component

import { useToast } from "./use-toast";

export default function Toaster() {
  const { toasts } = useToast();

  return (
    <div className="fixed top-5 right-5 z-50">
      {toasts.map((toast) => (
        <div 
          key={toast.id} 
          className="bg-black text-white p-4 rounded shadow-md mb-2"
        >
          <strong>{toast.title}</strong>
          <p>{toast.description}</p>
        </div>
      ))}
    </div>
  );
}