export enum feesPerHead {
  HIGH_PREP = Number(process.env.HIGH_PREP_FEES),
  MID_PREP = Number(process.env.MID_PREP_FEES),
  LOW_PREP = Number(process.env.LOW_PREP_FEES),
  NO_PREP = Number(process.env.NO_PREP_FEES),
}
export enum maxTeamSize {
  HIGH_PREP = Number(process.env.MAX_TEAMSIZE_HIGH_PREP),
  MID_PREP = Number(process.env.MAX_TEAMSIZE_MID_PREP),
  LOW_PREP = Number(process.env.MAX_TEAMSIZE_LOW_PREP),
  SAC_EC = Number(process.env.MAX_TEAMSIZE_SAC_EC),
  NO_PREP = Number(process.env.MAX_TEAMSIZE_NO_PREP),
}
