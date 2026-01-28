import { Button, ItemList, SectionHeader } from '@/shared/ui';
import GoogleLogoIcon from '@/assets/icons/google_logo_icon.svg';
import KakaoLogoIcon from '@/assets/icons/kakaoTalk_logo_icon.svg';
import GithubLogoIcon from '@/assets/icons/github_logo_icon.svg';

export const LinkedAccountsSection = () => {
  return (
    <section className='flex flex-col justify-start items-start bg-base rounded-static-frame w-full h-full gap-5 p-5'>
      <SectionHeader text='연결된 계정' size='lg' />
      <div className='flex flex-col w-full items-center justify-start'>
        <ItemList
          size='lg'
          label='Google'
          description='ivory.ma9ic@gmail.com'
          leftIcon={GoogleLogoIcon}
          rightButton={{ label: '취소', size: 'lg', style: 'surface', peak: true }}
          className='w-full'
        />
        <ItemList
          size='lg'
          label='KakaoTalk'
          description='연결안됨'
          leftIcon={KakaoLogoIcon}
          rightButton={{ label: '연결', size: 'lg', style: 'surface', peak: false }}
          className='w-full'
        />
        <ItemList
          size='lg'
          label='Github'
          description='@2ssac'
          leftIcon={GithubLogoIcon}
          rightButton={{ label: '취소', size: 'lg', style: 'surface', peak: true }}
          className='w-full'
        />
      </div>
    </section>
  );
};
