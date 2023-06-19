import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Person, Prisma } from '@prisma/client';

@Injectable()
export class PersonService {
  constructor(private prisma: PrismaService) {}

  async person(personId: number) {
    return this.prisma.person.findUnique({ where: { id: personId } });
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

  // async addChildren(personId: number, children: Prisma.PersonCreateInput) {
  //   return this.prisma.person.update({
  //     where: { id: personId },
  //     data: {
  //       children: {
  //         upsert: children,
  //       },
  //     },
  //   });
  // }

  async createPerson(data: Prisma.PersonCreateInput): Promise<Person> {
    return this.prisma.person.create({
      data,
    });
  }
}
