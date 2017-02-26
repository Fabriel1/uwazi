import pages from '../pages.js';
import {catchErrors} from 'api/utils/jasmineHelpers';
import {mockID} from 'shared/uniqueID';
import date from 'api/utils/date.js';

import fixtures, {pageToUpdate} from './fixtures.js';
import {db} from 'api/utils';

describe('pages', () => {
  beforeEach((done) => {
    db.clearAllAndLoad(fixtures, (err) => {
      if (err) {
        done.fail(err);
      }
      done();
    });
  });

  describe('save', () => {
    it('should create a new document with logged user id and UTC date for each language', (done) => {
      spyOn(date, 'currentUTC').and.returnValue(1);
      mockID('sharedid');

      let doc = {title: 'Batman begins'};
      let user = {_id: db.id()};

      pages.save(doc, user, 'es')
      .then((result) => {
        return pages.get({sharedId: result.sharedId});
      })
      .then((docs) => {
        expect(docs.length).toBe(3);
        expect(docs[0].language).toBe('es');
        expect(docs[0].title).toBe(doc.title);
        expect(docs[0].user.equals(user._id)).toBe(true);
        expect(docs[0].creationDate).toEqual(1);
        done();
      })
      .catch(catchErrors(done));
    });

    it('should return the newly created document', (done) => {
      let doc = {title: 'the dark knight'};
      let user = {_id: db.id()};

      pages.save(doc, user, 'es')
      .then((createdDocument) => {
        expect(createdDocument._id.toString()).toBeDefined();
        expect(createdDocument.title).toBe(doc.title);
        expect(createdDocument.user.equals(user._id)).toBe(true);
        expect(createdDocument.language).toBe('es');
        done();
      })
      .catch(catchErrors(done));
    });

    describe('when updating', () => {
      it('should not assign again user and creation date and partial update data', (done) => {
        spyOn(date, 'currentUTC').and.returnValue(10);

        return pages.save({_id: pageToUpdate, sharedId: '1', title: 'Edited title'}, 'another_user')
        .then((modifiedDoc) => {
          expect(modifiedDoc.title).toBe('Edited title');
          expect(modifiedDoc.user).not.toBe('another_user');
          expect(modifiedDoc.creationDate).toBe(1);
          done();
        })
        .catch(catchErrors(done));
      });
    });
  });

  describe('delete', () => {
    it('should delete the document in all languages', (done) => {
      let sharedId = '1';
      return pages.delete(sharedId)
      .then(() => {
        return pages.get({sharedId});
      })
      .then((result) => {
        expect(result.length).toBe(0);
        done();
      })
      .catch(catchErrors(done));
    });
  });
});
