import { Inject } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { Prisma } from '@prisma/client';
import { IitService } from 'src/iit/iit.service';
import type { IIT } from '@prisma/client';

export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(IitService)
    private userService: IitService,
  ) {
    super();
  }
  serializeUser(user: IIT, done: (err, user: IIT) => void) {
    done(null, user);
  }
  async deserializeUser(user: IIT, done: (err, user: IIT) => void) {
    const userDB = await this.userService.getUserByUsername(user.name);
    return userDB ? done(null, userDB) : done(null, null);
  }
}
