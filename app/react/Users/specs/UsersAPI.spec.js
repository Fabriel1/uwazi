import users from 'app/Users/UsersAPI';
import api from 'app/utils/api';
import {APIURL} from 'app/config.js';
import backend from 'fetch-mock';
import {catchErrors} from 'api/utils/jasmineHelpers';

describe('UsersAPI', () => {
  beforeEach(() => {
    backend.restore();
    backend
    .post(APIURL + 'users', {body: JSON.stringify('ok')})
    .post(APIURL + 'users/new', {body: JSON.stringify('ok new')})
    .get(APIURL + 'user', {body: JSON.stringify({name: 'doe'})});
  });

  afterEach(() => backend.restore());

  describe('save()', () => {
    let user;

    beforeEach(() => {
      user = {
        name: 'doe',
        _id: '123'
      };
    });

    it('should post to users', (done) => {
      users.save(user)
      .then((response) => {
        expect(response).toEqual('ok');
        done();
      })
      .catch(catchErrors(done));
    });
  });

  describe('new()', () => {
    let user;

    beforeEach(() => {
      user = {
        name: 'doe',
        _id: '123'
      };
    });

    it('should post to users/new', (done) => {
      users.new(user)
      .then((response) => {
        expect(response).toEqual('ok new');
        done();
      })
      .catch(catchErrors(done));
    });
  });

  describe('currentUser()', () => {
    it('should request the logged in user', (done) => {
      users.currentUser()
      .then((response) => {
        expect(response).toEqual({name: 'doe'});
        done();
      })
      .catch(catchErrors(done));
    });
  });

  describe('list()', () => {
    it('should get all the users', (done) => {
      spyOn(api, 'get').and.returnValue(Promise.resolve({json: ['users']}));
      users.list()
      .then((response) => {
        expect(api.get).toHaveBeenCalledWith('users');
        expect(response).toEqual(['users']);
        done();
      })
      .catch(catchErrors(done));
    });
  });

  describe('delete()', () => {
    it('should delete the user', (done) => {
      const user = {_id: '1234'};
      spyOn(api, 'delete').and.returnValue(Promise.resolve({json: 'ok'}));
      users.delete(user)
      .then((response) => {
        expect(api.delete).toHaveBeenCalledWith('users', user);
        expect(response).toEqual('ok');
        done();
      })
      .catch(catchErrors(done));
    });
  });
});
