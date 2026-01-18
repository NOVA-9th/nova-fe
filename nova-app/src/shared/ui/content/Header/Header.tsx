import { cva } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";

const HeaderVariants = cva(
    "flex flex-col items-start justify-center",
    {
      variants: {
        size: {
          md: "gap-1 py-1 px-1",
          lg: "gap-1.5 py-1.5 px-1",
        },
      },
    }
);

interface HeaderProps {
  size: "md" | "lg",
  SubLabel?: string,
  Label: string,
  Description?: string,
  className?: string
}

export default function Header({ size, SubLabel, Label, Description, className } : HeaderProps) {
    return (
      <div className={cn(HeaderVariants({ size: size }), className)}>
        {SubLabel && <span className="typo-callout-base text-optional">{SubLabel}</span>}
        <span className={`${size === "md" ? "typo-headline-strong" : "typo-title-strong"} text-base `}>{Label}</span>
        {Description && <span className="typo-body-base text-additive">{Description}</span>}
      </div>
    )
}