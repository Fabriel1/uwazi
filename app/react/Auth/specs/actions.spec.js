import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import backend from 'fetch-mock';

import {APIURL} from 'app/config.js';
import * as actions from '../actions';
import * as notifications from 'app/Notifications/actions/notificationsActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('auth actions', () => {
  beforeEach(() => {
    backend.restore();
    backend
    .post(APIURL + 'login', {body: JSON.stringify({success: true})})
    .post(APIURL + 'recoverPassword', {body: JSON.stringify({success: true})})
    .post(APIURL + 'resetPassword', {body: JSON.stringify({success: true})})
    .get(APIURL + 'user', {body: JSON.stringify({username: 'username'})});
  });

  afterEach(() => backend.restore());

  describe('login', () => {
    describe('when success', () => {
      it('should login, fetch user loged and store it in the state', (done) => {
        const expectedActions = [
          {type: 'auth/user/SET', value: {username: 'username'}}
        ];

        const store = mockStore({});

        let credentials = {username: 'username'};
        store.dispatch(actions.login(credentials))
        .then(() => {
          expect(backend.calls(APIURL + 'login')[0][1].body).toEqual(JSON.stringify(credentials));
          expect(store.getActions()).toEqual(expectedActions);
        })
        .then(done)
        .catch(done.fail);
      });
    });
  });

  describe('recoverPassword', () => {
    it('should post to recoverPassword with the email', (done) => {
      spyOn(notifications, 'notify');
      actions.recoverPassword('email@forgot.com')(jasmine.createSpy('dispatch'))
      .then(() => {
        expect(backend.calls(APIURL + 'recoverPassword')[0][1].body).toEqual(JSON.stringify({email: 'email@forgot.com'}));
        expect(notifications.notify).toHaveBeenCalled();
        done();
      })
      .catch(done.fail);
    });
  });

  describe('recoverPassword', () => {
    it('should post to resetPassword with new password and the key', (done) => {
      spyOn(notifications, 'notify');
      actions.resetPassword('asd123', 'uniqueKey')(jasmine.createSpy('dispatch'))
      .then(() => {
        expect(backend.calls(APIURL + 'resetPassword')[0][1].body).toEqual(JSON.stringify({password: 'asd123', key: 'uniqueKey'}));
        expect(notifications.notify).toHaveBeenCalled();
        done();
      })
      .catch(done.fail);
    });
  });
});
