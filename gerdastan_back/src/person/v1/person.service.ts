import { Injectable } from '@nestjs/common';
import { TreeRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonEntity } from './person.entity';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(PersonEntity)
    private repo: TreeRepository<PersonEntity>,
  ) {}

  async person(personId: string) {
    return this.repo.findOneBy({ id: personId });
  }

  async deletePerson(personId: string) {
    return this.repo.delete({ id: personId });
  }

  async personTree() {
    return this.repo.findTrees();
  }

  async persons() {
    return this.repo.find();
  }

  async createPerson(data: PersonEntity) {
    data.parent = await this.repo.findOneBy({ id: data.parentId });
    return this.repo.save(data);
  }

  async updatePerson(id: string, person: PersonEntity) {
    return await this.repo.update(
      {
        id: id,
      },
      person,
    );
  }

  async addImage(id: string, files: string[]) {
    const person = await this.repo.findOneBy({ id });
    const images = person.images || [];
    images.push(...files);
    return await this.repo.update(
      {
        id: id,
      },
      { images: images },
    );
  }

  async addVideo(id: string, files: string[]) {
    const person = await this.repo.findOneBy({ id });
    const videos = person.videos || [];
    videos.push(...files);
    return await this.repo.update(
      {
        id: id,
      },
      { videos: videos },
    );
  }
}
