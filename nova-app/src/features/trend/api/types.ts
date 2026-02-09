/*최종data */
export type KeywordTopDTO = {
  baseDate: string; //기준 날짜
  trends: TrendDataType[];
};

/*trends data type*/
export type TrendDataType = {
  rank: number;
  keyword: string;
  interests: number; //관심분야
  mentionCount: number;
  growthRate: number;
  dailyCounts: DailyCountChartData[];
};

/*daily count chart type*/
export type DailyCountChartData = {
  date: string;
  count: number;
};

/* line chart* */
export type RankingsData = {
  rank: number;
  interest: number;
  totalMentionCount: number;
  keywords: string[];
};

export type skilltopDTO = {
  baseDate: string; //기준 날짜
  rankings: RankingsData[];
};
