import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { PrismaModule } from './prisma/prisma.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    PersonModule,
    PrismaModule,
    MulterModule.register({ dest: './uploads' }),
  ],
  providers: [AppService],
})
export class AppModule {}
