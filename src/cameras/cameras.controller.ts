import { Controller, Post, Body } from '@nestjs/common';
import { CamerasService } from './cameras.service';
import { CaptureDto } from './dto/capture.dto';
import { ValidationPipe } from '@nestjs/common';

@Controller('lpr')
export class CamerasController {
    constructor(private readonly camerasService: CamerasService) { }

    @Post('capture')
    async capture(@Body(new ValidationPipe({ transform: true })) body: CaptureDto) {
        console.log('Request received:', body);
        await this.camerasService.captureAndQueue(body);
        return { status: 'queued' };
    }
}
