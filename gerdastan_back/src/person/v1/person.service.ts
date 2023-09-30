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

  async createParent(childrenId: string, data: PersonEntity) {
    const children = await this.repo.findOneBy({ id: childrenId });

    const parent = this.repo.create(data);
    parent.parentId = null;
    const p = await this.repo.save(parent);
    children.parent = p;
    children.parentId = p.id;
    return this.repo.save(children);
  }

  async updatePerson(id: string, person: PersonEntity) {
    const oldData = await this.repo.findOne({
      where: { id },
    });
    return this.repo.save({
      ...oldData,
      ...person,
    });
  }

  async addImage(id: string, files: string[]) {
    const person = await this.repo.findOneBy({ id });
    const images = person.images || [];
    images.push(...files);
    return this.repo.save({
      ...person,
      images: images,
    });
  }

  async addVideo(id: string, files: string[]) {
    const person = await this.repo.findOneBy({ id });
    const videos = person.videos || [];
    videos.push(...files);
    return await this.repo.save({
      ...person,
      videos: videos,
    });
  }
}
