export class AccItemDto {
  id: string;
  name: string;
  sex: string;
  accommodation: boolean;
  startDate: string;
  endDate: string;
}

export class AccommodationDto {
  psName: string;
  psTeamId: string;
  teamMembers: AccItemDto[];
}
