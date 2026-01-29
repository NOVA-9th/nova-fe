'use client';

import { showToast } from '@/shared/utils/toast';

const testPage = () => {
  return (
    <div className='bg-base flex min-h-dvh flex-col items-center justify-center gap-5 rounded-interactive-default px-4 text-xl'>
      <button
        onClick={() => {
          showToast.success('아티클이 저장되었습니다!');
        }}
        className='bg-green-500 text-white p-2'
      >
        토스트 띄우기
      </button>
      <button
        onClick={() => {
          showToast.error('아티클이 더이상 노출되지 않습니다!');
        }}
        className='bg-red-500 text-white p-2'
      >
        토스트 띄우기
      </button>
    </div>
  );
};

export default testPage;
