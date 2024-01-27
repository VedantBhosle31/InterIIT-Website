import { AuthService } from './auth.service';
import {
  Controller,
  Request,
  UseGuards,
  Post,
  Body,
  Get,
  Session,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './utils/LocalGuard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: any) {
    return this.authService.login(req);
  }
  @Get('')
  async getAuthSession(@Session() session: Record<string, any>) {
    session.authenticated = true;
    return session;
  }
}
