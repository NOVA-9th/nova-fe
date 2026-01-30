import { LucideIcon } from 'lucide-react';
import React from 'react';

interface SavedStaticsProps {
  icon: LucideIcon;
  label: string;
  value: number;
}

export const SavedStatics = ({ icon, label, value }: SavedStaticsProps) => {
  return (
    <div className='flex w-full h-fit justify-between items-center px-3 py-2.5'>
      <div className='flex w-fit h-fit justify-center items-center typo-body-key text-additive gap-2.5'>
        <span>
          {React.createElement(icon, {
            size: 16,
          })}
        </span>
        <span>{label}</span>
      </div>
      <span className='text-base'>{`${value}개`}</span>
    </div>
  );
};
