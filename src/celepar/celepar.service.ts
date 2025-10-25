import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CeleparService {
    constructor(private prisma: PrismaService) { }

    async checkOccurrence(data: any, token: string, consumerId: string) {
        try {
            const response = await axios.post(
                'https://celepar-api/detector',
                {
                    plate: data.plate,
                    timestamp: data.timestamp,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    imageBase64: data.imageBase64,
                },
                {
                    headers: {
                        'Camera-Name': data.cameraName,
                        'Authorization': `Bearer ${token}`,
                        'Consumer-ID': consumerId,
                    },
                },
            );

            const status = response.data.status === 'alert' ? 'alert' : 'ok';

            if (status === 'alert') {
                await this.prisma.occurrence.create({ data: { ...data, status } });
                console.log(`Occurrence saved for plate ${data.plate}`);
            }

            return status;
        } catch (error) {
            console.error('Erro na consulta Celepar:', error.message);
            throw error;
        }
    }
}
