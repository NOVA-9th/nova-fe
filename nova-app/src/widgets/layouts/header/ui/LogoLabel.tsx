import { memo } from 'react';
import { Logo, NovaLabel } from '@/shared/assets';

export const LogoLabel = memo(function HeaderBrand({ onClick }: { onClick: () => void }) {
  return (
    <button
      type='button'
      aria-label='Go to home'
      className='flex items-center gap-3.5 text-base-color px-2'
      onClick={onClick}
    >
      <Logo width={36} height={36} />
      <NovaLabel className='text-base-color' width={60} height={15.83} />
    </button>
  );
});
