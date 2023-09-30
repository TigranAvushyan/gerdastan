import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { PersonModule } from './person/v1/person.module';

@Module({
  imports: [
    PersonModule,
    MulterModule.register({ dest: './uploads' }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
  ],
  providers: [AppService],
})
export class AppModule {}
