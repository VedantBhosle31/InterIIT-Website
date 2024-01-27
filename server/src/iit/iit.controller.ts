import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { IitService } from './iit.service';
import { CreateIITDto } from './create-iit.dto';
import {
  AuthGuardJWT,
  AuthenticatedGuard,
  LocalAuthGuard,
} from 'src/auth/utils/LocalGuard';
import { CurrentUser } from 'src/decorators/CurrentUser';
@Controller('iit')
export class IitController {
  constructor(private readonly iitService: IitService) {}

  @Get('findall')
  findall() {
    return this.iitService.findall();
  }

  @Post('create')
  registerUser(@Body() createUserDto: CreateIITDto) {
    return this.iitService.registerUser(createUserDto);
  }

  @Get('getUser')
  @UseGuards(AuthGuardJWT)
  async getUser(@Request() req) {
    return this.iitService.getUserByUsername(req.decodedData.username);
  }
  @Get('opponents')
  @UseGuards(AuthGuardJWT)
  async getTeamsAgainstIIT(@Query() params: any) {
    return this.iitService.getAllTeamsAgainstIIT(params.id);
  }

  @UseGuards(AuthGuardJWT)
  @Get('getLeads')
  async getLeads(@Request() req) {
    return this.iitService.getLeads(req.decodedData.username);
  }

  @UseGuards(AuthGuardJWT)
  @Post('addLeads')
  async addLeads(@Request() req, @Body() body) {
    return this.iitService.addLeads(req.decodedData.username, body);
  }

  @UseGuards(AuthGuardJWT)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('getTeamMembers')
  async getTeamMembers(@Request() req, @Query() query) {
    return this.iitService.getTeamMembers(
      req.decodedData.username,
      query.ps_id,
    );
  }

  @UseGuards(AuthGuardJWT)
  @Get('verifyPayment')
  approveFee(@Request() req, @Body() body) {
    return this.iitService.verifyPayment(req.decodedData.username, body);
  }
}
