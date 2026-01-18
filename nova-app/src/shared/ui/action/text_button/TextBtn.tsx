import { cn } from '@/shared/utils/cn';
import { VariantProps } from 'class-variance-authority';
import { TextBtnVariants } from '@/shared/ui/action/text_button/textButton.styles';
import { TextBtnIconVariants } from '@/shared/ui/action/text_button/TextBtn.icon.styles';
import { SquareDashed } from 'lucide-react';

interface ButtonProps extends VariantProps<typeof TextBtnVariants> {
  onClick?: () => void;
  label: string;
  className?: string;
  leading?: boolean;
  trailing?: boolean;
}

export const TextBtn = ({
  label,
  onClick,
  className,
  size,
  style,
  leading = false,
  trailing = false,
}: ButtonProps) => {
  return (
    <button onClick={onClick} className={cn(TextBtnVariants({ size, style }), className)}>
      {leading && <SquareDashed className={TextBtnIconVariants({ size, style })} />}
      {label}
      {trailing && <SquareDashed className={TextBtnIconVariants({ size, style })} />}
    </button>
  );
};
