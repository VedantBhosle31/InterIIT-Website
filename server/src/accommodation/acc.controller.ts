import { AccService } from './acc.service';
import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuardJWT } from 'src/auth/utils/LocalGuard';
import { AccommodationDto } from './acc.dto';
@Controller('accommodation')
export class AccController {
  constructor(private readonly accService: AccService) {}

  @UseGuards(AuthGuardJWT)
  @Post('update')
  async updateAccommodation(
    @Request() req,
    @Body() accommodationDto: { accommodationData: AccommodationDto[] },
  ) {
    return this.accService.update(accommodationDto.accommodationData);
  }
  @Post('findAll')
  async getAccommodation(@Request() req, @Body() psTeams: any) {
    return this.accService.getData(psTeams.psTeams);
  }
}
