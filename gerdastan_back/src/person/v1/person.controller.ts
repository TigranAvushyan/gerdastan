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
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PersonEntity } from './person.entity';

@Controller('/v1/person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get('')
  async getPersons() {
    return this.personService.persons();
  }

  @Get('/tree')
  async getPersonTree() {
    return this.personService.personTree();
  }

  @Get(':id')
  async getPerson(@Param('id', ParseIntPipe) id: string) {
    return this.personService.person(id);
  }

  @Delete(':id')
  async deletePerson(@Param('id', ParseIntPipe) id: string) {
    return this.personService.deletePerson(id);
  }

  @Post('')
  async createPerson(@Body() personData: PersonEntity) {
    return await this.personService.createPerson(personData);
  }
  @Post('/create-parent/:id')
  async createParent(@Param('id', ParseIntPipe) id: string, @Body() personData: PersonEntity) {
    return await this.personService.createParent(id, personData);
  }

  @Post(':id/image')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads',
        filename(req, file, callback) {
          callback(null, `${Date.now()}${Math.floor(Math.random() * 100)}-${file.originalname}`);
        },
      }),
    }),
  )
  uploadImage(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('id', ParseIntPipe) id: string,
  ) {
    const file = files.map((i) => i.filename);
    return this.personService.addImage(id, file);
  }

  @Post(':id/video')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads',
        filename(req, file, callback) {
          callback(null, `${Date.now()}${Math.floor(Math.random() * 100)}-${file.originalname}`);
        },
      }),
    }),
  )
  uploadVideo(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('id', ParseIntPipe) id: string,
  ) {
    const file = files.map((i) => i.filename);
    return this.personService.addVideo(id, file);
  }

  @Patch(':id')
  updatePerson(@Param('id', ParseIntPipe) id: string, @Body() person: PersonEntity) {
    return this.personService.updatePerson(id, person);
  }
}
