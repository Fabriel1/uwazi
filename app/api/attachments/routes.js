import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import multer from 'multer';
import sanitize from 'sanitize-filename';

import ID from 'shared/uniqueID';
import entities from 'api/entities';
import needsAuthorization from '../auth/authMiddleware';

import paths from '../config/paths';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, paths.attachmentsPath);
  },
  filename(req, file, cb) {
    cb(null, Date.now() + ID() + path.extname(file.originalname));
  }
});

const assignAttachment = (entity, addedFile) => {
  const conformedEntity = { _id: entity._id, attachments: entity.attachments || [] };
  conformedEntity.attachments.push(addedFile);
  return conformedEntity;
};

const processSingleLanguage = (entity, req) => {
  const addedFile = req.files[0];
  addedFile._id = mongoose.Types.ObjectId();
  return Promise.all([addedFile, entities.saveMultiple([assignAttachment(entity, addedFile)])]);
};

const processAllLanguages = (entity, req) => processSingleLanguage(entity, req)
.then(([addedFile]) => Promise.all([addedFile, entities.get({ sharedId: entity.sharedId, _id: { $ne: entity._id } })]))
.then(([addedFile, siblings]) => {
  const genericAddedFile = Object.assign({}, addedFile);
  delete genericAddedFile._id;

  const additionalLanguageUpdates = [];

  siblings.forEach((sibling) => {
    additionalLanguageUpdates.push(entities.saveMultiple([assignAttachment(sibling, genericAddedFile)]));
  });

  return Promise.all([addedFile].concat(additionalLanguageUpdates));
});

export default (app) => {
  const upload = multer({ storage });

  app.get('/api/attachment/:file', (req, res) => {
    const filePath = `${path.resolve(paths.attachmentsPath)}/${path.basename(req.params.file)}`;
    fs.stat(filePath, (err) => {
      if (err) {
        return res.redirect('/public/no_preview.jpg');
      }
      return res.sendFile(filePath);
    });
  });

  app.get('/api/attachments/download', (req, res) => {
    entities.getById(req.query._id)
    .then((response) => {
      const file = response.attachments.find(a => a.filename === req.query.file);
      const newName = path.basename(file.originalname, path.extname(file.originalname)) + path.extname(file.filename);
      res.download(paths.attachmentsPath + file.filename, sanitize(newName));
    })
    .catch(error => res.json({ error }, 500));
  });

  app.post('/api/attachments/upload', needsAuthorization(['admin', 'editor']), upload.any(), (req, res) => entities.getById(req.body.entityId)
  .then(entity => req.body.allLanguages === 'true' ? processAllLanguages(entity, req) :
    processSingleLanguage(entity, req))
  .then(([addedFile]) => {
    res.json(addedFile);
  })
  .catch(error => res.json({ error }), 500));

  app.post('/api/attachments/rename', needsAuthorization(['admin', 'editor']), (req, res) => {
    let renamedAttachment;
    return entities.getById(req.body.entityId)
    .then((entity) => {
      if (entity._id.toString() === req.body._id) {
        entity.file.originalname = req.body.originalname;
        entity.file.language = req.body.language;
        renamedAttachment = Object.assign({ _id: entity._id.toString() }, entity.file);
      } else {
        entity.attachments = (entity.attachments || []).map((attachment) => {
          if (attachment._id.toString() === req.body._id) {
            attachment.originalname = req.body.originalname;
            renamedAttachment = attachment;
          }

          return attachment;
        });
      }

      return entities.saveMultiple([entity]);
    })
    .then(() => {
      res.json(renamedAttachment);
    })
    .catch(error => res.json({ error }, 500));
  });

  app.delete('/api/attachments/delete', needsAuthorization(['admin', 'editor']), (req, res) => entities.getById(req.query.entityId)
  .then((entity) => {
    entity.attachments = (entity.attachments || []).filter(a => a.filename !== req.query.filename);
    return Promise.all([entities.saveMultiple([entity]), entities.get({ sharedId: entity.sharedId, _id: { $ne: entity._id } }, { attachments: 1 })]);
  })
  .then(([response, siblings]) => {
    const shouldUnlink = siblings.reduce((memo, sibling) => {
      if (sibling.attachments && sibling.attachments.find(a => a.filename === req.query.filename)) {
        return false;
      }
      return memo;
    }, true);

    return !shouldUnlink ? res.json(response[0]) : new Promise((resolve, reject) => {
      fs.unlink(paths.attachmentsPath + req.query.filename, (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res.json(response[0]));
      });
    });
  })
  .catch((error) => {
    res.json({ error });
  }));
};
