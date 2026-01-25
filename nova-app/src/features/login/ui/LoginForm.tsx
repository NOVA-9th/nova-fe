import { Header } from '@/shared/ui';
import { Lightbulb } from 'lucide-react';
import { NovaLabel } from '@/shared/assets';
import LoginButton from './LoginButton';

const LoginForm = () => {
  return (
    <main className='w-160 h-107.5 rounded-static-frame p-5 gap-5 flex flex-col items-center justify-center bg-base'>
      <div className='flex gap-2.25 items-center justify-center py-5 px-1 w-150 h-22'>
        <Lightbulb size={36} className='text-base' />
        <NovaLabel className='w-[68.5px] h-[17.5px]' />
      </div>
      <Header
        size='lg'
        label='IT 취준생을 위한 AI 큐레이션 플랫폼'
        description='AI 요약, 트렌드 분석, 맞춤 추천까지'
        className='items-center'
      />
      <div className='flex flex-col gap-2.5 w-150 h-38 justify-center items-center'>
        <LoginButton type='google' />
        <LoginButton type='kakao' />
        <LoginButton type='github' />
      </div>
      <span className='typo-footnote-base text-charcoal-optional'>
        로그인 시 서비스 이용약관 및 개인정보 처리방침에 동의하게 됩니다.
      </span>
    </main>
  );
};

export default LoginForm;
