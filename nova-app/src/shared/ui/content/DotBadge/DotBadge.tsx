import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";

const DotBadgeVariants = cva(
    "flex items-center justify-center rounded-static-pill",
    {
      variants: {
        size: {
          sm: "w-1 h-1",
          md: "w-1.5 h-1.5",
          lg: "w-2 h-2",
        },
        
        variant: {
          surface: "bg-peak",
          data: "bg-accent-peak",
          accent: "bg-data-peak",
        },
      },
    }
);

interface DotBadgeProps extends VariantProps<typeof DotBadgeVariants> {
  className?: string;
}

const DotBadge = ({ size, variant, className }: DotBadgeProps) => {
    return (
      <div className={cn(DotBadgeVariants({ size, variant }), className)}/>
    )
}

export default DotBadge;