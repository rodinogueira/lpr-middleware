import { Module } from '@nestjs/common';
import { CamerasService } from './cameras.service';
import { CamerasController } from './cameras.controller';
import { BullModule } from '@nestjs/bull';
import { ConversionProcessor } from '../conversion/conversion.processor';
import { CeleparModule } from '../celepar/celepar.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [
        BullModule.registerQueue({ name: 'lprQueue' }),
        CeleparModule,
        PrismaModule,
    ],
    controllers: [CamerasController],
    providers: [CamerasService, ConversionProcessor],
})
export class CamerasModule { }
