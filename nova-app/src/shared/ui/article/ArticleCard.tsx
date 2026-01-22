'use client';

import { cn } from '@/shared/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import {
  BookOpenText,
  Brain,
  ChevronDownIcon,
  EarthIcon,
  FileUser,
  LucideIcon,
  Newspaper,
} from 'lucide-react';
import React, { useState } from 'react';
import { Header, SectionHeader, TextBadge } from '..';
import { articleData } from '@/features/saved/types/ArticleType';
import EvidenceCard from './EvidenceCard';

const ArticleCardVariants = cva(
  'flex flex-col w-full h-fit justify-start items-start rounded-lg p-5 gap-5 bg-white',
  {
    variants: {
      type: {
        news: '',
        recruitment: '',
        community: '',
      },
    },
  },
);

const ARTICLE_TYPE_CONFIG: Record<
  'news' | 'recruitment' | 'community',
  { icon: LucideIcon; title: string }
> = {
  news: {
    icon: Newspaper,
    title: '뉴스',
  },
  recruitment: {
    icon: FileUser,
    title: '채용',
  },
  community: {
    icon: EarthIcon,
    title: '커뮤니티',
  },
};

interface ArticleCardProps extends VariantProps<typeof ArticleCardVariants> {
  className?: string;
  children?: React.ReactNode;
  articleData: articleData;
}

const ArticleCard = ({ className, articleData }: ArticleCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const typeConfig = articleData.type
    ? ARTICLE_TYPE_CONFIG[articleData.type]
    : ARTICLE_TYPE_CONFIG['news'];

  return (
    <article className={cn(ArticleCardVariants({ type: articleData.type }), className)}>
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
        {articleData.relevance && (
          <TextBadge
            size='lg'
            variant='data'
            peak={false}
            text={`관련도 ${articleData.relevance}%`}
          />
        )}
      </div>
      <div className='flex flex-col w-full h-fit justify-start items-start'>
        <Header
          size='md'
          subLabel={`${articleData.source} | ${articleData.author} | ${articleData.date}`}
          className='p-0'
        />
        <Header size='md' label={articleData.title} className='p-0'></Header>
      </div>
      <div className='flex flex-col w-full h-fit justify-start items-start rounded-interactive-default bg-surface p-4 gap-4'>
        <TextBadge size='lg' variant='surface' peak={false} icon={Brain} text='AI 요약' />
        <span className='typo-body-base text-base'>{articleData.aiSummary}</span>
      </div>
      <div className='flex w-full h-fit justify-between items-center gap-2.5'>
        <div className='flex gap-1.5'>
          <SectionHeader size='sm' peak={false} leftIcon={BookOpenText} text='Evidence' />
          <TextBadge
            size='lg'
            variant='surface'
            peak={false}
            text={`${articleData.evidences.length}개`}
            className='gap-0'
          />
        </div>
        <button
          className='flex justify-center items-center gap-1 typo-callout-key text-optional'
          onClick={() => setIsOpen(!isOpen)}
        >
          <p>접기</p>
          <ChevronDownIcon
            className={`size-4 transition-transform duration-300 ${isOpen ? '' : '-rotate-180'}`}
          />
        </button>
      </div>
      {isOpen && articleData.evidences.length > 0 && (
        <div className='flex flex-col w-full h-fit justify-start items-start border border-outline rounded-lg p-4 gap-4'>
          {articleData.evidences.map((evidence) => (
            <EvidenceCard
              key={evidence.id}
              evidenceSource={evidence.evidenceSource}
              content={evidence.content}
            />
          ))}
        </div>
      )}
    </article>
  );
};

export default ArticleCard;
