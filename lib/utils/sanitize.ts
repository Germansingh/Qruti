/**
  * Clean and sanitize document filenames to prevent duplicated extensions (e.g. "resume.pdf.pdf" -> "resume.pdf")
  */
export function sanitizeFileName(fileName: string): string {
  if (!fileName) return "document.pdf";
  
  let cleaned = fileName.trim();
  // Fix duplicated .pdf.pdf, .jpg.jpg, .png.png
  cleaned = cleaned.replace(/(\.pdf){2,}$/i, '.pdf');
  cleaned = cleaned.replace(/(\.jpg){2,}$/i, '.jpg');
  cleaned = cleaned.replace(/(\.png){2,}$/i, '.png');
  
  return cleaned;
}

/**
 * Format document title from filename
 */
export function formatDocumentTitle(fileName: string): string {
  const sanitized = sanitizeFileName(fileName);
  return sanitized.replace(/\.[^/.]+$/, '').replace(/_/g, ' ').trim();
}
