export interface ContentionType {
  id: string;
  pSTeamId: string;
  count: number;
  contentions: ContentionItemType[];
  team: string;
}

enum ContentionStatus {
  NOT_RAISED,
  ACCEPTED,
  REJECTED,
  PENDING,
}

export interface ContentionItemType {
  id: string;
  contentionId: string;
  against: string;
  description: string;
  status: ContentionStatus;
}

export interface ContentionStatusType {
  contentionItemId: string;
  status: "APPROVED" | "REJECTED" | "";
}
