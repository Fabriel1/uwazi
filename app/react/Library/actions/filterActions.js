import * as types from 'app/Library/actions/actionTypes';
import libraryHelper from 'app/Library/helpers/libraryFilters';
import comonPropertiesHelper from 'app/Metadata/helpers/comonProperties';
import * as libraryActions from 'app/Library/actions/libraryActions';
import prioritySortingCriteria from 'app/utils/prioritySortingCriteria';

export function filterDocumentTypes(documentTypes, storeKey) {
  return function (dispatch, getState) {
    const state = getState();

    const templates = state.templates.toJS();
    const thesauris = state.thesauris.toJS();

    let libraryFilters = comonPropertiesHelper.comonProperties(templates, documentTypes)
    .filter((prop) => prop.filter);

    let aggregations = libraryFilters
    .filter((property) => property.type === 'select' || property.type === 'multiselect' || property.type === 'nested')
    .map((property) => {
      if (property.type === 'nested') {
        return {name: property.name, nested: true, nestedProperties: property.nestedProperties};
      }
      return {name: property.name, nested: false};
    });

    libraryFilters = libraryHelper.populateOptions(libraryFilters, thesauris);
    dispatch({type: types.SET_LIBRARY_FILTERS, documentTypes, libraryFilters});

    const usefulTemplates = documentTypes.length ? templates.filter(t => documentTypes.includes(t._id)) : templates;
    const {sort, order} = prioritySortingCriteria.get({
      currentCriteria: {sort: state[storeKey].search.sort, order: state[storeKey].search.order},
      filteredTemplates: usefulTemplates.map(t => t._id),
      templates: state.templates
    });

    const search = Object.assign({aggregations, types: documentTypes}, state.search, {sort, order});

    dispatch(libraryActions.searchDocuments(search, storeKey));
  };
}

export function resetFilters(storeKey) {
  return function (dispatch, getState) {
    dispatch({type: types.SET_LIBRARY_FILTERS, documentTypes: [], libraryFilters: []});
    libraryActions.searchDocuments(getState()[storeKey].search, storeKey)(dispatch, getState);
  };
}

export function toggleFilter(propertyName, properties) {
  return function (dispatch) {
    let updatedProperties = properties.map((property) => {
      if (property.name === propertyName) {
        property.active = !property.active;
      }
      return property;
    });
    dispatch({type: types.UPDATE_LIBRARY_FILTERS, libraryFilters: updatedProperties});
  };
}

export function activateFilter(propertyName, activate, properties) {
  return function (dispatch) {
    let updatedProperties = properties.map((property) => {
      if (property.name === propertyName) {
        property.active = activate;
      }
      return property;
    });
    dispatch({type: types.UPDATE_LIBRARY_FILTERS, libraryFilters: updatedProperties});
  };
}
