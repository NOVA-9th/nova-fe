'use client';
import { Button, ItemList, SectionHeader, TextIconButton, TextInput } from '@/shared/ui';
import { RefreshCw, User, X } from 'lucide-react';
import { useState } from 'react';

const ProfilePage = () => {
  const [value, setValue] = useState('김진성');

  return (
    <>
      <header className='flex h-15 p-4 w-full rounded-static-frame bg-alternative'>
        <SectionHeader text='프로필' size='sm' leftIcon={User} className='px-2' />
      </header>
      <div className='flex flex-col w-full h-full justify-start items-center bg-alternative'>
        <div className='flex w-full h-full justify-center items-center px-5 pb-5 gap-4'>
          <section className='flex flex-col justify-start items-start w-full h-full gap-4 bg-white p-5'>
            <SectionHeader text='사용자 정보' size='lg' />
            <ItemList size='md' label='이름' description='디자인 전공 | 프론트엔드' />
            <div className='flex w-full gap-2'>
              <TextIconButton
                label='이미지 삭제'
                size='lg'
                style='data'
                peak={false}
                leftIcon={X}
                className='w-full gap-1.5'
              />
              <TextIconButton
                label='변경'
                size='lg'
                style='surface'
                peak={false}
                leftIcon={RefreshCw}
                className='w-full gap-1.5'
              />
            </div>
            <div className='flex flex-col justify-start items-start w-full gap-5'>
              <div className='flex flex-col justify-start items-start w-full gap-2'>
                <SectionHeader text='이름' />
                <TextInput
                  size='md'
                  variant='surface'
                  data={false}
                  value={value}
                  onChange={() => {}}
                  placeholder={value}
                />
              </div>
              <div className='flex flex-col justify-start items-start w-full gap-2'>
                <SectionHeader text='이메일' />
                <TextInput
                  size='md'
                  variant='surface'
                  data={false}
                  value={value}
                  onChange={() => {}}
                  placeholder={value}
                />
              </div>
              <div className='flex justify-between items-center w-full gap-4'>
                <Button
                  label='회원 탈퇴'
                  size='lg'
                  style='surface'
                  peak={false}
                  className='w-full'
                />
                <Button
                  label='로그아웃'
                  size='lg'
                  style='surface'
                  peak={false}
                  className='w-full'
                />
              </div>
            </div>
          </section>
          <section className='flex flex-col w-full h-full bg-alternative gap-5'></section>
        </div>
        <aside className='flex flex-col justify-start items-start  w-full h-full bg-alternative gap-5'></aside>
      </div>
    </>
  );
};

export default ProfilePage;
