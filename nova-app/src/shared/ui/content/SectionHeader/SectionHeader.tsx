import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";

const SectionHeaderVariants = cva(
    "flex items-center justify-center py-0.5",
    {
      variants: {
        size: {
          sm: "gap-1.5 typo-body-key",
          md: "gap-1.5 typo-subhead-key",
          lg: "gap-2 typo-headline-key",
        },
        
        peak: {
          true: "text-base",
          false: "text-additive",
        },
      },
    }
);

interface SectionHeaderProps extends VariantProps<typeof SectionHeaderVariants> {
  text: string,
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  className?: string
}

export default function SectionHeader({ size, peak, text = "Label", leftIcon, rightIcon, className } : SectionHeaderProps) {
    return (
      <div className={cn(SectionHeaderVariants({ size, peak }), className)}>
        {leftIcon}
        {text}
        {rightIcon}
      </div>
    )
}