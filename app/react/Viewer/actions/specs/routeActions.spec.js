import {APIURL} from 'app/config.js';
import backend from 'fetch-mock';
import referencesUtils from 'app/Viewer/utils/referencesUtils';

import * as routeActions from '../routeActions';

describe('Viewer routeActions', () => {
  let document = {_id: '1', title: 'title', pdfInfo: 'test'};
  let relationTypes = {rows: [{name: 'Supports', _id: '1'}]};
  let references = [{_id: '1', connectedDocument: '1'}, {_id: '2', connectedDocument: '2'}];
  let evidences = [];

  beforeEach(() => {
    backend.restore();
    backend
    .get(APIURL + 'documents?_id=documentId', {body: JSON.stringify({rows: [document]})})
    .get(APIURL + 'relationtypes', {body: JSON.stringify(relationTypes)})
    .get(APIURL + 'references/by_document/documentId', {body: JSON.stringify(references)})
    .get(APIURL + 'evidences?document=documentId', {body: JSON.stringify(evidences)});

    spyOn(referencesUtils, 'filterRelevant').and.returnValue(['filteredReferences']);
  });

  afterEach(() => backend.restore());

  describe('requestViewerState', () => {
    it('should request for the document passed, the thesauris and return an object to populate the state', (done) => {
      routeActions.requestViewerState('documentId', 'es')
      .then((state) => {
        let documentResponse = state.documentViewer.doc;
        let relationTypesResponse = state.documentViewer.relationTypes;
        let evidencesResponse = state.evidences;

        expect(documentResponse._id).toBe('1');
        expect(relationTypesResponse).toEqual(relationTypes.rows);
        expect(state.relationTypes).toEqual(relationTypes.rows);
        expect(evidencesResponse).toEqual(evidences);
        done();
      })
      .catch(done.fail);
    });

    it('should filter the relevant language and by-source references', (done) => {
      routeActions.requestViewerState('documentId', 'es')
      .then((state) => {
        let referencesResponse = state.documentViewer.references;

        expect(referencesUtils.filterRelevant).toHaveBeenCalledWith(references, 'es');
        expect(referencesResponse).toEqual(['filteredReferences']);
        done();
      })
      .catch(done.fail);
    });
  });

  describe('setViewerState()', () => {
    let dispatch;

    beforeEach(() => {
      dispatch = jasmine.createSpy('dispatch');
      routeActions.setViewerState({
        documentViewer:
        {
          doc: 'doc',
          references: 'references',
          templates: 'templates',
          thesauris: 'thesauris',
          relationTypes: 'relationTypes'
        },
        relationTypes: 'relationTypes',
        evidences: 'evidences'
      })(dispatch);
    });

    it('should call setTemplates with templates passed', () => {
      expect(dispatch).toHaveBeenCalledWith({type: 'relationTypes/SET', value: 'relationTypes'});
      expect(dispatch).toHaveBeenCalledWith({type: 'SET_REFERENCES', references: 'references'});
      expect(dispatch).toHaveBeenCalledWith({type: 'viewer/doc/SET', value: 'doc'});
      expect(dispatch).toHaveBeenCalledWith({type: 'viewer/relationTypes/SET', value: 'relationTypes'});
      expect(dispatch).toHaveBeenCalledWith({type: 'evidences/evidences/SET', value: 'evidences'});
    });
  });
});
