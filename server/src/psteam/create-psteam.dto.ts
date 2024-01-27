export class CreateTeammembmerDto {
  name: string;
  email: string;
  phone: string;
  discordId: string;
  photo_url: string;
  idCardUrl: string;
  tshirt: string;
  foodPref: string;
}

export class CreatePsteamDto {
  psname: string;
  participants: CreateTeammembmerDto[];
}
