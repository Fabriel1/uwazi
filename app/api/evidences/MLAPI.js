import {MLAPIURL} from '../config/config.js';
import request from 'shared/JSONRequest';

export default {
  getSuggestions: (data) => {
    return request.post(MLAPIURL + 'classification/predict', data).then((response) => response.json);
  },

  //
  getSuggestionsForOneValue: (data) => {
    return request.post(MLAPIURL + 'classification/predictOneModel', data).then((response) => response.json);
  },
  //

  train: (data) => {
    return request.post(MLAPIURL + 'classification/train', data);
  },

  retrainModel: (data) => {
    return request.post(MLAPIURL + 'classification/retrain', data);
  },

  setUp: (data) => {
    return request.post(MLAPIURL + 'classification/setUp', data)
    .then((response) => {
      return response;
    });
  }
};
