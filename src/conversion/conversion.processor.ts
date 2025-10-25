import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import axios from 'axios';
import { CeleparService } from '../celepar/celepar.service';
import { KafkaService } from '../kafka/kafka.service';

@Processor('lprQueue')
export class ConversionProcessor {
    constructor(
        private celeparService: CeleparService,
        private kafkaService: KafkaService
    ) { }

    @Process('processLPR')
    async handleLPR(job: Job) {
        const { vsmImage, plate, cameraName, latitude, longitude, timestamp } = job.data;

        // Log início do processamento
        await this.kafkaService.sendLog('lpr-logs', { step: 'queued', plate, timestamp });

        // Conversão VSM → Base64
        const response = await axios.post(process.env.HIKIVISION_API, { vsm: vsmImage });
        const base64Image = response.data.base64;

        await this.kafkaService.sendLog('lpr-logs', { step: 'converted', plate, timestamp });

        // Consulta Celepar
        const status = await this.celeparService.checkOccurrence(
            { plate, cameraName, latitude, longitude, timestamp, imageBase64: base64Image },
            process.env.CELEPAR_TOKEN,
            process.env.CELEPAR_CONSUMER_ID
        );

        await this.kafkaService.sendLog('lpr-logs', { step: 'celepar', plate, status, timestamp });
    }
}
