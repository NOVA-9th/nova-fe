import {
  Button,
  IconButton,
  ItemList,
  SectionHeader,
  TextIconButton,
  TextInput,
} from '@/shared/ui';
import { LogOut, RefreshCw, UserX, X } from 'lucide-react';
import Image from 'next/image';

interface UserInfoSectionProps {
  name: string;
  description: string;
  image: string;
  value: string;
  setValue: (value: string) => void;
}

export const UserInfoSection = ({
  name,
  description,
  image,
  value,
  setValue,
}: UserInfoSectionProps) => {
  return (
    <section className='flex flex-col justify-start items-start w-full h-full gap-5 bg-base rounded-static-frame p-5'>
      <SectionHeader text='사용자 정보' size='lg' />
      <div className='flex flex-col w-full items-center justify-start p-2 gap-2'>
        <div className='flex w-full items-center justify-start p-2 gap-2'>
          <Image
            src={image}
            alt='User Profile'
            width={40}
            height={40}
            className='rounded-full object-cover bg-black'
          />
          <ItemList size='lg' label={name} description={description} className='px-1 py-0 gap-0' />
        </div>
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
      </div>
      <div className='flex flex-col justify-start items-start w-full gap-5'>
        <div className='flex flex-col justify-start items-start w-full gap-2'>
          <SectionHeader text='이름' />
          <TextInput
            size='md'
            variant='surface'
            data={false}
            value={value}
            onChange={(value) => setValue(value)}
            placeholder={name}
            className='w-full'
          />
        </div>
        <div className='flex flex-col justify-start items-start w-full gap-2'>
          <SectionHeader text='이메일' />
          <TextInput
            size='md'
            variant='surface'
            data={false}
            value={description}
            onChange={() => {}}
            placeholder={description}
            className='w-full'
          />
        </div>
        <div className='flex justify-between items-center w-full gap-4'>
          <TextIconButton
            label='회원 탈퇴'
            size='md'
            style='surface'
            peak={false}
            leftIcon={UserX}
            className='w-full gap-1.5'
          />
          <TextIconButton
            label='로그아웃'
            size='md'
            style='surface'
            peak={false}
            leftIcon={LogOut}
            className='w-full gap-1.5'
          />
        </div>
      </div>
    </section>
  );
};
