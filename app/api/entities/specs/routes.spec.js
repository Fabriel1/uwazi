import documentRoutes from '../routes.js';
import database from '../../utils/database.js';
import fixtures from './fixtures.js';
import instrumentRoutes from '../../utils/instrumentRoutes';
import entities from '../entities';
import templates from '../../templates/templates';
import thesauris from '../../thesauris/thesauris';
import {catchErrors} from 'api/utils/jasmineHelpers';

describe('entities', () => {
  let routes;

  beforeEach((done) => {
    database.reset_testing_database()
    .then(() => database.import(fixtures))
    .then(done)
    .catch(done.fail);
    routes = instrumentRoutes(documentRoutes);
  });

  describe('POST', () => {
    it('should need authorization', () => {
      expect(routes.post('/api/entities')).toNeedAuthorization();
    });

    it('should create a new document with use user', (done) => {
      let req = {
        body: {title: 'Batman begins'},
        user: {_id: 'c08ef2532f0bd008ac5174b45e033c93', username: 'admin'},
        language: 'lang'
      };

      spyOn(entities, 'save').and.returnValue(new Promise((resolve) => resolve('document')));
      routes.post('/api/entities', req)
      .then((document) => {
        expect(document).toBe('document');
        expect(entities.save).toHaveBeenCalledWith(req.body, {user: req.user, language: 'lang'});
        done();
      })
      .catch(catchErrors(done));
    });

    it('should emit thesauriChange socket event with the modified thesauri based on the entity template', (done) => {
      let req = {
        body: {title: 'Batman begins', template: 'template'},
        user: {_id: 'c08ef2532f0bd008ac5174b45e033c93', username: 'admin'},
        language: 'lang',
        io: {
          sockets: {
            emit: jasmine.createSpy('emit').and.callFake((event, thesauri) => {
              expect(event).toBe('thesauriChange');
              expect(thesauri).toBe('templateTransformed');
              expect(thesauris.templateToThesauri).toHaveBeenCalledWith('template', 'lang');
              done();
            })
          }
        }
      };

      spyOn(entities, 'save').and.returnValue(new Promise((resolve) => resolve('document')));
      spyOn(templates, 'getById').and.returnValue(new Promise((resolve) => resolve('template')));
      spyOn(thesauris, 'templateToThesauri').and.returnValue(new Promise((resolve) => resolve('templateTransformed')));
      routes.post('/api/entities', req)
      .catch(catchErrors(done));
    });
  });

  describe('GET', () => {
    it('should return matching document', (done) => {
      spyOn(entities, 'get').and.returnValue(Promise.resolve('result'));
      let req = {
        query: {_id: 'id'},
        language: 'lang'
      };

      routes.get('/api/entities', req)
      .then((response) => {
        expect(entities.get).toHaveBeenCalledWith('id', 'lang');
        expect(response).toBe('result');
        done();
      })
      .catch(catchErrors(done));
    });
  });

  describe('/api/entities/count_by_template', () => {
    it('should return count of entities using a specific template', (done) => {
      spyOn(entities, 'countByTemplate').and.returnValue(new Promise((resolve) => resolve(2)));
      let req = {query: {templateId: 'templateId'}};

      routes.get('/api/entities/count_by_template', req)
      .then((response) => {
        expect(entities.countByTemplate).toHaveBeenCalledWith('templateId');
        expect(response).toEqual(2);
        done();
      })
      .catch(catchErrors(done));
    });
  });

  describe('DELETE', () => {
    beforeEach(() => {
      spyOn(entities, 'delete').and.returnValue(Promise.resolve({json: 'ok'}));
    });

    it('should use entities to delete it', (done) => {
      let req = {query: {sharedId: 123, _rev: 456}};
      return routes.delete('/api/entities', req)
      .then(() => {
        expect(entities.delete).toHaveBeenCalledWith(req.query.sharedId);
        done();
      })
      .catch(catchErrors(done));
    });
  });
});
