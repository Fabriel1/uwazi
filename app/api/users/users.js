import SHA256 from 'crypto-js/sha256';
import mailer from '../utils/mailer';
import random from 'shared/uniqueID';

import model from './usersModel';
import passwordRecoveriesModel from './passwordRecoveriesModel';
import {createError} from 'api/utils';

const encryptPassword = password => SHA256(password).toString();
export default {
  save(user, currentUser) {
    return model.get({_id: user._id})
    .then(([userInTheDatabase]) => {
      if (user.hasOwnProperty('password') && user._id && user._id !== currentUser._id.toString()) {
        return Promise.reject(createError('Can not change other user password', 403));
      }

      if (user._id === currentUser._id.toString() && user.role !== currentUser.role) {
        return Promise.reject(createError('Can not change your own role', 403));
      }

      if (user.hasOwnProperty('role') && user.role !== userInTheDatabase.role && currentUser.role !== 'admin') {
        return Promise.reject(createError('Unauthorized', 403));
      }

      if (user.hasOwnProperty('password')) {
        user.password = encryptPassword(user.password);
      }

      return model.save(user);
    });
  },

  newUser(user, domain) {
    return Promise.all([
      model.get({username: user.username}),
      model.get({email: user.email})
    ])
    .then(([userNameMatch, emailMatch]) => {
      if (userNameMatch.length) {
        return Promise.reject(createError('Username already exists', 409));
      }

      if (emailMatch.length) {
        return Promise.reject(createError('Email already exists', 409));
      }

      user.password = encryptPassword(random());

      return model.save(user)
      .then((_user) => {
        this.recoverPassword(user.email, domain);
        return _user;
      });
    });
  },

  get(query, select) {
    return model.get(query, select);
  },

  getById(id) {
    return model.getById(id);
  },

  delete(_id, currentUser) {
    if (_id === currentUser._id.toString()) {
      return Promise.reject(createError('Can not delete yourself', 403));
    }

    return model.count()
    .then((count) => {
      if (count > 1) {
        return model.delete({_id});
      }

      return Promise.reject(createError('Can not delete last user', 403));
    });
  },

  recoverPassword(email, domain) {
    let key = SHA256(email + Date.now()).toString();
    return model.get({email})
    .then((results) => {
      const user = results[0];
      if (user) {
        return passwordRecoveriesModel.save({key, user: user._id})
        .then(() => {
          let mailOptions = {
            from: '"Uwazi" <no-reply@uwazi.io>',
            to: email,
            subject: 'Password set',
            text: `To set your password click on the following link:\n${domain}/setpassword/${key}`
          };
          return mailer.send(mailOptions);
        });
      }

      return 'userNotFound';
    });
  },

  resetPassword(credentials) {
    return passwordRecoveriesModel.get({key: credentials.key})
    .then((response) => {
      if (response.length) {
        return Promise.all([
          passwordRecoveriesModel.delete(response[0]._id),
          model.save({_id: response[0].user, password: encryptPassword(credentials.password)})
        ]);
      }
    });
  }
};
