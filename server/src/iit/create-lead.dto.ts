export class CreateLeadDto{
  name: string;
  email: string;
  phone: string;
  discordId: string;
  photo_url: string;
  idCardUrl: string;
  tshirt: string;
  foodPref: string;
}
export class CreateLeadsDto{
    contingentLead: CreateLeadDto;
    deputyContingentLead : CreateLeadDto;
    deputyContingentLead2? : CreateLeadDto;
    coCas : CreateLeadDto;
}