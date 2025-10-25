// kafka.module.ts
import { Module, Global } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { KafkaConsumerService } from './kafka.consumer';

@Global() // opcional: se quiser que qualquer módulo consiga usar sem importar explicitamente
@Module({
    providers: [KafkaService, KafkaConsumerService],
    exports: [KafkaService, KafkaConsumerService], // exporta ambos
})
export class KafkaModule { }
