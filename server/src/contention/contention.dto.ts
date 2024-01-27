export class UpdateContentionDto {
  contentionItemId: string;
  approved: boolean;
}
export class RaiseContentionDto {
  contentionItemId: string;
  against: string;
  description: string;
}
