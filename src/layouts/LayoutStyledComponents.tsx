// LayoutStyledComponents.tsx
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

// AppBar styles using cva
const appBarVariants = cva(
  "fixed z-50 transition-all duration-300 ease-in-out",
  {
    variants: {
      open: {
        true: "w-[calc(100%-240px)] left-[240px]",
        false: "w-[calc(100%-64px)] left-[64px]"
      }
    },
    defaultVariants: {
      open: false
    }
  }
)

interface AppBarProps extends React.HTMLAttributes<HTMLDivElement>, 
  VariantProps<typeof appBarVariants> {}

export const AppBar = ({ className, open, ...props }: AppBarProps) => (
  <header 
    className={cn(appBarVariants({ open, className }))}
    {...props}
  />
)

// Drawer styles
const drawerVariants = cva(
  "fixed top-0 left-0 h-screen overflow-hidden transition-all duration-300 ease-in-out bg-background border-r",
  {
    variants: {
      open: {
        true: "w-[240px]",
        false: "w-16"
      }
    },
    defaultVariants: {
      open: false
    }
  }
)

interface DrawerProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof drawerVariants> {}

export const Drawer = ({ className, open, ...props }: DrawerProps) => (
  <aside
    className={cn(drawerVariants({ open, className }))}
    {...props}
  />
)

// DrawerHeader component
export const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div 
    className={cn(
      "flex items-center justify-end p-1 min-h-[64px]",
      className
    )}
    {...props}
  />
)