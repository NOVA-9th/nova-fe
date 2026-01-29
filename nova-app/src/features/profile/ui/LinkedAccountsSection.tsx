import { ItemList, SectionHeader } from '@/shared/ui';
import GoogleLogoIcon from '@/shared/assets/GoogleIcon.svg';
import KakaoLogoIcon from '@/shared/assets/KakaoTalkIcon.svg';
import GithubLogoIcon from '@/shared/assets/GithubIcon.svg';

export const LinkedAccountsSection = () => {
  return (
    <section className='flex flex-col justify-start items-start bg-base rounded-static-frame w-full gap-5 p-5'>
      <SectionHeader text='연결된 계정' size='lg' />
      <div className='flex flex-col gap-1 w-full items-center justify-start'>
        <ItemList
          size='lg'
          label='Google'
          description='ivory.ma9ic@gmail.com'
          leftIcon={GoogleLogoIcon}
          rightButton={{ label: '취소', size: 'md', style: 'surface', peak: true }}
          className='w-full p-2'
        />
        <ItemList
          size='lg'
          label='KakaoTalk'
          description='연결안됨'
          leftIcon={KakaoLogoIcon}
          rightButton={{ label: '연결', size: 'md', style: 'surface', peak: false }}
          className='w-full p-2'
        />
        <ItemList
          size='lg'
          label='Github'
          description='@2ssac'
          leftIcon={GithubLogoIcon}
          rightButton={{ label: '취소', size: 'md', style: 'surface', peak: true }}
          className='w-full p-2'
        />
      </div>
    </section>
  );
};
