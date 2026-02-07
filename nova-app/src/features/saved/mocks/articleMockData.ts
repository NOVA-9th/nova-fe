import type { CardNews } from '@/features/feed/types/api';

export const mockArticleData: CardNews[] = [
  {
    id: 1,
    title: 'LangChain과 RAG를 활용한 AI 챗봇 구축하기',
    cardtype: ['NEWS'],
    author: '김개발',
    publishedAt: '2024-01-15T00:00:00Z',
    summary:
      'LangChain과 RAG(Retrieval-Augmented Generation) 기술을 활용하여 지능형 AI 챗봇을 구축하는 방법을 소개합니다.',
    evidence: ['LangChain은 LLM 애플리케이션 개발을 위한 프레임워크입니다.'],
    originalUrl: 'https://example.com/article/1',
    siteName: 'TechCrunch',
    keywords: ['AI', 'LangChain', 'RAG', '챗봇'],
    saved: true,
  },
  {
    id: 2,
    title: '프론트엔드 개발자 채용 공고',
    cardtype: ['JOB'],
    author: '박인사',
    publishedAt: '2024-01-20T00:00:00Z',
    summary: 'Next.js와 React를 활용한 프론트엔드 개발자를 모집합니다.',
    evidence: [''], // evidence가 없으면 ArticleCard에서 trim 체크 걸림
    originalUrl: 'https://example.com/article/2',
    siteName: '네이버',
    keywords: ['채용', '프론트엔드', 'Next.js'],
    saved: false,
  },
  {
    id: 3,
    title: 'TypeScript 베스트 프랙티스 공유',
    cardtype: ['COMMUNITY'],
    author: '이개발',
    publishedAt: '2024-01-25T00:00:00Z',
    summary: 'TypeScript를 효율적으로 사용하는 방법과 팁을 공유합니다.',
    evidence: ['TypeScript는 정적 타입 검사를 제공합니다.'],
    originalUrl: 'https://example.com/article/3',
    siteName: '개발자 커뮤니티',
    keywords: ['TypeScript', '개발', '팁'],
    saved: true,
  },
];
