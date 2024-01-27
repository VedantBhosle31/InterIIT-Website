import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IitsService } from './iits.service';
import { CreateIitDto } from './dto/create-iit.dto';
import { UpdateIitDto } from './dto/update-iit.dto';

@Controller('iits')
export class IitsController {
  constructor(private readonly iitsService: IitsService) {}

  @Post()
  create(@Body() createIitDto: CreateIitDto) {
    return this.iitsService.create(createIitDto);
  }

  @Get()
  findAll() {
    return this.iitsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.iitsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIitDto: UpdateIitDto) {
    return this.iitsService.update(+id, updateIitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.iitsService.remove(+id);
  }
}
