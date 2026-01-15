import { cva } from "class-variance-authority";

const DotBadgeVariants = cva(
    "flex items-center justify-center rounded-[1000px]",
    {
      variants: {
        size: {
          sm: "w-1 h-1",
          md: "w-1.5 h-1.5",
          lg: "w-2 h-2",
        },
        
        variant: {
          surface: "",
          data: "",
          accent: "",
        },
      },

      compoundVariants: [
        // surface
        {
          variant: "surface",
          class: "bg-peak",
        },
        {
          variant: "surface",
          class: "bg-surface",
        },
        // accent
        {
          variant: "accent",
          class: "bg-accent-peak",
        },
        {
          variant: "accent",
          class: "bg-accent-surface",
        },
        // data
        {
          variant: "data",
          class: "bg-data-peak",
        },
        {
          variant: "data",
          class: "bg-data-surface",
        },
      ],
    }
);

interface DotBadgeProps {
  size: "sm" | "md" | "lg",
  variant: "surface" | "accent" | "data" ,
}

export default function DotBadge({ size, variant } : DotBadgeProps) {
    return (
      <div className={DotBadgeVariants({ size: size, variant: variant })}/>
    )
}