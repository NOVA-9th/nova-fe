export const MAX_KEYWORDS = 5;

export const addKeyword = (
  prevKeywords: string[],
  keyword: string,
  suggestions: string[],
): { newKeywords: string[]; error?: string } => {
  const trimmed = keyword.trim();
  if (!trimmed) return { newKeywords: prevKeywords };

  if (!suggestions.includes(trimmed)) {
    return { newKeywords: prevKeywords, error: '해당 키워드는 입력할 수 없습니다.' };
  }

  if (prevKeywords.includes(trimmed)) return { newKeywords: prevKeywords };

  if (prevKeywords.length >= MAX_KEYWORDS) {
    return {
      newKeywords: prevKeywords,
      error: `키워드는 최대 ${MAX_KEYWORDS}개까지 선택할 수 있어요.`,
    };
  }

  return { newKeywords: [...prevKeywords, trimmed] };
};

export const sanitizeKeywords = (chips: string[]): string[] => {
  const unique = Array.from(new Set(chips));
  return unique.slice(0, MAX_KEYWORDS);
};
