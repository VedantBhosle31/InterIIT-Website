import { PsService } from './ps.service';
import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  Patch,
} from '@nestjs/common';
import { AuthGuardJWT } from 'src/auth/utils/LocalGuard';
import { CreatePsDto } from './create-ps.dto';
import { UpdateTime } from './update.time.dto';
@Controller('ps')
export class PsController {
  constructor(private readonly psService: PsService) {}

  @UseGuards(AuthGuardJWT)
  @Post('create')
  async create(@Request() req, @Body() createPsDto: CreatePsDto) {
    return this.psService.create(req.decodedData.username, createPsDto);
  }

  @UseGuards(AuthGuardJWT)
  @Get('findall')
  async findall(@Request() req) {
    return this.psService.findall(req.decodedData.username);
  }

  @UseGuards(AuthGuardJWT)
  @Patch('updatetime')
  async updatetime(@Request() req, @Body() updatetime: UpdateTime) {
    return this.psService.updatetime(req.decodedData.username, updatetime);
  }
}
