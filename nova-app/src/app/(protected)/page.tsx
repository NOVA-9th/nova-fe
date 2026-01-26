'use client';

import { useState } from 'react';
import { mockArticleData } from '@/features/saved/mocks/articleMockData';
import {
  ArticleCard,
  PageHeader,
  SectionHeader,
  SelectionChip,
  TextBadge,
  TextButton,
} from '@/shared/ui';
import { MessagesSquare, RotateCcw, Newspaper, User, Globe } from 'lucide-react';

const SORT_ITEMS = ['최신순', '관련도 순'];
const PERIOD_ITEMS = ['1일', '7일', '30일'];
const TYPE_ITEMS = [
  { label: '뉴스', icon: Newspaper },
  { label: '채용', icon: User },
  { label: '커뮤니티', icon: Globe },
];
const KEYWORD_ITEMS = [
  'React',
  'Server Components',
  'Frontend',
  'useHook',
  'Transformer',
  'Deep Learning',
  'Attention',
  'Flash Attention',
  'Typescript',
  'JavaScript',
  '타입시스템',
];

const FeedPage = () => {
  const [selectedSort, setSelectedSort] = useState('최신순');
  const [selectedPeriod, setSelectedPeriod] = useState('1일');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  // 타입 토글
  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  //키워트 토글
  const handleKeywordToggle = (keyword: string) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword) ? prev.filter((k) => k !== keyword) : [...prev, keyword],
    );
  };

  // reset 함수
  const resetSort = () => setSelectedSort('최신순');
  const resetPeriod = () => setSelectedPeriod('1일');
  const resetTypes = () => setSelectedTypes([]);
  const resetKeywords = () => setSelectedKeywords([]);

  return (
    <>
      <PageHeader text='피드' icon={MessagesSquare} />
      <section className='grid grid-cols-[1fr_320px] gap-4 px-5 pb-5'>
        <div className='space-y-4'>
          {mockArticleData.map((article) => (
            <ArticleCard key={article.id} articleData={article} />
          ))}
        </div>

        <aside className='w-80 space-y-4'>
          <section className='bg-white rounded-static-frame border border-outline p-5'>
            <div className='flex items-center justify-between mb-5'>
              <SectionHeader size='lg' text='정렬' />
              <TextButton
                label='초기화'
                rightIcon={RotateCcw}
                className='text-optional'
                onClick={resetSort}
              />
            </div>
            <div className='flex items-center gap-2'>
              {SORT_ITEMS.map((option) => (
                <SelectionChip
                  key={option}
                  size='md'
                  label={option}
                  selected={selectedSort === option}
                  isShowChevron={false}
                  onClick={() => setSelectedSort(option)}
                />
              ))}
            </div>
          </section>

          <section className='bg-white rounded-static-frame border border-outline p-5'>
            <div className='flex items-center justify-between mb-5'>
              <SectionHeader size='lg' text='업로드 기간' />
              <TextButton
                label='초기화'
                rightIcon={RotateCcw}
                className='text-optional'
                onClick={resetPeriod}
              />
            </div>
            <div className='flex items-center gap-2'>
              {PERIOD_ITEMS.map((option) => (
                <SelectionChip
                  key={option}
                  label={option}
                  selected={selectedPeriod === option}
                  isShowChevron={false}
                  onClick={() => setSelectedPeriod(option)}
                />
              ))}
            </div>
          </section>

          <section className='bg-white rounded-static-frame border border-outline p-5 space-y-5'>
            <div className='flex items-center justify-between'>
              <SectionHeader size='lg' text='유형' />
              <TextButton
                label='초기화'
                rightIcon={RotateCcw}
                className='text-optional'
                onClick={resetTypes}
              />
            </div>
            <div className='flex items-center gap-2 flex-wrap'>
              <SelectionChip
                label='전체'
                selected={selectedTypes.length === 0}
                isShowChevron={false}
                icon={Newspaper}
                onClick={() => setSelectedTypes([])}
              />
            </div>
            <div className='flex items-center gap-2 flex-wrap'>
              {TYPE_ITEMS.map((item) => (
                <SelectionChip
                  key={item.label}
                  label={item.label}
                  selected={selectedTypes.includes(item.label)}
                  isShowChevron={false}
                  icon={item.icon}
                  onClick={() => handleTypeToggle(item.label)}
                />
              ))}
            </div>
          </section>

          <section className='bg-white rounded-static-frame border border-outline p-5'>
            <div className='flex items-center justify-between mb-5 flex-wrap'>
              <div className='flex items-center gap-2.5'>
                <SectionHeader size='lg' text='키워드 필터' />
                <TextBadge
                  variant='surface'
                  peak={false}
                  size='lg'
                  text={`${selectedKeywords.length}개`}
                />
              </div>
              <TextButton
                label='초기화'
                rightIcon={RotateCcw}
                className='text-optional'
                onClick={resetKeywords}
              />
            </div>
            <div className='flex items-center gap-2 flex-wrap'>
              {KEYWORD_ITEMS.map((keyword) => (
                <SelectionChip
                  key={keyword}
                  label={`#${keyword}`}
                  selected={selectedKeywords.includes(keyword)}
                  isShowChevron={false}
                  onClick={() => handleKeywordToggle(keyword)}
                  className='whitespace-nowrap'
                />
              ))}
            </div>
          </section>
        </aside>
      </section>
    </>
  );
};

export default FeedPage;
