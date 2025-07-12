import React from 'react';
import { cn } from "@/lib/utils";
import { Icons } from '../icons/Icons'; // Assuming you have the spinner icon from shadcn

export const GlobalLoader: React.FC<{ loading: boolean }> = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className={cn(
      "fixed inset-0 z-50 flex items-center justify-center",
      "bg-black/80 text-white backdrop-blur-sm" // semi-transparent dark background with blur
    )}>
      <div className="flex items-center">
        <Icons.spinner className="h-16 w-16 animate-spin" />
        <span className="ml-4 text-lg">Initializing application...</span>
      </div>
    </div>
  );
};