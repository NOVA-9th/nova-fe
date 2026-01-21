import { articleData } from '../types/ArticleType';

export const mockArticleData: articleData[] = [
  {
    id: '1',
    type: 'news',
    relevance: 85,
    source: 'TechCrunch',
    author: '김개발',
    date: '2024-01-15',
    title: 'LangChain과 RAG를 활용한 AI 챗봇 구축하기',
    aiSummary:
      'LangChain과 RAG(Retrieval-Augmented Generation) 기술을 활용하여 지능형 AI 챗봇을 구축하는 방법을 소개합니다.',
    evidences: [
      {
        id: 'e1',
        evidenceSource: 'LangChain 공식 문서',
        content: 'LangChain은 LLM 애플리케이션 개발을 위한 프레임워크입니다.',
      },
    ],
    tags: ['AI', 'LangChain', 'RAG', '챗봇'],
    originalUrl: 'https://example.com/article/1',
    isHidden: false,
    isBookmarked: true,
  },
  {
    id: '2',
    type: 'recruitment',
    relevance: 72,
    source: '네이버',
    author: '박인사',
    date: '2024-01-20',
    title: '프론트엔드 개발자 채용 공고',
    aiSummary: 'Next.js와 React를 활용한 프론트엔드 개발자를 모집합니다.',
    evidences: [],
    tags: ['채용', '프론트엔드', 'Next.js'],
    originalUrl: 'https://example.com/article/2',
    isHidden: false,
    isBookmarked: false,
  },
  {
    id: '3',
    type: 'community',
    relevance: 90,
    source: '개발자 커뮤니티',
    author: '이개발',
    date: '2024-01-25',
    title: 'TypeScript 베스트 프랙티스 공유',
    aiSummary: 'TypeScript를 효율적으로 사용하는 방법과 팁을 공유합니다.',
    evidences: [
      {
        id: 'e2',
        evidenceSource: 'TypeScript 핸드북',
        content: 'TypeScript는 정적 타입 검사를 제공합니다.',
      },
    ],
    tags: ['TypeScript', '개발', '팁'],
    originalUrl: 'https://example.com/article/3',
    isHidden: false,
    isBookmarked: true,
  },
];
