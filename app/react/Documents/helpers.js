import moment from 'moment';

export default {
  prepareMetadata(doc, templates, thesauris) {
    let template = templates.find(t => t._id === doc.template);

    if (!template || !thesauris.length) {
      return Object.assign({}, doc, {metadata: [], documentType: ''});
    }

    let metadata = template.properties.map((property) => {
      let value = doc.metadata[property.name];
      if (property.type === 'select' && value) {
        let thesauri = thesauris.find(t => t._id === property.content).values.find(v => {
          return v.id.toString() === value.toString();
        });

        value = '';
        if (thesauri) {
          value = thesauri.label;
        }
      }

      if (property.type === 'date' && value) {
        value = moment(value, 'X').format('MMM DD, YYYY');
      }

      return {label: property.label, value};
    });

    return Object.assign({}, doc, {metadata: metadata, documentType: template.name});
  }
};
