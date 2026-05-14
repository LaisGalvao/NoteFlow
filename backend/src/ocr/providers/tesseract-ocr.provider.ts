import { Injectable } from '@nestjs/common';
import { createWorker } from 'tesseract.js';
import { OcrProvider } from '../interfaces/ocr-provider.interface';

@Injectable()
export class TesseractOcrProvider implements OcrProvider {
  async extractText(imageBuffer: Buffer): Promise<string> {
    const worker = await createWorker('por+eng');
    try {
      const result = await worker.recognize(imageBuffer);
      return result.data.text.trim();
    } finally {
      await worker.terminate();
    }
  }
}
