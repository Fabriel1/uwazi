import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactMapGL, {NavigationControl, Marker, Popup} from 'react-map-gl';

function getWidth() {
  return 400;
}

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: getWidth(),
        height: 400
      },
      popupInfo: null,
      customMarkers: [
        {latitude: -1.28315, longitude: 36.81797, label: 'Marker A', value: 8}
      ]
    };
  }

  renderPopup() {
    const {popupInfo} = this.state;

    return this.state.popupInfo &&
      <Popup tipSize={6}
        anchor="top"
        longitude={popupInfo.longitude}
        latitude={popupInfo.latitude}
        onClose={() => this.setState({popupInfo: null})} >
        <div>
          This is an Uwazi popup for {popupInfo.label}.<br />
          There were {popupInfo.value} casualties in this area.
        </div>
      </Popup>
    ;
  }

  onViewportChange(viewport) {
    this.setState({viewport});
  }

  componentWillMount() {
    window.onresize = () => {
      const viewport = Object.assign({}, this.state.viewport);
      viewport.width = getWidth();
      this.setState({viewport});
    };
    const defaultViewport = {
      width: getWidth(),
      height: 400,
      latitude: 35,
      longitude: 39,
      zoom: 8,
      //maxBounds: [
        //[22, 30], // Southwest coordinates
        //[48, 46]  // Northeast coordinates
      //]
    };

    const { latitude, longitude, zoom } = this.props;
    const viewport = Object.assign({}, defaultViewport, { latitude, longitude, zoom});
    this.setState({ viewport });
  }

  componentWillUnmount() {
    window.onresize = null;
  }

  render() {
    const viewport = Object.assign({}, this.state.viewport);
    const markers = this.props.markers || this.state.customMarkers;
    return (
      <div style={{marginBottom: '15px'}}>
        <ReactMapGL
          {...viewport}
          dragRotate={true}
          onViewportChange={this.onViewportChange.bind(this)}
          mapStyle="mapbox://styles/mapbox/bright-v9"
          mapboxApiAccessToken={this.props.mapboxToken}
        >
          <div style={{position: 'absolute', right: 5, top: 5}}>
            <NavigationControl onViewportChange={this.onViewportChange.bind(this)} />
          </div>
          {markers.map((marker, index) =>
            <Marker {...marker} key={index} offsetLeft={-16.71} offsetTop={-24}>
              <i style={{fontSize: '26px', color: '#00f', opacity: 0.6, cursor: 'pointer'}}
                 className="fa fa-map-marker fa-fw"
                 onClick={() => this.setState({popupInfo: marker})}></i>
            </Marker>
          )}
          {this.renderPopup()}
        </ReactMapGL>
      </div>
    );
  }
}

export default connect()(Map);
