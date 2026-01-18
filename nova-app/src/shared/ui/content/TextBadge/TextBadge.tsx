import { cn } from "@/shared/utils/cn";
import { cva } from "class-variance-authority";

const TextBadgeVariants = cva(
    "flex items-center justify-center rounded-static-pill",
    {
      variants: {
        size: {
          sm: "py-0.5 px-1.5 gap-0.5 typo-caption-base",
          md: "py-0.5 px-1.5 gap-0.5 typo-footnote-base",
          lg: "py-0.5 px-2 gap-1 typo-callout-base",
        },
        
        variant: {
          surface: "",
          data: "",
          outline: "border border-outline",
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
          class: "bg-surface text-base",
        },
        {
          variant: "outline",
          peak: false,
          class: "bg-white text-additive",
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

interface TextBadgeProps {
    size: "sm" | "md" | "lg",
    variant: "surface" | "outline" | "accent" | "data" ,
    peak: true | false
    text: string
    icon?: React.ReactNode
    className?: string
}

export default function TextBadge({ size, variant, peak, text = "Label", children, className } : TextBadgeProps & React.PropsWithChildren) {
    return (
      <div className={cn(TextBadgeVariants({ size: size, variant: variant, peak: peak }), className)}>
        <div className="flex items-center justify-center py-[1.5px]">{children}</div>
        <p className="px-0.5">{text}</p>
      </div>
    );
}