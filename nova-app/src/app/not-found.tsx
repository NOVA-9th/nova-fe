'use client';

import { ArrowLeft, Frown, Home } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-md w-full text-center'>
        <div className='mb-8'>
          <div className='inline-flex items-center justify-center w-24 h-24 rounded-full bg-slate-200 mb-6'>
            <Frown size={44} className='text-slate-700' />
          </div>
          <h1 className='text-6xl font-bold text-slate-900 mb-2'>404</h1>
          <h2 className='text-2xl font-semibold text-slate-700 mb-4'>페이지를 찾을 수 없습니다</h2>
          <p className='text-slate-600 mb-8'>
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
        </div>

        <div className='flex flex-col sm:flex-row gap-3 justify-center'>
          <Link
            href='/feed'
            className='inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-slate-500 font-medium hover:bg-slate-700 transition-colors'
          >
            <Home size={20} className='text-white' />
            <p className='text-white'>메인으로 돌아가기</p>
          </Link>
          <button
            onClick={() => router.back()}
            className='inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white text-slate-900 font-medium border-2 border-slate-300 hover:border-slate-400 transition-colors'
          >
            <ArrowLeft size={20} />
            이전 페이지
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
