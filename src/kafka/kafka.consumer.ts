import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Kafka, Consumer } from 'kafkajs';

@Injectable()
export class KafkaConsumerService implements OnModuleInit, OnModuleDestroy {
    private kafka: Kafka;
    private consumer: Consumer;

    async onModuleInit() {
        this.kafka = new Kafka({
            clientId: 'lpr-app-consumer',
            brokers: ['localhost:9092'], // IP ou container do Kafka
        });

        this.consumer = this.kafka.consumer({ groupId: 'lpr-logs-group' });
        await this.consumer.connect();
        await this.consumer.subscribe({ topic: 'lpr-logs', fromBeginning: true });

        await this.consumer.run({
            eachMessage: async ({ message }) => {
                const log = JSON.parse(message.value.toString());
                console.log('[KafkaConsumer] Log recebido:', log);
                // Aqui você pode salvar no DB ou processar para dashboards
            },
        });

        console.log('[KafkaConsumer] Conectado e escutando logs');
    }

    async onModuleDestroy() {
        await this.consumer.disconnect();
    }
}
