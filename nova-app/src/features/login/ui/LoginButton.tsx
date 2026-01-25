import { cn } from '@/shared/utils/cn';
import { cva } from 'class-variance-authority';
import KakaoIcon from '@/shared/assets/KakaoTalkIcon.svg';
import GoogleIcon from '@/shared/assets/GoogleIcon.svg';
import GithubIcon from '@/shared/assets/GithubIcon.svg';

const LoginButtonVariants = cva(
  'w-75 h-11 rounded-interactive-default py-padding-regular px-padding-bold typo-body-key flex flex-row items-center justify-center',
  {
    variants: {
      type: {
        kakao: 'bg-[#FEE404] hover:bg-[#F6DC00] active:bg-[#EFD400] text-[#1A1A1C]',
        google: 'bg-surface hover:bg-surface active:bg-surface text-charcoal-additive',
        github: 'bg-surface hover:bg-surface active:bg-surface text-charcoal-additive',
      },
    },
  },
);

const SOCIAL_ICON_BY_TYPE = {
  kakao: KakaoIcon,
  google: GoogleIcon,
  github: GithubIcon,
} as const;

const SOCIAL_TEXT_BY_TYPE = {
  kakao: '카카오',
  google: 'Google',
  github: 'GitHub',
} as const;

interface LoginButtonProps {
  type: 'kakao' | 'google' | 'github'; // 소셜 로그인 3가지로 고정
  onClick?: () => void;
  className?: string;
}

const LoginButton = ({ type, onClick, className }: LoginButtonProps) => {
  const Icon = SOCIAL_ICON_BY_TYPE[type];
  const text = SOCIAL_TEXT_BY_TYPE[type];

  return (
    <button
      type='button'
      className={cn(LoginButtonVariants({ type }), className)}
      onClick={onClick}
    >
      <span className='py-1'>{Icon && <Icon className='w-4 h-4' />}</span>
      <div className='w-62.5 h-6 px-0.5'>{text} 계정으로 시작하기</div>
    </button>
  );
};

export default LoginButton;
