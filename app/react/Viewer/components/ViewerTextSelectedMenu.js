import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToToc} from '../actions/documentActions';

import {actions as connectionsActions} from 'app/Connections';
import {openPanel} from 'app/Viewer/actions/uiActions';
import ShowIf from 'app/App/ShowIf';
import {AddEvidenceButton} from 'app/evidences';

export class ViewerTextSelectedMenu extends Component {
  showPanel(type) {
    this.props.openPanel('viewMetadataPanel');
    this.props.startNewConnection(type, this.props.doc.get('sharedId'));
  }

  render() {
    return (
      <div className={this.props.active ? 'active' : ''}>
        <ShowIf if={this.props.hasRelationTypes}>
          <div className="btn btn-primary"
               onClick={this.showPanel.bind(this, 'targetRanged')}>
            <span className="ContextMenu-tooltip">Connect to a paragraph</span>
            <i className="fa fa-paragraph"></i>
          </div>
        </ShowIf>
        <ShowIf if={this.props.hasRelationTypes}>
          <div className="btn btn-primary"
               onClick={this.showPanel.bind(this, 'ranged')} >
            <span className="ContextMenu-tooltip">Connect to a document</span>
            <i className="fa fa-file-o"></i>
          </div>
        </ShowIf>
        <div className="btn btn-primary"
             onClick={this.props.addToToc.bind(null, this.props.reference.toJS())}>
          <span className="ContextMenu-tooltip">Add to table of contents</span>
          <i className="fa fa-font"></i>
        </div>
        <AddEvidenceButton className="btn btn-primary" evidence={this.props.reference.toJS().sourceRange}>
          <span className="ContextMenu-tooltip">Add as evidence</span>
          <i className="fa fa-search"></i>
        </AddEvidenceButton>
      </div>
    );
  }
}

ViewerTextSelectedMenu.propTypes = {
  doc: PropTypes.object,
  reference: PropTypes.object,
  startNewConnection: PropTypes.func,
  openPanel: PropTypes.func,
  addToToc: PropTypes.func,
  active: PropTypes.bool,
  hasRelationTypes: PropTypes.bool
};

function mapStateToProps({documentViewer, relationTypes}) {
  return {
    doc: documentViewer.doc,
    reference: documentViewer.uiState.get('reference'),
    hasRelationTypes: !!relationTypes.size
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    startNewConnection: connectionsActions.startNewConnection,
    openPanel,
    addToToc
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewerTextSelectedMenu);
