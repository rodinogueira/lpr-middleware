import { IsString, IsNumber, IsNotEmpty, IsDateString } from 'class-validator';

export class CaptureDto {
    @IsString()
    @IsNotEmpty()
    plate: string;

    @IsString()
    @IsNotEmpty()
    vsmImage: string;

    @IsNumber()
    latitude: number;

    @IsNumber()
    longitude: number;

    @IsString()
    @IsNotEmpty()
    cameraName: string;

    @IsDateString()
    timestamp: string;
}
