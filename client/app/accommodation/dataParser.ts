export interface TeamMemberType {
  id: string;
  name: string;
  sex: string;
  accommodation: boolean;
  startDate: string;
  endDate: string;
}

export interface AccommodationDataType {
  psName: string;
  psTeamId: string;
  teamMembers: TeamMemberType[];
}

export const parseAccommodationData = (
  psData: any,
  userData: any,
  accData: any
) => {
  const psTeams = userData.ps_teams;
  const accommodationData: AccommodationDataType[] = psTeams.map(
    (team: any) => {
      const psId = team.ps_id;
      const psTeamId = team.id;
      const psName = psData.find((ps: any) => ps.id === psId).name;
      const psTeamAccData = (accData ?? []).find(
        (obj: any) => obj[0]?.psTeamId === psTeamId
      );
      const teamMembers: TeamMemberType[] = team.team_members.map(
        (member: any) => {
          const memberAccData = (psTeamAccData ?? []).find(
            (obj: any) => obj?.memberId === member.id
          );
          return {
            id: member.id,
            name: member.name,
            sex:
              member.sex !== undefined
                ? member.sex
                : memberAccData !== undefined
                ? memberAccData.sex
                : "",
            accommodation:
              member.accommodation !== undefined
                ? member.accommodation
                : memberAccData !== undefined
                ? memberAccData.accommodation
                : false,
            startDate:
              member.startDate !== undefined
                ? member.startDate
                : memberAccData !== undefined
                ? memberAccData.startDate
                : "18/12/2023",
            endDate:
              member.endDate !== undefined
                ? member.endDate
                : memberAccData !== undefined
                ? memberAccData.endDate
                : "22/12/2023",
          };
        }
      );
      return {
        psName,
        psTeamId,
        teamMembers,
      };
    }
  );
  return accommodationData;
};
