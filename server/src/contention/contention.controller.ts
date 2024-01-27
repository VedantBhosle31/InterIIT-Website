import { ContentionService } from './contention.service';
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Query,
  Patch,
} from '@nestjs/common';
import { AuthGuardJWT } from 'src/auth/utils/LocalGuard';
import { RaiseContentionDto, UpdateContentionDto } from './contention.dto';
@Controller('contention')
export class ContentionController {
  constructor(private readonly ContentionService: ContentionService) {}

  @UseGuards(AuthGuardJWT)
  @Post('create')
  async createContention(
    @Request() req,
    @Body() ContentionDto: { psId: string },
  ) {
    const username = req.decodedData.username;
    return this.ContentionService.create(username, ContentionDto.psId);
  }

  @UseGuards(AuthGuardJWT)
  @Post('raise')
  async raiseContention(@Body() RaiseContentionDto: RaiseContentionDto) {
    return this.ContentionService.raiseContention(
      RaiseContentionDto.contentionItemId,
      RaiseContentionDto.against,
      RaiseContentionDto.description,
    );
  }

  @UseGuards(AuthGuardJWT)
  @Get('all')
  async getAllContention(@Query() params: any) {
    return this.ContentionService.getAll(params.id);
  }
  @UseGuards(AuthGuardJWT)
  @Get('')
  async getContention(@Query() params: any) {
    return this.ContentionService.get(params.id);
  }

  @UseGuards(AuthGuardJWT)
  @Patch('update')
  async updateContention(
    @Request() req,
    @Body()
    UpdateContentionDto: UpdateContentionDto,
  ) {
    const username = req.decodedData.username;
    return this.ContentionService.updateStatus(
      username,
      UpdateContentionDto.contentionItemId,
      UpdateContentionDto.approved,
    );
  }
}
