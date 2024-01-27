import { IitService } from 'src/iit/iit.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/iit/hash.service';
import { Inject } from '@nestjs/common';
import { jwtConstants } from 'src/strategy/constants';
@Injectable()
export class AuthService {
  constructor(
    private iitService: IitService,
    private hashService: HashService,
    private jwtService: JwtService,
  ) {}

  async validateToken(token: string) {
    return this.jwtService.verify(token, {
      secret: jwtConstants.secret,
    });
  }
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.iitService.getUserByUsername(email);
    if (user && (await this.hashService.comparePassword(pass, user.password))) {
      return user;
    }
    return null;
  }

  async login(req: any) {
    const payload = {
      username: req.user.name,
      sub: req.user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
      role: req.user.role,
    };
  }
}
