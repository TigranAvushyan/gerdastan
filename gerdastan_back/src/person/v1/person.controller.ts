import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/createPerson.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Prisma } from '@prisma/client';

@Controller('/v1/person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get('')
  async getPersons() {
    return this.personService.persons({});
  }

  @Get('/tree')
  async getPersonTree() {
    return this.personService.personTree();
  }

  @Get(':id')
  async getPerson(@Param('id', ParseIntPipe) id: number) {
    return this.personService.person(id);
  }
  @Delete(':id')
  async deletePerson(@Param('id', ParseIntPipe) id: number) {
    return this.personService.deletePerson(id);
  }

  @Post('')
  async createPerson(@Body() personData: CreatePersonDto) {
    return await this.personService.createPerson(personData);
  }

  @Post(':id/image')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads',
        filename(req, file, callback) {
          callback(
            null,
            `${Date.now()}${Math.floor(Math.random() * 100)}-${
              file.originalname
            }`,
          );
        },
      }),
    }),
  )
  uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const fileNames = files.map((i) => i.filename);
    return this.personService.addImage(id, fileNames);
  }

  @Patch(':id')
  updatePerson(
    @Param('id', ParseIntPipe) id: number,
    @Body() person: Prisma.PersonUpdateInput,
  ) {
    return this.personService.updatePerson(id, person);
  }
}
