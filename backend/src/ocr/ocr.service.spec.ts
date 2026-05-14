import { OcrService } from './ocr.service';

describe('OcrService', () => {
  it('delegates extraction to provider', async () => {
    const provider = { extractText: jest.fn().mockResolvedValue('texto') };
    const service = new OcrService(provider);

    const result = await service.extractText(Buffer.from('fake-image'));

    expect(provider.extractText).toHaveBeenCalled();
    expect(result).toBe('texto');
  });
});
