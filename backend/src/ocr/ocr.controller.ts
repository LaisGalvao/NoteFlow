import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OcrService } from './ocr.service';

@Controller('ocr')
export class OcrController {
  constructor(private readonly ocrService: OcrService) {}

  @Post('extract')
  @UseInterceptors(FileInterceptor('image'))
  async extract(@UploadedFile() file?: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Imagem não enviada.');
    }

    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('Arquivo inválido. Envie uma imagem.');
    }

    const text = await this.ocrService.extractText(file.buffer);
    return { text };
  }
}
