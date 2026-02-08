'use client';

import { Button } from '@/shared/ui';
import { AlertTriangle } from 'lucide-react';

type FeedArticleErrorProps = {
  onRetry?: () => void;
};

const FeedArticleError = ({ onRetry }: FeedArticleErrorProps) => {
  return (
    <article className='flex w-full flex-col gap-4 rounded-static-frame border border-outline bg-white p-5'>
      <div className='flex items-center gap-3'>
        <div className='flex h-10 w-10 items-center justify-center rounded-full bg-surface'>
          <AlertTriangle size={18} />
        </div>
        <div className='flex flex-col gap-1'>
          <p className='typo-title-base text-base'>피드를 불러오지 못했어요</p>
          <p className='typo-body-base text-optional'>
            네트워크 상태를 확인하거나 잠시 후 다시 시도해 주세요.
          </p>
        </div>
      </div>

      <div className='flex items-center justify-end gap-2'>
        <Button
          label='다시 시도'
          style='accent'
          peak={false}
          size='lg'
          onClick={() => onRetry?.()}
        />
      </div>
    </article>
  );
};

export default FeedArticleError;
