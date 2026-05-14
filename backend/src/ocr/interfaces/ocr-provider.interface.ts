export interface OcrProvider {
  extractText(imageBuffer: Buffer): Promise<string>;
}

export const OCR_PROVIDER = Symbol('OCR_PROVIDER');
