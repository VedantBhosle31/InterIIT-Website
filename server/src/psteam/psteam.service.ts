import { Injectable } from '@nestjs/common';
import { CreatePsteamDto } from './create-psteam.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { IitService } from 'src/iit/iit.service';
import { Inject } from '@nestjs/common';
@Injectable()
export class PsteamService {
  constructor(
    @Inject(IitService) private iitService: IitService,
    private prisma: PrismaService,
  ) {}

  async findAll() {}

  async findTeam(userid: string, psid: string) {
    let user;

    return;
  }
  async create(username: string, createPsteamDto: CreatePsteamDto) {
    await this.iitService.addPsteam(username, createPsteamDto);
    let userDB = await this.iitService.getUserByUsername(username);
  }
}
