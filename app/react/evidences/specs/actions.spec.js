import {browserHistory} from 'react-router';
import thunk from 'redux-thunk';

import configureMockStore from 'redux-mock-store';

import * as actions from '../actions.js';
import evidencesAPI from '../evidencesAPI';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

fdescribe('evidences actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  describe('setSuggestions', () => {
    it('should set the suggestions', () => {
      const expectedActions = [{type: 'evidences/suggestions/SET', value: 'suggestions'}];

      actions.setSuggestions('suggestions')(store.dispatch);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('unsetSuggestions', () => {
    it('should unset the suggestions', () => {
      const expectedActions = [{type: 'evidences/suggestions/UNSET'}];

      actions.unsetSuggestions()(store.dispatch);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('getSuggestions', () => {
    it('should request suggestions and set them on the store', (done) => {
      spyOn(evidencesAPI, 'getSuggestions').and.returnValue(Promise.resolve('suggestionsResponse'));
      const expectedActions = [{type: 'evidences/suggestions/SET', value: 'suggestionsResponse'}];

      actions.getSuggestions('docId')(store.dispatch)
      .then(() => {
        expect(evidencesAPI.getSuggestions).toHaveBeenCalledWith('docId');
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });
  });

  describe('add Evidence', () => {
    it('should set the evidence', () => {
      const expectedActions = [{type: 'evidences/evidence/SET', value: {text: 'evidence text'}}];

      actions.setEvidence({text: 'evidence text'})(store.dispatch);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('cancel Evidence', () => {
    it('should unset the evidence', () => {
      const expectedActions = [{type: 'evidences/evidence/UNSET'}];

      actions.unsetEvidence()(store.dispatch);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('saveEvidence', () => {
    it('should save the evidence', (done) => {
      spyOn(evidencesAPI, 'save').and.returnValue(Promise.resolve({entity: 'savedDoc', evidence: 'savedEvidence'}));
      const expectedActions = [
        {type: 'evidences/evidence/UNSET'},
        {type: 'viewer/doc/SET', value: 'savedDoc'},
        {type: 'evidences/evidences/PUSH', value: 'savedEvidence'}
      ];
      const evidence = {test: 'test'};

      actions.saveEvidence(evidence)(store.dispatch)
      .then(() => {
        expect(evidencesAPI.save).toHaveBeenCalledWith(evidence);
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });
  });

  describe('get', () => {
    it('should get evidences for the doc', (done) => {
      spyOn(evidencesAPI, 'get').and.returnValue(Promise.resolve('evidences'));
      const expectedActions = [
        {type: 'evidences/evidences/SET', value: 'evidences'}
      ];
      const docId = 'docId';

      actions.getEvidences(docId)(store.dispatch)
      .then(() => {
        expect(evidencesAPI.get).toHaveBeenCalledWith(docId);
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });
  });

  //describe('loadMoreEvidences', () => {
    //it('should call searchEvidences with the new limit', (done) => {
      //const limit = 'limit';
      //spyOn(actions, 'searchEvidences');
      //store.dispatch(actions.loadMoreEvidences({}, limit))
      //.then(() => {
        //expect(actions.searchEvidences).toHaveBeenCalledWith({}, limit);
        //done();
      //});
    //});
  //});

  describe('searchEvidences', () => {
    it('should change the url with the new params', () => {
      const limit = 'limit';
      spyOn(browserHistory, 'push');
      store.dispatch(actions.searchEvidences({}, limit));
      expect(browserHistory.push).toHaveBeenCalledWith('/evidences/?q=(limit:limit)');
    });
  });
});
