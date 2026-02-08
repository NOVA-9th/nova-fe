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

type ArticleType = 'NEWS' | 'JOB' | 'COMMUNITY';

const ARTICLE_TYPE_CONFIG: Record<ArticleType, { icon: LucideIcon; title: string }> = {
  NEWS: { icon: Newspaper, title: '뉴스' },
  JOB: { icon: FileUser, title: '채용' },
  COMMUNITY: { icon: EarthIcon, title: '커뮤니티' },
};

const isArticleType = (v: string): v is ArticleType =>
  v === 'NEWS' || v === 'JOB' || v === 'COMMUNITY';

export const ArticleCard = ({ articleData }: { articleData: CardNews }) => {
  const [isOpen, setIsOpen] = useState(false);

  const typeKey: ArticleType = isArticleType(articleData.cardType) ? articleData.cardType : 'NEWS';
  const typeConfig = ARTICLE_TYPE_CONFIG[typeKey];

  const evidences = (articleData.evidence ?? []).map((e) => e.trim()).filter(Boolean);
  const evidenceCount = evidences.length;

  return (
    <article className='flex flex-col w-full min-w-0 h-fit items-start rounded-static-frame bg-base border border-outline p-5 gap-5'>
      <div className='flex w-full h-fit justify-start items-center gap-2.5'>
        <TextBadge
          size='lg'
          variant='surface'
          peak={false}
          icon={typeConfig.icon}
          text={typeConfig.title}
        />
        <TextBadge size='lg' variant='data' peak={false} text='관련도 91%' />
      </div>

      <Header
        size='md'
        label={articleData.title}
        subLabel={`${articleData.siteName} | ${articleData.author || '익명'} | ${getRelativeTime(
          articleData.publishedAt,
        )}`}
        className='py-0'
      />

      <div className='flex flex-col w-full h-fit justify-start items-start rounded-interactive-default bg-surface p-4 gap-4'>
        <TextBadge size='lg' variant='surface' peak={false} icon={Brain} text='AI 요약' />
        <span className='typo-body-base text-base'>{articleData.summary}</span>
      </div>

      <div className='flex w-full h-fit justify-between items-center gap-2.5'>
        <div className='flex gap-1.5 items-center'>
          <SectionHeader size='sm' peak={false} leftIcon={BookOpenText} text='Evidence' />
          <TextBadge
            size='md'
            variant='surface'
            peak={false}
            text={`${evidenceCount}개`}
            className='h-5'
          />
        </div>

        {evidenceCount > 0 && (
          <button
            type='button'
            className='flex justify-center items-center gap-1 typo-callout-key text-optional hover:text-optional active:text-optional'
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <p>{isOpen ? '접기' : '펼치기'}</p>
            <ChevronDownIcon
              size={14}
              className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>
        )}
      </div>

      {isOpen && evidenceCount > 0 && (
        <div className='flex flex-col w-full justify-start items-start border border-outline rounded-static-frame p-4 gap-4'>
          {evidences.map((content, idx) => (
            <EvidenceCard
              key={`${articleData.id}-evidence-${idx}`}
              evidenceSource='근거'
              content={content}
            />
          ))}
        </div>
      )}

      {articleData.keywords?.length > 0 && (
        <div className='min-w-0 w-full max-w-full overflow-x-auto sm:overflow-x-visible'>
          <div className='inline-flex w-max gap-2.5 whitespace-nowrap sm:flex sm:flex-wrap sm:w-full sm:whitespace-normal'>
            {articleData.keywords.map((keyword) => (
              <TextBadge
                key={keyword}
                size='lg'
                variant='surface'
                peak={false}
                text={`#${keyword}`}
                className='shrink-0'
              />
            ))}
          </div>
        </div>
      )}

      <div className='flex w-full h-fit justify-between items-start gap-2.5'>
        <TextIconButton
          style='surface'
          peak={true}
          size='lg'
          label='원문 보기'
          leftIcon={SquareArrowOutUpRight}
          onClick={() => window.open(articleData.originalUrl, '_blank', 'noopener,noreferrer')}
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
