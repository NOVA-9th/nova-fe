import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn';
import React, { memo } from 'react';
import { LucideIcon } from 'lucide-react';
import Image from 'next/image';
import { TextIconButton } from '@/shared/ui';

const ItemListVariants = cva('flex items-center gap-2 px-2 rounded-interactive-default', {
  variants: {
    size: {
      md: 'gap-1.5',
      lg: 'gap-2',
    },
  },
});

interface ItemListProps extends VariantProps<typeof ItemListVariants> {
  label: string;
  description?: string;
  leftIcon?:
    | LucideIcon
    | React.ReactNode
    | string
    | { src: string; width?: number; height?: number };
  rightButton?: {
    label: string;
    leftIcon?: LucideIcon;
    rightIcon?: LucideIcon;
    onClick?: () => void;
    size?: 'sm' | 'md' | 'lg';
    style?: 'surface' | 'outline' | 'accent' | 'data';
    peak?: boolean;
    className?: string;
    disabled?: boolean;
  };
  className?: string;
  leftIconClassName?: string;
}

export const ItemList = memo(
  ({
    size,
    label,
    description,
    leftIcon,
    rightButton,
    className,
    leftIconClassName,
  }: ItemListProps) => {
    return (
      <div className={cn(ItemListVariants({ size }), className)}>
        {leftIcon && (
          <div className='flex items-center justify-center size-5'>
            {typeof leftIcon === 'function' ||
            (leftIcon &&
              typeof leftIcon === 'object' &&
              ('render' in leftIcon || '$$typeof' in leftIcon)) ? (
              React.createElement(leftIcon as LucideIcon, {
                width: 20,
                height: 20,
                className: cn('shrink-0 text-inherit', leftIconClassName),
              })
            ) : typeof leftIcon === 'string' ||
              (leftIcon && typeof leftIcon === 'object' && 'src' in leftIcon) ? (
              <Image
                src={typeof leftIcon === 'string' ? leftIcon : leftIcon.src}
                alt=''
                width={20}
                height={20}
              />
            ) : React.isValidElement(leftIcon) ? (
              leftIcon
            ) : (
              <div className='size-5 flex items-center justify-center'>{String(leftIcon)}</div>
            )}
          </div>
        )}
        <div className='flex flex-col items-start justify-center gap-0.5 px-1 flex-1 min-w-0'>
          <span className='typo-body-base text-base break-keep line-clamp-2'>{label}</span>
          {description && <span className='typo-callout-base text-additive'>{description}</span>}
        </div>
        {rightButton && (
          <TextIconButton
            onClick={rightButton.onClick}
            label={rightButton.label}
            size={rightButton.size || 'md'}
            style={rightButton.style || 'surface'}
            peak={rightButton.peak !== undefined ? rightButton.peak : true}
            leftIcon={rightButton.leftIcon}
            rightIcon={rightButton.rightIcon}
            className={cn('shrink-0', rightButton.className)}
            disabled={rightButton.disabled}
          />
        )}
      </div>
    );
  },
);
