import * as React from "react";
import { cn } from "@/lib/utils";

interface ImageLoaderProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholder?: string;
  lazy?: boolean;
  priority?: boolean;
}

export const ImageLoader = React.forwardRef<HTMLImageElement, ImageLoaderProps>(
  (
    {
      src,
      alt,
      width,
      height,
      className,
      placeholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=",
      lazy = true,
      priority = false,
      ...props
    },
    ref
  ) => {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [isError, setIsError] = React.useState(false);

    return (
      <div
        className={cn("relative overflow-hidden", className)}
        style={{ width, height }}
      >
        {(!isLoaded || isError) && (
          <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
            {placeholder && (
              <img
                src={placeholder}
                alt=""
                className="w-full h-full object-cover"
                aria-hidden="true"
              />
            )}
          </div>
        )}
        <img
        ref={ref}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={lazy ? "lazy" : "eager"}
        decoding="async" // Add this to prevent decode blocking
        fetchpriority={priority ? "high" : "auto"}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          isLoaded && !isError ? "opacity-100" : "opacity-0"
        )}
        style={{
          contentVisibility: 'auto', // Helps with rendering performance
          willChange: 'opacity' // Optimizes the opacity transition
        }}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsError(true)}
        {...props}
      />
      </div>
    );
  }
);

ImageLoader.displayName = "ImageLoader";
