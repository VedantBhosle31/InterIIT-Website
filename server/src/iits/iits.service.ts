import { Injectable } from '@nestjs/common';
import { CreateIitDto } from './dto/create-iit.dto';
import { UpdateIitDto } from './dto/update-iit.dto';

@Injectable()
export class IitsService {
  create(createIitDto: CreateIitDto) {
    return 'This action adds a new iit';
  }

  findAll() {
    return `This action returns all iits`;
  }

  findOne(id: number) {
    return `This action returns a #${id} iit`;
  }

  update(id: number, updateIitDto: UpdateIitDto) {
    return `This action updates a #${id} iit`;
  }

  remove(id: number) {
    return `This action removes a #${id} iit`;
  }
}
