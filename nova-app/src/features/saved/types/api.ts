export type BookmarkInterestCountResponse = {
  interestId: number;
  interestName: string;
  count: number;
};

export type BookmarkSourceTypeCountResponse = {
  cardTypeId: number;
  cardTypeName: string;
  count: number;
};

export type BookmarkCountsByInterestResponse = {
  bookmarkCounts: BookmarkInterestCountResponse[];
};

export type BookmarkCountsBySourceTypeResponse = {
  bookmarkCounts: BookmarkSourceTypeCountResponse[];
};


