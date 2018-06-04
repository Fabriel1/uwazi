import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Map from '../reactMapGl';
import Map from 'app/Map/Map';
import Filters from './victimMapFilters';
import { fetchTemplateEntities } from './zorlakayAPI';

export class VictimsMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredVictims: null,
      victims: {
        aggregations: {
          all: {}
        },
        totalRows: 0,
        rows: []
      }
    };
    this.onFilter = this.onFilter.bind(this);
    this.renderMarker = this.renderMarker.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  onFilter(filteredVictims) {
    this.setState({
      filteredVictims
    });
  }

  getMarkers(victims) {
    if (!victims) {
      return [];
    }
    const clusters = {};

    victims.forEach((v) => {
      const clusterKey = v.metadata.location_geolocation.lon + '' + v.metadata.location_geolocation.lat;
      if (!clusters[clusterKey]) {
        clusters[clusterKey] = {
          latitude: v.metadata.location_geolocation.lat,
          longitude: v.metadata.location_geolocation.lon,
          size: 1
        };
        return;
      }

      clusters[clusterKey].size += 1;
    });

    return Object.keys(clusters).map((k) => clusters[k]);
  }

  getData() {
    const { idConfig } = this.props;
    fetchTemplateEntities(idConfig.get('templateVictim'), { limit: 300 })
    .then((victims) => {
      this.setState({ victims });
    });
  }

  markerClassName(marker) {
    if (marker.size > 20) {
      return 'map-marker-high';
    }

    if (marker.size > 10) {
      return 'map-marker-medium';
    }

    if (marker.size > 1) {
      return 'map-marker-low';
    }
  }

  renderMarker(marker, onClick) {
    return (
      <i
        className={`map-marker ${this.markerClassName(marker)}`}
        onClick={onClick}
      />
    );
  }

  render() {
    const victims = this.state.victims.rows;
    const filteredVictims = this.state.filteredVictims || victims;
    const markers = this.getMarkers(filteredVictims);
    return (
      <div className='zorlakay-map'>
        <Map
          mapboxToken={this.props.mapboxToken}
          markers={markers}
          height={550}
          {...this.props}
          renderMarker={this.renderMarker}
        />
        <Filters victims={victims}
          onFilter={this.onFilter}
        />
      </div>
    );
  }
}

VictimsMap.propTypes = {
  idConfig: PropTypes.object,
  thesauris: PropTypes.object,
  mapboxToken: PropTypes.string,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  zoom: PropTypes.number
};

const mapStateToProps = ({settings, thesauris}) => ({
  idConfig: settings.collection.get('custom').get('zorlakayIds'),
  thesauris
});

export default connect(mapStateToProps)(VictimsMap);
