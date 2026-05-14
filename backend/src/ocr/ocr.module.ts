import { Module } from '@nestjs/common';
import { OcrController } from './ocr.controller';
import { OCR_PROVIDER } from './interfaces/ocr-provider.interface';
import { TesseractOcrProvider } from './providers/tesseract-ocr.provider';
import { OcrService } from './ocr.service';

@Module({
  controllers: [OcrController],
  providers: [
    OcrService,
    TesseractOcrProvider,
    {
      provide: OCR_PROVIDER,
      useExisting: TesseractOcrProvider,
    },
  ],
})
export class OcrModule {}
