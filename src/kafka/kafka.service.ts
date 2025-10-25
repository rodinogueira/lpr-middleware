import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit {
    private kafka: Kafka;
    private producer: Producer;

    async onModuleInit() {
        this.kafka = new Kafka({
            clientId: 'lpr-app',
            brokers: ['localhost:9092'],
        });

        this.producer = this.kafka.producer();
        await this.producer.connect();
    }

    async sendLog(topic: string, message: any) {
        await this.producer.send({
            topic,
            messages: [{ value: JSON.stringify(message) }],
        });
    }
}
