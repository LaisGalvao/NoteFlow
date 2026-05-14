import { Inject, Injectable } from '@nestjs/common';
import { OCR_PROVIDER } from './interfaces/ocr-provider.interface';
import type { OcrProvider } from './interfaces/ocr-provider.interface';

@Injectable()
export class OcrService {
  constructor(@Inject(OCR_PROVIDER) private readonly provider: OcrProvider) {}

  extractText(imageBuffer: Buffer) {
    return this.provider.extractText(imageBuffer);
  }
}
