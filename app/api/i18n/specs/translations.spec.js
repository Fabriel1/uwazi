import database from 'api/utils/database.js';

import translations from '../translations.js';
import fixtures from './fixtures.js';

import {catchErrors} from 'api/utils/jasmineHelpers';

describe('translations', () => {
  beforeEach((done) => {
    database.reset_testing_database()
    .then(() => database.import(fixtures))
    .then(done)
    .catch(done.fail);
  });

  describe('get()', () => {
    it('should return the translations', (done) => {
      translations.get()
      .then((result) => {
        expect(result.rows.length).toBe(2);
        expect(result.rows[0].locale).toBe('en');
        expect(result.rows[0].contexts[0].id).toBe('System');
        expect(result.rows[0].contexts[0].type).toBe('Uwazi UI');

        expect(result.rows[0].contexts[1].id).toBe('Filters');
        expect(result.rows[0].contexts[1].type).toBe('Uwazi UI');

        expect(result.rows[0].contexts[2].id).toBe('Menu');
        expect(result.rows[0].contexts[2].type).toBe('Uwazi UI');

        expect(result.rows[0].contexts[3].id).toBe('entity_template_id');
        expect(result.rows[0].contexts[3].type).toBe('Entity');

        expect(result.rows[0].contexts[4].id).toBe('document_template_id');
        expect(result.rows[0].contexts[4].type).toBe('Document');

        expect(result.rows[1].locale).toBe('es');
        done();
      }).catch(catchErrors(done));
    });
  });

  describe('save()', () => {
    it('should save the translation and return it', (done) => {
      translations.save({locale: 'fr'})
      .then((result) => {
        expect(result._id).toBeDefined();
        expect(result.type).toBe('translation');
        done();
      }).catch(catchErrors(done));
    });
  });

  describe('addEntries()', () => {
    it('should add the new keys to each dictionary in the given contexts', (done) => {
      translations.addEntries([
        {contextId: 'System', key: 'Key', defaultValue: 'default'},
        {contextId: 'System', key: 'Key1', defaultValue: 'default 1'}
      ])
      .then((result) => {
        expect(result).toBe('ok');
        return translations.get();
      })
      .then((result) => {
        expect(result.rows[0].contexts[0].values.Key).toBe('default');
        expect(result.rows[1].contexts[0].values.Key).toBe('default');

        expect(result.rows[0].contexts[0].values.Key1).toBe('default 1');
        expect(result.rows[1].contexts[0].values.Key1).toBe('default 1');
        done();
      })
      .catch(catchErrors(done));
    });
  });

  describe('addEntry()', () => {
    it('should add the new key to each dictionary in the given context', (done) => {
      translations.addEntry('System', 'Key', 'default')
      .then((result) => {
        expect(result).toBe('ok');
        return translations.get();
      })
      .then((result) => {
        expect(result.rows[0].contexts[0].values.Key).toBe('default');
        expect(result.rows[1].contexts[0].values.Key).toBe('default');
        done();
      })
      .catch(catchErrors(done));
    });
  });

  describe('addContext()', () => {
    it('should add a context with his values', (done) => {
      let values = {Name: 'Name', Surname: 'Surname'};
      translations.addContext('System', 'Judge', values)
      .then((result) => {
        expect(result).toBe('ok');
        return translations.get();
      })
      .then((result) => {
        expect(result.rows[0].contexts[5].values).toEqual(values);
        expect(result.rows[1].contexts[1].values).toEqual(values);
        done();
      })
      .catch(catchErrors(done));
    });
  });

  describe('deleteContext()', () => {
    it('should add a context with his values', (done) => {
      translations.deleteContext('System')
      .then((result) => {
        expect(result).toBe('ok');
        return translations.get();
      })
      .then((result) => {
        expect(result.rows[0].contexts.length).toBe(4);
        expect(result.rows[1].contexts.length).toBe(0);
        done();
      })
      .catch(catchErrors(done));
    });
  });

  describe('updateContext()', () => {
    it('should add a context with his values', (done) => {
      let keyNameChanges = {Password: 'Pass', Account: 'Acc', 'System': 'Interface'};
      let deletedProperties = ['Age'];
      let context = {Pass: 'Pass', Acc: 'Acc', Email: 'Email', Name: 'Name', Interface: 'Interface'};

      translations.updateContext('System', 'Interface', keyNameChanges, deletedProperties, context)
      .then((result) => {
        expect(result).toBe('ok');
        return translations.get();
      })
      .then((result) => {
        expect(result.rows[0].contexts[0].label).toBe('Interface');
        expect(result.rows[0].contexts[0].values.Pass).toBe('Pass');
        expect(result.rows[0].contexts[0].values.Interface).toBe('Interface');
        expect(result.rows[1].contexts[0].values.Pass).toBe('Contraseña');

        expect(result.rows[0].contexts[0].values.Age).not.toBeDefined();
        expect(result.rows[1].contexts[0].values.Age).not.toBeDefined();
        expect(result.rows[0].contexts[0].values.System).not.toBeDefined();
        expect(result.rows[1].contexts[0].values.System).not.toBeDefined();

        expect(result.rows[0].contexts[0].values.Name).toBe('Name');
        expect(result.rows[1].contexts[0].values.Name).toBe('Name');
        done();
      })
      .catch(catchErrors(done));
    });
  });
});
