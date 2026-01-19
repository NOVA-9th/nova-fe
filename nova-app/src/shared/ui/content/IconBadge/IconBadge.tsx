import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";

const IconBadgeVariants = cva(
    "flex items-center justify-center rounded-static-pill",
    {
      variants: {
        size: {
          sm: "w-4 h-4",
          md: "w-4.5 h-4.5",
          lg: "w-5 h-5",
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
          class: "bg-surface text-base-color",
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

interface IconBadgeProps extends VariantProps<typeof IconBadgeVariants> {
  icon: React.ReactNode
  className?: string
}

/*
* 아이콘은 sm 사이즈에서 11px, md 사이즈에서 12px, lg 사이즈에서 13px 크기로 적용할 것.
*/

const IconBadge = ({ size, variant, peak, icon, className }: IconBadgeProps) => {
    return (
      <div className={cn(IconBadgeVariants({ size, variant, peak }), className)}>
        {icon}
      </div>
    )
}

export default IconBadge;