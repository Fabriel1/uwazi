import Immutable from 'immutable';

import * as types from 'app/Uploads/actions/actionTypes';

const initialState = {selectedDocuments: []};

export default function uiState(state = initialState, action = {}) {
  if (action.type === types.SELECT_DOCUMENT) {
    const alreadtySelected = state.get('selectedDocuments').filter((doc) => doc.get('_id') === action.doc._id).size;
    if (!alreadtySelected) {
      return state.update('selectedDocuments', selectedDocuments => selectedDocuments.push(Immutable.fromJS(action.doc)));
    }

    return state;
  }

  if (action.type === types.UNSELECT_DOCUMENT) {
    return state.update('selectedDocuments', selectedDocuments => selectedDocuments.filter((doc) => doc.get('_id') !== action.docId));
  }

  if (action.type === types.UNSELECT_ALL_DOCUMENTS) {
    return state.set('selectedDocuments', Immutable.fromJS([]));
  }

  if (action.type === types.UPDATE_SELECTED_ENTITIES) {
    return state.set('selectedDocuments', action.entities);
  }

  if (action.type === types.SELECT_DOCUMENTS) {
    return action.docs.reduce((_state, doc) => {
      const alreadtySelected = _state.get('selectedDocuments').filter((_doc) => _doc.get('_id') === doc._id).size;
      if (!alreadtySelected) {
        return _state.update('selectedDocuments', selectedDocuments => selectedDocuments.push(Immutable.fromJS(doc)));
      }
      return _state;
    }, state);
  }

  return Immutable.fromJS(state);
}
