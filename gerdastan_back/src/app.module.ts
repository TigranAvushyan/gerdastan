import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PersonModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
