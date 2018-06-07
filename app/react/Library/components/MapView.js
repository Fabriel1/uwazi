import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import Map from 'app/Map/Map';
import { bindActionCreators } from 'redux';
import { wrapDispatch } from 'app/Multireducer';
import { getAndSelectDocument, selectDocuments, unselectAllDocuments } from 'app/Library/actions/libraryActions';
import SearchBar from 'app/Library/components/SearchBar';
import { TemplateLabel } from 'app/Layout';
import { t } from 'app/I18N';

export class MapView extends Component {
  static renderInfo(marker) {
    return (
      <div>
        <TemplateLabel template={marker.properties.entity.template} />
        &nbsp;
        {marker.properties.entity.title}
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.clickOnMarker = this.clickOnMarker.bind(this);
    this.clickOnCluster = this.clickOnCluster.bind(this);
  }

  getMarker(entity) {
    const template = this.props.templates.find(_t => _t.get('_id') === entity.get('template'));
    const color = this.props.templates.indexOf(template);
    const geolocationProp = template.toJS().properties.find(p => p.type === 'geolocation');
    if (geolocationProp) {
      const _entity = entity.toJS();
      const marker = _entity.metadata[geolocationProp.name];
      return marker ? { properties: { entity: _entity, color }, latitude: marker.lat, longitude: marker.lon } : null;
    }

    return null;
  }

  getMarkers() {
    return this.props.markers.get('rows').map(entity => this.getMarker(entity)).toJS().filter(m => m);
  }

  clickOnMarker(marker) {
    this.props.getAndSelectDocument(marker.properties.entity.sharedId);
  }

  clickOnCluster(cluster) {
    this.props.unselectAllDocuments();
    this.props.selectDocuments(cluster.map(m => m.properties.entity));
  }

  render() {
    const markers = this.getMarkers();
    return (
      <div className="library-map main-wrapper" style={{ width: '100%', height: '100%' }}>
        <div className="search-list"><SearchBar storeKey={this.props.storeKey}/></div>
        <div className="documents-counter">
          <span><b>{this.props.markers.get('totalRows')}</b> {t('System', 'documents')}</span>
        </div>
        <Map
          markers={markers}
          zoom={1}
          clickOnMarker={this.clickOnMarker}
          clickOnCluster={this.clickOnCluster}
          renderPopupInfo={MapView.renderInfo}
          cluster
        />
      </div>
    );
  }
}

MapView.propTypes = {
  markers: PropTypes.instanceOf(Immutable.Map).isRequired,
  templates: PropTypes.instanceOf(Immutable.List).isRequired,
  storeKey: PropTypes.string.isRequired,
  getAndSelectDocument: PropTypes.func.isRequired,
  selectDocuments: PropTypes.func.isRequired,
  unselectAllDocuments: PropTypes.func.isRequired
};

export function mapStateToProps(state, props) {
  return {
    markers: state[props.storeKey].markers,
    templates: state.templates
  };
}

function mapDispatchToProps(dispatch, props) {
  return bindActionCreators({ getAndSelectDocument, selectDocuments, unselectAllDocuments }, wrapDispatch(dispatch, props.storeKey));
}

export default connect(mapStateToProps, mapDispatchToProps)(MapView);
