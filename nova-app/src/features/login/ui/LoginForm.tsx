import { Header } from '@/shared/ui';
import { Logo, NovaLabel } from '@/shared/assets';
import { LoginButton } from './LoginButton';

export const LoginForm = () => {
  return (
    <main className='w-full h-107.5 rounded-static-frame p-5 gap-5 flex flex-col items-center bg-base max-w-160'>
      <div className='flex flex-col pt-5 gap-1.5 items-center'>
        <div className='flex flex-row w-49.5 h-15 justify-between items-center'>
          <Logo width={60} height={60} />
          <span className='pr-5'>
            <NovaLabel width={108} height={30} />
          </span>
        </div>
        <Header
          size='md'
          label='IT 취준생을 위한 AI 큐레이션 플랫폼'
          description='AI 요약, 트렌드 분석, 맞춤 추천까지'
          className='items-center'
        />
      </div>
      <div className='flex flex-col gap-2.5 w-full px-10 py-7.75 justify-center items-center sm:w-150'>
        <LoginButton type='google' />
        <LoginButton type='kakao' />
      </div>
      <span className='typo-footnote-base text-charcoal-optional'>
        로그인 시 서비스 이용약관 및 개인정보 처리방침에 동의하게 됩니다.
      </span>
    </main>
  );
};
