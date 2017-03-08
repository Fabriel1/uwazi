import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Form} from 'react-redux-form';
import {t} from 'app/I18N';
import {unselectAllDocuments, multipleUpdate} from 'app/Library/actions/libraryActions';
import {deleteEntities} from 'app/Entities/actions/actions';
import {MetadataFormFields} from 'app/Metadata';
import ShowIf from 'app/App/ShowIf';
import {comonProperties} from 'app/Metadata/helpers/comonProperties';
import {actions as metadataActions} from 'app/Metadata';
import validator from 'app/Metadata/helpers/validator';
import {FormGroup, IconSelector} from 'app/ReactReduxForms';

import {TemplateLabel, SidePanel} from 'app/Layout';

export class SelectMultiplePanel extends Component {

  close() {
    let message = t('System', 'This action will unselect all the entities.');
    if (this.props.editing) {
      message = t('System', 'Discard changes');
    }
    this.context.confirm({
      accept: () => {
        this.props.unselectAllDocuments();
        this.props.resetForm('library.sidepanel.multipleEdit');
      },
      title: t('System', 'Confirm'),
      message
    });
  }

  delete() {
    this.context.confirm({
      accept: () => {
        this.props.deleteEntities(this.props.entitiesSelected.toJS());
      },
      title: t('System', 'Confirm'),
      message: t('System', 'Confirm delete multiple items')
    });
  }

  metadataFieldModified(key) {
    return !this.props.formState.metadata[key].pristine &&
    (!this.props.formState.metadata[key].$form || !this.props.formState.metadata[key].$form.pristine);
  }

  save(formValues) {
    let modifiedValues = {metadata: {}};
    Object.keys(formValues.metadata).forEach((key) => {
      if (this.metadataFieldModified(key)) {
        modifiedValues.metadata[key] = formValues.metadata[key];
      }
    });

    if (this.props.formState.icon && !this.props.formState.icon.pristine) {
      modifiedValues.icon = formValues.icon;
    }

    this.props.multipleUpdate(this.props.entitiesSelected, modifiedValues)
    .then(() => {
      this.props.unselectAllDocuments();
      this.props.resetForm('library.sidepanel.multipleEdit');
    });
  }

  cancel() {
    this.context.confirm({
      accept: () => {
        this.props.resetForm('library.sidepanel.multipleEdit');
      },
      title: t('System', 'Confirm'),
      message: t('System', 'Discard changes')
    });
  }

  edit() {
    this.props.loadForm('library.sidepanel.multipleEdit', this.comonTemplate());
  }

  comonTemplate() {
    const comonTypes = this.props.entitiesSelected.map((entity) => entity.get('template'))
    .filter((type, index, _types) => _types.indexOf(type) === index);
    const properties = comonProperties(this.props.templates.toJS(), comonTypes);
    return {_id: comonTypes.get(0), properties};
  }

  validation(template) {
    let validation = validator.generate(template);
    delete validation.title;
    Object.keys(this.props.state.metadata || {}).forEach((key) => {
      if (!this.metadataFieldModified(key)) {
        delete validation[`metadata.${key}`];
      }
    });

    return validation;
  }

  render() {
    const {entitiesSelected, open, editing} = this.props;
    const template = this.comonTemplate();
    const validation = this.validation(template);

    return (
      <SidePanel open={open} className="metadata-sidepanel">
        <div className="sidepanel-header">
          <i className="fa fa-check-square"></i> <span>{entitiesSelected.size} {t('System', 'selected')}</span>
          <i className="closeSidepanel fa fa-close close-modal" onClick={this.close.bind(this)}/>&nbsp;
        </div>
        <div className="sidepanel-body">
          <ShowIf if={!editing}>
            <ul className="entities-list">
              {entitiesSelected.map((entity, index) => {
                return <li key={index}>
                  <TemplateLabel template={entity.get('template')}/> <span className="entity-title">{entity.get('title')}</span>
                </li>;
              })}
            </ul>
          </ShowIf>
          <ShowIf if={editing}>
            <Form id='multiEdit' model='library.sidepanel.multipleEdit' onSubmit={this.save.bind(this)} validators={validation}>
              <FormGroup>
                <div className="alert alert-warning">
                  <i className="fa fa-warning"></i>
                  Be careful, you are editing multiple files!
                  We will update all the properties marked with <i className="fa fa-warning"></i> with the new values.
                </div>
                <ul className="search__filter">
                  <li>
                    <ShowIf if={this.props.formState.icon && !this.props.formState.icon.pristine}>
                      <span><i className="fa fa-warning"></i>&nbsp;</span>
                    </ShowIf>
                    <label>{t('System', 'Icon')} / {t('System', 'Flag')}</label>
                  </li>
                  <li className="wide">
                    <IconSelector model={'.icon'}/>
                  </li>
                </ul>
              </FormGroup>
              <MetadataFormFields
                template={template}
                thesauris={this.props.thesauris.toJS()}
                state={this.props.formState}
                multipleEdition={true}
              />
            </Form>
          </ShowIf>
        </div>
        <div className="sidepanel-footer">
          <ShowIf if={!editing}>
            <button onClick={this.edit.bind(this)} className="edit btn btn-primary">
              <i className="fa fa-pencil"></i>
              <span className="btn-label">{t('System', 'Edit')}</span>
            </button>
          </ShowIf>
          <ShowIf if={!editing}>
            <button className="delete btn btn-danger" onClick={this.delete.bind(this)}>
              <i className="fa fa-trash"></i>
              <span className="btn-label">{t('System', 'Delete')}</span>
            </button>
          </ShowIf>
          <ShowIf if={editing}>
            <button type="submit" form='multiEdit' className="btn btn-success">
              <i className="fa fa-save"></i>
              <span className="btn-label">{t('System', 'Save')}</span>
            </button>
          </ShowIf>
          <ShowIf if={editing}>
            <button
              onClick={this.cancel.bind(this)}
              className="cancel-edit-metadata btn btn-primary">
              <i className="fa fa-close"></i>
              <span className="btn-label">{t('System', 'Cancel')}</span>
            </button>
          </ShowIf>
        </div>
      </SidePanel>
    );
  }
}

SelectMultiplePanel.propTypes = {
  entitiesSelected: PropTypes.object,
  open: PropTypes.bool,
  editing: PropTypes.bool,
  unselectAllDocuments: PropTypes.func,
  loadForm: PropTypes.func,
  resetForm: PropTypes.func,
  deleteEntities: PropTypes.func,
  multipleUpdate: PropTypes.func,
  templates: PropTypes.object,
  thesauris: PropTypes.object,
  formState: PropTypes.object,
  state: PropTypes.object
};

SelectMultiplePanel.contextTypes = {
  confirm: PropTypes.func
};

const mapStateToProps = (state) => {
  const library = state.library;
  return {
    open: library.ui.get('selectedDocuments').size > 1,
    entitiesSelected: library.ui.get('selectedDocuments'),
    editing: Object.keys(library.sidepanel.multipleEdit).length > 0,
    templates: state.templates,
    thesauris: state.thesauris,
    state: library.sidepanel.multipleEdit,
    formState: library.sidepanel.multipleEditForm
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    unselectAllDocuments,
    deleteEntities,
    loadForm: metadataActions.loadTemplate,
    resetForm: metadataActions.resetReduxForm,
    multipleUpdate
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectMultiplePanel);
