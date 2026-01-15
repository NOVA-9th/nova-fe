import { cva } from "class-variance-authority";

const NumberBadgeVariants = cva(
    "flex items-center justify-center px-1 py-0.5 rounded-[1000px]",
    {
      variants: {
        size: {
          sm: "w-4 h-4 typo-caption-base",
          md: "w-4.5 h-4.5 typo-footnote-base",
          lg: "w-5 h-5 typo-callout-base",
        },
        
        variant: {
          surface: "",
          data: "",
          outline: "",
          accent: "",
        },
        
        peak: {
          true: "",
          false: "",
        },

      },

      compoundVariants: [
        // surface + peak 조합
        {
          variant: "surface",
          peak: true,
          class: "bg-peak text-peak",
        },
        {
          variant: "surface",
          peak: false,
          class: "bg-surface text-additive",
        },
        // outline + peak 조합
        {
          variant: "outline",
          peak: true,
          class: "bg-surface text-base border border-outline",
        },
        {
          variant: "outline",
          peak: false,
          class: "bg-white text-additive border border-outline ",
        },
        // accent + peak 조합
        {
          variant: "accent",
          peak: true,
          class: "bg-accent-peak text-accent-peak",
        },
        {
          variant: "accent",
          peak: false,
          class: "bg-accent-surface text-accent-base",
        },
        // data + peak 조합
        {
          variant: "data",
          peak: true,
          class: "bg-data-peak text-data-peak",
        },
        {
          variant: "data",
          peak: false,
          class: "bg-data-surface text-data-base",
        },
      ],
    }
);

interface NumberBadgeProps {
  size: "sm" | "md" | "lg",
  variant: "surface" | "outline" | "accent" | "data" ,
  peak: true | false
  number?: number
}

export default function NumberBadge({ size, variant, peak, number } : NumberBadgeProps) {
    return (
      <div className={NumberBadgeVariants({ size: size, variant: variant, peak: peak })}>
        {number}
      </div>
    )
}