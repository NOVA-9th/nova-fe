import { cva } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";

const ItemListVariants = cva(
    "flex justify-center p-2",
    {
      variants: {
        size: {
          md: "gap-1.5 typo-subhead-key",
          lg: "gap-2 typo-headline-key",
        },

        align: {
          Center: "justify-center",
          Top: "justify-start",
        },
      },
    }
);

interface ItemListProps {
  size: "md" | "lg",
  align: "Center" | "Top",
  Label: string,
  SubLabel?: string,
  Description?: string,
  LeftIcon?: React.ReactNode
  RightIcon?: React.ReactNode
  className?: string
}

export default function ItemList({ size, align, Label, SubLabel, Description, LeftIcon, RightIcon, className } : ItemListProps) {
    return (
      <div className={cn(ItemListVariants({ size: size, align: align }), className)}>
        <div className={`flex flex-col ${align === "Center" ? "justify-center" : "justify-start"} items-center`}>
            { LeftIcon && LeftIcon }
        </div>
        <div className="flex flex-col items-start justify-center">
            { SubLabel && <span className="typo-footnote-base text-optional">{SubLabel}</span>}
            <span className="typo-callout-base text-base">{Label}</span>
            { Description && <span className="typo-footnote-base text-additive">{Description}</span>}
        </div>
        <div className={`flex flex-col ${align === "Center" ? "justify-center" : "justify-start"} items-center`}>
            { RightIcon && RightIcon }
        </div>
      </div>
    )
}