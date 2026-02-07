'use client';

import {
  SquareArrowOutUpRight,
  BookOpenText,
  Brain,
  ChevronDownIcon,
  EarthIcon,
  FileUser,
  LucideIcon,
  Newspaper,
  Bookmark,
} from 'lucide-react';
import { useState } from 'react';
import { Button, Header, IconButton, SectionHeader, TextBadge, TextIconButton } from '@/shared/ui';
import { EvidenceCard } from '@/features/saved/ui';
import { CardNews } from '@/features/feed/types/api';
import { getRelativeTime } from '@/features/feed/utils/time';

const ARTICLE_TYPE_CONFIG: Record<
  'NEWS' | 'JOB' | 'COMMUNITY',
  { icon: LucideIcon; title: string }
> = {
  NEWS: {
    icon: Newspaper,
    title: '뉴스',
  },
  JOB: {
    icon: FileUser,
    title: '채용',
  },
  COMMUNITY: {
    icon: EarthIcon,
    title: '커뮤니티',
  },
};

export const ArticleCard = ({ articleData }: { articleData: CardNews }) => {
  const [isOpen, setIsOpen] = useState(false);

  const firstType = Array.isArray(articleData.cardtype) ? articleData.cardtype[0] : undefined;

  const typeKey: 'NEWS' | 'JOB' | 'COMMUNITY' =
    firstType === 'NEWS' || firstType === 'JOB' || firstType === 'COMMUNITY' ? firstType : 'NEWS';

  const typeConfig = ARTICLE_TYPE_CONFIG[typeKey];

  return (
    <article className='flex flex-col w-full h-fit items-start rounded-static-frame bg-white p-5 gap-5'>
      <div className='flex w-full h-fit justify-start items-center gap-2.5'>
        {typeConfig && (
          <TextBadge
            size='lg'
            variant='surface'
            peak={false}
            icon={typeConfig.icon}
            text={typeConfig.title}
          />
        )}

        <TextBadge size='lg' variant='data' peak={false} text='관련도 91%' />
      </div>
      <Header
        size='md'
        label={articleData.title}
        subLabel={`${articleData.originalUrl} | ${articleData.author || '익명'} | ${getRelativeTime(articleData.publishedAt)}`}
        className='py-0'
      />
      <div className='flex flex-col w-full h-fit justify-start items-start rounded-interactive-default bg-surface p-4 gap-4'>
        <TextBadge size='lg' variant='surface' peak={false} icon={Brain} text='AI 요약' />
        <span className='typo-body-base text-base'>{articleData.summary}</span>
      </div>
      <div className='flex w-full h-fit justify-between items-center gap-2.5'>
        <div className='flex gap-1.5 items-center'>
          <SectionHeader size='sm' peak={false} leftIcon={BookOpenText} text='Evidence' />
          <TextBadge size='md' variant='surface' peak={false} text='3개' className='h-5' />
        </div>
        <button
          className='flex justify-center items-center gap-1 typo-callout-key text-optional'
          onClick={() => setIsOpen(!isOpen)}
        >
          <p>{isOpen ? '접기' : '펼치기'}</p>
          <ChevronDownIcon
            size={14}
            className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>
      {isOpen && articleData.evidence.trim().length > 0 && (
        <div className='flex flex-col w-full justify-start items-start border border-outline rounded-static-frame p-4 gap-4'>
          <EvidenceCard evidenceSource='LangChain 공식 문서' content={articleData.evidence} />
        </div>
      )}
      <div className='flex w-full h-fit justify-between items-start gap-2.5'>
        <TextIconButton
          style='surface'
          peak={true}
          size='lg'
          label='원문 보기'
          leftIcon={SquareArrowOutUpRight}
          onClick={() => {
            window.open(articleData.originalUrl, '_blank');
          }}
          className='gap-1.5'
        />
        <div className='flex justify-center items-center gap-2.5'>
          <Button label='숨김' style='data' peak={false} size='lg' onClick={() => {}} />
          <IconButton size='lg' style='accent' peak={false} icon={Bookmark} />
        </div>
      </div>
    </article>
  );
};
