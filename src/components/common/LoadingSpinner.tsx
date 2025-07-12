import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const spinnerVariants = cva(
  "animate-spin rounded-full border-solid border-t-transparent",
  {
    variants: {
      size: {
        sm: "h-5 w-5 border-2",
        default: "h-10 w-10 border-4",
        lg: "h-14 w-14 border-[6px]",
      },
      color: {
        default: "border-gray-900 dark:border-gray-50",
        primary: "border-primary",
        destructive: "border-destructive",
        muted: "border-muted-foreground",
      },
    },
    defaultVariants: {
      size: "default",
      color: "default",
    },
  }
)

interface LoadingSpinnerProps 
  extends VariantProps<typeof spinnerVariants> {
  className?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size,
  color,
  className,
}) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={cn(spinnerVariants({ size, color, className }))}
        aria-label="Loading"
      />
    </div>
  )
}