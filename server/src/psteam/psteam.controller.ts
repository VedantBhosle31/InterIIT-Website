import { PsteamService } from './psteam.service';
import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuardJWT, AuthenticatedGuard } from 'src/auth/utils/LocalGuard';
import { CurrentUser } from 'src/decorators/CurrentUser';
import { CreatePsteamDto } from './create-psteam.dto';
@Controller('psteam')
export class PsteamController {
  constructor(private readonly psteamService: PsteamService) {}

  @UseGuards(AuthGuardJWT)
  @Post('create')
  async createPsTeam(@Request() req, @Body() createPsteamDto: CreatePsteamDto) {
    return this.psteamService.create(req.decodedData.username, createPsteamDto);
  }
}
