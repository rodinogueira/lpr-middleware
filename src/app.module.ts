import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { CamerasModule } from './cameras/cameras.module';
import { PrismaModule } from './prisma/prisma.module';
import { CeleparModule } from './celepar/celepar.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.forRoot({
      redis: { host: 'localhost', port: 6379 },
    }),
    PrismaModule,
    CamerasModule,
    CeleparModule,
  ],
})
export class AppModule { }
