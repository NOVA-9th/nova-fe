import { cva, VariantProps } from "class-variance-authority";
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

interface ItemListProps extends VariantProps<typeof ItemListVariants> {
  label: string,
  subLabel?: string,
  description?: string,
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  className?: string
}

const ItemList = ({ size, align, label, subLabel, description, leftIcon, rightIcon, className } : ItemListProps) => {
    return (
      <div className={cn(ItemListVariants({ size, align }), className)}>
        <div className={`flex flex-col ${align === "Center" ? "justify-center" : "justify-start"} items-center`}>
            { leftIcon && leftIcon }
        </div>
        <div className="flex flex-col items-start justify-center">
            { subLabel && <span className="typo-footnote-base text-optional">{subLabel}</span>}
            <span className="typo-callout-base text-base-color">{label}</span>
            { description && <span className="typo-footnote-base text-additive">{description}</span>}
        </div>
        <div className={`flex flex-col ${align === "Center" ? "justify-center" : "justify-start"} items-center`}>
            { rightIcon && rightIcon }
        </div>
      </div>
    )
}

export default ItemList;