import PDFObject from '../PDF.js';

describe('PDF', () => {
  let pdf;

  describe('extractText', () => {
    let filepath;
    beforeEach(() => {
      filepath = `${__dirname}/12345.test.pdf`;
      pdf = new PDFObject(filepath);
    });

    fit('should extract the text of the pdf by page, every word on every page should have appended the page number in between [[]]', (done) => {
      pdf.extractText()
      .then(([text]) => {
        const lines = text.split(/\f/);
        expect(lines[0]).toBe('Page[[1]] 1[[1]]');
        expect(lines[1]).toBe('Page[[2]] 2[[2]]');
        expect(lines[2]).toBe('Page[[3]] 3[[3]]');
        done();
      })
      .catch(done.fail);
    });

    fit('should extract number of characters per page', (done) => {
      filepath = `${__dirname}/batman_wikipedia.pdf`;
      pdf = new PDFObject(filepath);
      pdf.extractText()
      .then((data) => {
        const pdfInfo = Object.keys(data[1]).map(key => data[1][key].chars).sort((a, b) => a - b);
        expect(pdfInfo).toMatchSnapshot();
        done();
      })
      .catch(done.fail);
    });
  });

  describe('convert', () => {
    const filepath = `${__dirname}/12345.test.pdf`;
    beforeEach(() => {
      pdf = new PDFObject(filepath);
    });

    it('should optimize and extract html and text', (done) => {
      pdf.convert()
      .then((conversion) => {
        const lines = conversion.fullText.split(/\f/);

        expect(lines[0]).toBe('Page[[1]] 1[[1]]');
        //expect(conversion.fullText).toMatch('Page\[\[1\]\] 1');
        done();
      })
      .catch(done.fail);
    });

    describe('when there is a conversion error', () => {
      it('should throw a conversion_error', (done) => {
        spyOn(pdf, 'extractText').and.returnValue(Promise.reject());
        pdf.convert()
        .then(() => {
          done.fail('should have thrown a conversion_error');
        })
        .catch((error) => {
          expect(error).toEqual({ error: 'conversion_error' });
          done();
        });
      });
    });
  });
});
