import evidencesRoutes from '../routes.js';
import instrumentRoutes from '../../utils/instrumentRoutes';
import evidences from '../evidences';
import MLAPI from '../MLAPI';
import {catchErrors} from 'api/utils/jasmineHelpers';

describe('evidences routes', () => {
  let routes;

  beforeEach(() => {
    routes = instrumentRoutes(evidencesRoutes);
  });

  describe('POST', () => {
    let req;
    beforeEach(() => {
      req = {
        body: {evidence: {text: 'evidence text'}},
        user: {username: 'admin'},
        language: 'lang',
        io: {sockets: {emit: () => {}}}
      };
      spyOn(MLAPI, 'train');
    });

    it('should need authorization', () => {
      expect(routes.post('/api/evidences', req)).toNeedAuthorization();
    });

    it('should create a new evidence', (done) => {
      spyOn(evidences, 'save').and.returnValue(new Promise((resolve) => resolve('document')));

      routes.post('/api/evidences', req)
      .then((result) => {
        expect(result).toBe('document');
        expect(evidences.save).toHaveBeenCalledWith(req.body, req.user, req.language);
        done();
      })
      .catch(catchErrors);
    });

    it('should call the train MLapi endpoint with the evidence', (done) => {
      spyOn(evidences, 'save').and.returnValue(new Promise((resolve) => resolve('document')));

      routes.post('/api/evidences', req)
      .then((result) => {
        expect(result).toBe('document');
        expect(MLAPI.train).toHaveBeenCalledWith(req.body);
        done();
      })
      .catch(catchErrors);
    });
  });

  describe('retrainModel', () => {
    let req;
    beforeEach(() => {
      req = {
        body: {property: 'property', value: 'value'}
      };
    });

    it('should retrainModel', (done) => {
      spyOn(evidences, 'retrainModel').and.returnValue(Promise.resolve('response'));

      routes.post('/api/evidences/retrainModel', req)
      .then((result) => {
        expect(result).toBe('response');
        expect(evidences.retrainModel).toHaveBeenCalledWith('property', 'value');
        done();
      })
      .catch(catchErrors);
    });
  });

  describe('getSuggestionsForPropertyValue', () => {
    let req;
    beforeEach(() => {
      req = {
        body: {property: 'property', value: 'value'},
        language: 'en'
      };
    });

    it('should retrainModel', (done) => {
      spyOn(evidences, 'getSuggestionsForOneValue').and.returnValue(Promise.resolve('response'));

      routes.post('/api/evidences/get_suggestions_property_value', req)
      .then((result) => {
        expect(result).toBe('response');
        expect(evidences.getSuggestionsForOneValue).toHaveBeenCalledWith('property', 'value', 'en');
        done();
      })
      .catch(catchErrors);
    });
  });

  describe('GET', () => {
    let req;
    beforeEach(() => {
      req = {
        query: {id: 'id'},
        user: {username: 'admin'},
        language: 'lang',
        io: {sockets: {emit: () => {}}}
      };
    });

    it('should get evidences passing query', (done) => {
      spyOn(evidences, 'get').and.returnValue(Promise.resolve('evidences'));

      routes.get('/api/evidences', req)
      .then((result) => {
        expect(result).toBe('evidences');
        expect(evidences.get).toHaveBeenCalledWith({id: 'id', language: 'lang'});
        done();
      })
      .catch(catchErrors);
    });
  });
});
