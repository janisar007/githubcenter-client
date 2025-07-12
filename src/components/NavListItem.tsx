import React from "react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface NavListItemProps {
  item: {
    name: string;
    path: string;
    icon: React.ComponentType<{ className?: string }>;
  };
  open: boolean;
  onClick: () => void;
}

export const NavListItem: React.FC<NavListItemProps> = ({
  item,
  open,
  onClick,
}) => {
  const location = useLocation();
  const isActive = location.pathname === item.path;
  const Icon = item.icon;

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          to={item.path}
          onClick={onClick}
          className={cn(
            "flex items-center px-4 py-3 text-sm font-medium transition-colors hover:bg-accent/50",
            isActive ? "bg-accent" : "hover:bg-muted",
            open ? "w-full" : "w-12 justify-center"
          )}
        >
          <Icon
            className={cn(
              "h-5 w-5 flex-shrink-0",
              isActive ? "text-primary" : "text-muted-foreground"
            )}
          />
          {open && (
            <span
              className={cn(
                "ml-3 overflow-hidden transition-all",
                isActive ? "font-semibold" : "font-normal"
              )}
            >
              {item.name}
            </span>
          )}
        </Link>
      </TooltipTrigger>
      {!open && (
        <TooltipContent side="right">
          <p>{item.name}</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
};