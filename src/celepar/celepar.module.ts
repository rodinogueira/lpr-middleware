import { Module } from '@nestjs/common';
import { CeleparService } from './celepar.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    providers: [CeleparService],
    exports: [CeleparService],
})
export class CeleparModule { }
