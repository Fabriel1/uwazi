import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { FormatMetadata } from 'app/Metadata';
import { get as prioritySortingCriteria } from 'app/utils/prioritySortingCriteria';

import { RowList, ItemFooter } from './Lists';
import DocumentLanguage from './DocumentLanguage';
import Icon from './Icon';
import TemplateLabel from './TemplateLabel';
import t from '../I18N/t';

class Item extends Component {
  getSearchSnipett(doc) {
    if (!doc.snippets || !doc.snippets.length) {
      return false;
    }

    const snippetElement = (<div
      onClick={this.props.onSnippetClick}
      className="item-snippet"
      dangerouslySetInnerHTML={{ __html: `${doc.snippets[0].text} ...` }}
    />);

    if (doc.snippets.length === 1) {
      return <div className="item-snippet-wrapper">{snippetElement}</div>;
    }

    return (
      <div className="item-snippet-wrapper">
        {snippetElement}
        <div>
          <a onClick={this.props.onSnippetClick}>{t('System', 'Show more')}</a>
        </div>
      </div>
    );
  }

  render() {
    const { onClick, onMouseEnter, onMouseLeave, active, additionalIcon,
           additionalText, buttons, evalPublished, additionalMetadata, search } = this.props;

    const doc = this.props.doc.toJS();
    const Snippet = additionalText ? <div className="item-snippet-wrapper"><div className="item-snippet">{additionalText}</div></div> : null;
    const itemClassName = `item-${doc.type === 'entity' ? 'entity' : 'document'} ${this.props.className || ''}`;
    const itemProps = { className: itemClassName, onClick, onMouseEnter, onMouseLeave, active, tabIndex: '1' };

    return (
      <RowList.Item {...itemProps}>
        {this.props.itemHeader}
        <div className="item-info">
          <div className="item-name">
            {evalPublished && !doc.published ? <i className="item-private-icon fa fa-lock" /> : false }
            {additionalIcon || ''}
            <Icon className="item-icon item-icon-center" data={doc.icon} />
            <span>{doc[this.props.titleProperty]}</span>
            <DocumentLanguage doc={this.props.doc} />
          </div>
          {Snippet}
          {this.getSearchSnipett(doc)}
        </div>
        <div className="item-metadata">
          <FormatMetadata
            entity={doc}
            sortedProperty={search.sort}
            additionalMetadata={additionalMetadata}
          />
        </div>
        <ItemFooter>
          {doc.template ? <TemplateLabel template={doc.template}/> : false}
          {this.props.labels}
          {buttons}
        </ItemFooter>
      </RowList.Item>
    );
  }
}

Item.defaultProps = {
  onClick: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  additionalMetadata: [],
  search: prioritySortingCriteria(),
  titleProperty: 'title'
};

Item.propTypes = {
  templates: PropTypes.object,
  thesauris: PropTypes.object,
  search: PropTypes.object,
  onClick: PropTypes.func,
  onSnippetClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  active: PropTypes.bool,
  additionalIcon: PropTypes.object,
  additionalText: PropTypes.string,
  additionalMetadata: PropTypes.arrayOf(PropTypes.object),
  doc: PropTypes.object,
  itemHeader: PropTypes.object,
  buttons: PropTypes.object,
  labels: PropTypes.object,
  className: PropTypes.string,
  titleProperty: PropTypes.string,
  evalPublished: PropTypes.bool
};

export const mapStateToProps = ({ templates, thesauris }, ownProps) => {
  const additionalMetadata = ownProps.additionalMetadata || [];

  if (ownProps.doc.get('type') === 'document') {
    const filename = ownProps.doc.getIn(['file', 'filename']);
    const thumbnail = `${filename.lastIndexOf('.') !== -1 ? filename.substring(0, filename.lastIndexOf('.')) : filename}.jpg`;
    additionalMetadata.push({ label: 'Preview', type: 'thumbnail', value: thumbnail, translateContext: 'System' });
  }

  const search = ownProps.searchParams;
  const _templates = ownProps.templates || templates;
  return { templates: _templates, thesauris, search, additionalMetadata };
};

export default connect(mapStateToProps)(Item);
