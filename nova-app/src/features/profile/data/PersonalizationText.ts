export const PERSONALIZATION_TEXT = {
  sections: {
    major: {
      title: '전공 분야',
      options: [
        '공학',
        '정보 & 컴퓨터',
        '자연과학',
        '인문',
        '사회과학',
        '경영 & 경제',
        '예체능',
        '기타 학문',
      ],
    },
    interests: {
      title: '관심 분야',
      options: [
        '모바일 앱',
        '웹 프론트엔드',
        '백엔드',
        'Full-stack',
        'AI & ML',
        '블록체인',
        '데이터 엔지니어링',
        '데이터 분석',
        '인프라 / DevOps',
        '정보 보안',
        '네트워크',
        '임베디드 시스템',
        '게임 개발',
        '컴퓨터 비전 (CV)',
        '시스템 개발',
        'QA / Testing',
      ],
      // 백엔드 Interest 테이블 ID 매핑 (인덱스 기반)
      // 각 옵션의 인덱스에 해당하는 백엔드 Interest ID
      ids: [1, 2, 3, 4, 5, 12, 6, 7, 8, 9, 10, 11, 14, 13, 15, 16] as number[],
    },
    skillLevel: {
      title: '기술 역량',
      options: ['입문자', '초급자', '중급자', '숙련자'],
    },
    keyword: {
      title: '관심 키워드',
      helperText: '최대 5개까지 선택할 수 있습니다',
      saveButtonLabel: '저장',
      maxCount: 5,
      initialKeywords: ['React', 'TypeScript', 'LLM', 'RAG'],
    },
  },
} as const;
