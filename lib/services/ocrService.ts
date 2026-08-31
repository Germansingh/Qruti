/**
 * OCR & Document Processing Service Boundary Placeholder
 * Designed for modular replacement with pdfjs-dist / Tesseract.js / AWS Textract / Google Document AI
 */
export const ocrService = {
  /**
   * Extract raw text from PDF or Image file
   */
  async extractText(file: File): Promise<{ text: string; pages: number; isScanned: boolean }> {
    const isImage = file.type.startsWith('image/') || file.name.endsWith('.png') || file.name.endsWith('.jpg');

    return {
      text: `Extracted content from ${file.name}...\n\n[DEMO OCR PIPELINE ACTIVE]\nParagraph 1: Legal provisions and agreement parameters.\nParagraph 2: Financial obligations and liability clauses.`,
      pages: isImage ? 1 : 4,
      isScanned: isImage,
    };
  },
};
