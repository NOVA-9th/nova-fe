'use client';

import { SectionHeader, TextIconButton } from '@/shared/ui';
import { LogOut, RefreshCw, UserX, X } from 'lucide-react';

/**
 * 사용자 정보 섹션 로딩 스켈레톤.
 * UserInfoSection과 동일한 레이아웃, API 정보가 필요한 부분(이미지·이름·이메일)만 스켈레톤, 버튼은 그대로 유지.
 */
export const UserInfoSectionSkeleton = () => {
  return (
    <section className='flex flex-col justify-start items-start w-full gap-5 bg-base rounded-static-frame p-5'>
      <SectionHeader text='사용자 정보' size='lg' />
      <div className='flex flex-col w-full items-center justify-start gap-2'>
        <div className='flex w-full items-center justify-start p-2 gap-2'>
          {/* 프로필 이미지 스켈레톤 */}
          <div
            className='w-12 h-12 rounded-full bg-alternative animate-pulse shrink-0'
            aria-hidden
          />
          {/* 이름·이메일 스켈레톤 (ItemList 자리) */}
          <div className='flex flex-col gap-1.5 flex-1 min-w-0 px-0.5'>
            <div className='h-4 w-24 bg-alternative rounded animate-pulse' aria-hidden />
            <div className='h-3 w-32 bg-alternative rounded animate-pulse' aria-hidden />
          </div>
        </div>
        <div className='flex w-full gap-2'>
          <TextIconButton
            label='이미지 삭제'
            size='lg'
            style='data'
            peak={false}
            leftIcon={X}
            className='w-full gap-1.5 opacity-50 cursor-not-allowed'
            onClick={() => {}}
          />
          <TextIconButton
            label='변경'
            size='lg'
            style='surface'
            peak={false}
            leftIcon={RefreshCw}
            className='w-full gap-1.5 opacity-50 cursor-not-allowed'
            onClick={() => {}}
          />
        </div>
      </div>
      <div className='flex flex-col justify-start items-start w-full gap-5'>
        <div className='flex flex-col justify-start items-start w-full gap-2'>
          <SectionHeader text='이름' />
          <div className='w-full h-11 rounded bg-alternative animate-pulse' aria-hidden />
        </div>
        <div className='flex flex-col justify-start items-start w-full gap-2'>
          <SectionHeader text='이메일' />
          <div className='w-full h-11 rounded bg-alternative animate-pulse' aria-hidden />
        </div>
        <div className='flex justify-between items-center w-full gap-4'>
          <TextIconButton
            label='회원 탈퇴'
            size='lg'
            style='surface'
            peak={false}
            leftIcon={UserX}
            className='w-full gap-1.5 opacity-50 cursor-not-allowed'
            onClick={() => {}}
          />
          <TextIconButton
            label='로그아웃'
            size='lg'
            style='surface'
            peak={false}
            leftIcon={LogOut}
            className='w-full gap-1.5 opacity-50 cursor-not-allowed'
            onClick={() => {}}
          />
        </div>
      </div>
    </section>
  );
};
