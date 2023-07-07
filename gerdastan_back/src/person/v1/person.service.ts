import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Person, Prisma } from '@prisma/client';
import { listToTree } from '../../helpers/listToTree/listToTree';

@Injectable()
export class PersonService {
  constructor(private prisma: PrismaService) {}

  async person(personId: number) {
    return this.prisma.person.findUnique({
      where: { id: personId },
    });
  }

  async deletePerson(personId: number) {
    return this.prisma.person.delete({
      where: { id: personId },
    });
  }

  async personTree() {
    const list = await this.prisma.person.findMany({
      include: {
        children: true,
      },
    });
    return listToTree<Person>(list);
  }

  async persons(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PersonWhereUniqueInput;
    where?: Prisma.PersonWhereInput;
    orderBy?: Prisma.PersonOrderByWithRelationInput;
  }): Promise<Person[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.person.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        children: true,
      },
    });
  }

  async createPerson(data: Prisma.PersonCreateInput): Promise<Person> {
    return this.prisma.person.create({
      data,
    });
  }

  async updatePerson(id: number, data: Prisma.PersonUpdateInput) {
    return this.prisma.person.update({ where: { id }, data });
  }

  async addImage(id: number, images: string[]) {
    return this.prisma.person.update({
      where: { id },
      data: { images: { push: images } },
    });
  }
}
