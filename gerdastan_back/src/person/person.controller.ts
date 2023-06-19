import { Body, Controller, Get, Post } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/createPerson.dto';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get('')
  async getPerson() {
    return await this.personService.persons({});
  }
  @Post('')
  async createPerson(@Body() personData: CreatePersonDto) {
    return await this.personService.createPerson(personData);
  }
}
