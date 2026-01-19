import { cva, VariantProps } from "class-variance-authority";
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

interface HeaderProps extends VariantProps<typeof HeaderVariants> {
  label: string;
  subLabel?: string;
  description?: string;
  className?: string;
}

export default function Header({ size, subLabel, label, description, className }: HeaderProps) {
    return (
      <div className={cn(HeaderVariants({ size: size }), className)}>
        {subLabel && <span className="typo-callout-base text-optional">{subLabel}</span>}
        <span className={`${size === "md" ? "typo-headline-strong" : "typo-title-strong"} text-base `}>{label}</span>
        {description && <span className="typo-body-base text-additive">{description}</span>}
      </div>
    )
}