import React from 'react';
import { cn } from '@/lib/utils'; // Your classname utility

type SkeletonVariant = 
  | 'rectangle'
  | 'circle'
  | 'text'
  | 'custom';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
  rounded?: number | string;
  lines?: number;
  gap?: number | string;
  animation?: 'pulse' | 'wave' | 'none';
  className?: string;
  children?: React.ReactNode;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = 'rectangle',
      width,
      height,
      rounded,
      lines = 1,
      gap = '0.5rem',
      animation = 'pulse',
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Handle different variants
    const getVariantStyles = () => {
      const baseStyles = 'bg-gray-200 dark:bg-gray-700 overflow-hidden';
      
      switch (variant) {
        case 'circle':
          return cn(baseStyles, 'rounded-full', className);
        case 'text':
          return cn(baseStyles, 'h-4 rounded', className);
        case 'custom':
          return cn(baseStyles, className);
        default: // rectangle
          return cn(baseStyles, 'rounded', className);
      }
    };

    // Handle animation
    const getAnimationStyles = () => {
      switch (animation) {
        case 'pulse':
          return 'animate-pulse';
        case 'wave':
          return 'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-300/30 before:to-transparent';
        default:
          return '';
      }
    };

    // Handle custom dimensions and rounding
    const style = {
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      borderRadius: typeof rounded === 'number' ? `${rounded}px` : rounded,
    };

    if (variant === 'text' && lines > 1) {
      return (
        <div className="flex flex-col" style={{ gap }}>
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              ref={ref}
              className={cn(
                getVariantStyles(),
                getAnimationStyles(),
                i === lines - 1 ? 'w-full' : 'w-full',
                className
              )}
              style={i === lines - 1 ? { ...style, width: width || '100%' } : style}
              {...props}
            />
          ))}
        </div>
      );
    }

    if (children) {
      return (
        <div
          ref={ref}
          className={cn(
            'relative',
            getAnimationStyles(),
            className
          )}
          {...props}
        >
          {children}
          <div className={cn(
            'absolute inset-0 bg-gray-200 dark:bg-gray-700',
            getVariantStyles()
          )} style={style} />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          getVariantStyles(),
          getAnimationStyles(),
          className
        )}
        style={style}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

export { Skeleton };

/*
Key Features

    Multiple Variants:

        rectangle - Standard rectangular placeholder

        circle - Circular placeholder (for avatars, icons)

        text - Text line placeholders (supports multiple lines)

        custom - Fully customizable shape using children

    Flexible Dimensions:

        Control width/height with numbers (px) or strings (any CSS unit)

        Custom rounding with rounded prop

    Animation Options:

        pulse - Gentle fade in/out (default)

        wave - Shimmer effect (like Facebook loading)

        none - Static placeholder

    Text Skeleton:

        Generate multiple text lines with lines prop

        Control gap between lines with gap prop

    Custom Children:

        Wrap existing components to create their skeleton versions

        Perfect for complex component skeletons

*/

/*

Usage Examples
    1. Basic Shapes
        <Skeleton variant="rectangle" width={200} height={100} />
        <Skeleton variant="circle" width={50} height={50} />
        <Skeleton variant="text" lines={3} />

    2. Card Skeleton
        <div className="border rounded-lg p-4 w-64">
            <Skeleton variant="rectangle" width="100%" height={150} className="mb-4" />
            <Skeleton variant="text" lines={2} className="mb-2" />
            <Skeleton variant="text" width="60%" />
        </div>

    3. Table Skeleton
        <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex space-x-2">
                <Skeleton variant="rectangle" width={40} height={40} rounded={8} />
                <div className="flex-1 space-y-1">
                    <Skeleton variant="text" width={`${80 + Math.random() * 20}%`} />
                    <Skeleton variant="text" width={`${60 + Math.random() * 30}%`} />
                </div>
                </div>
            ))}
        </div>

    4. Input Skeleton
        <div className="space-y-1">
            <Skeleton variant="text" width="30%" height={16} />
            <Skeleton variant="rectangle" width="100%" height={40} rounded={6} />
        </div>

    5. Custom Component Skeleton
        <Skeleton variant="custom" className="w-full h-20">
            <YourComplexComponent /> // Hidden during loading 
        </Skeleton>

    6. Profile Page Skeleton
        <div className="max-w-md mx-auto">
        <div className="flex items-center space-x-4 mb-6">
            <Skeleton variant="circle" width={80} height={80} />
            <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="70%" />
            <Skeleton variant="text" width="50%" />
            </div>
        </div>
        <div className="space-y-4">
            <Skeleton variant="rectangle" width="100%" height={150} rounded={12} />
            <Skeleton variant="text" lines={4} gap="0.75rem" />
        </div>
        </div>

*/


/*
Customization Options
    Styling:

        Override default colors with className

        Control animation speed with CSS (customize animate-pulse duration)

    Advanced Patterns:

        Combine multiple skeletons for complex layouts

        Use random widths for more natural text skeletons

        Create responsive skeletons with percentage widths

    Performance:

        Lightweight (no external dependencies)

        Optimized for React rendering

    This implementation provides the perfect balance between:

        Flexibility (create any skeleton shape)

        Consistency (uniform loading experience)

        Customization (adapt to any design system)

        Performance (lightweight implementation)

*/
