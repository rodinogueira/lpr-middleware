import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class CamerasService {
    constructor(@InjectQueue('lprQueue') private lprQueue: Queue) { }

    async captureAndQueue(data: any) {
        await this.lprQueue.add('processLPR', data);
        console.log(`Queued capture for plate ${data.plate}`);
    }
}
