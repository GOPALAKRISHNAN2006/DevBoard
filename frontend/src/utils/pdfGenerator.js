import html2pdf from 'html2pdf.js';
import toast from 'react-hot-toast';

/**
 * Utility to generate and download a professional single-page ATS-friendly PDF
 */
export const downloadResumePdf = async (elementId, filename = 'Resume.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) {
    toast.error('Resume preview element not found');
    return;
  }

  const opt = {
    margin: [4, 6, 4, 6], // top, left, bottom, right in mm (compact for single page fit)
    filename: filename.endsWith('.pdf') ? filename : `${filename}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      logging: false,
      letterRendering: true,
      scrollX: 0,
      scrollY: 0,
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
      compress: true,
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
  };

  try {
    toast.loading('Generating single-page PDF...', { id: 'pdf-toast' });
    await html2pdf().set(opt).from(element).save();
    toast.success('Single-page resume downloaded successfully!', { id: 'pdf-toast' });
  } catch (error) {
    console.error('PDF Generation Error:', error);
    toast.error('Failed to generate PDF. Using print dialog fallback.', { id: 'pdf-toast' });
    window.print();
  }
};
