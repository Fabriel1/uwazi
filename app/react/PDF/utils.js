import PDFJS from './PDFJS';

const PDFUtils = {
  extractPDFInfo: pdfFile => new Promise((resolve) => {
    PDFJS.getDocument(pdfFile)
    .then((pdf) => {
      const pages = [];
      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
        pages.push(pdf.getPage(pageNumber).then(PDFUtils.extractPageInfo));
      }

      return Promise.all(pages)
      .then((result) => {
        const count = {};
        result.forEach((length, index) => {
          count[index + 1] = {
            chars: length
          };
          if (count[index]) {
            count[index + 1].chars += count[index].chars;
          }
        });
        resolve(count);
      });
    });
  }),

  extractPageInfo: page => new Promise((resolve) => {
    const textLayerDiv = document.createElement('div');

    textLayerDiv.addEventListener('textlayerrendered', () => {
      resolve(textLayerDiv.innerText.length);
    });

    textLayerDiv.className = 'textLayer';
    const textLayer = new PDFJS.DefaultTextLayerFactory().createTextLayerBuilder(textLayerDiv, null, page.getViewport(1), true);
    page.getTextContent({ normalizeWhitespace: true })
    .then((textContent) => {
      textLayer.setTextContent(textContent);
      textLayer.render();
    });
  })
};

export default PDFUtils;
