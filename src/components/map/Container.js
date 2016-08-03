import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom'
import GoogleApi from './lib/GoogleApi';
import GoogleApiComponent from './GoogleApiComponent';
import Map from './Map';
import Marker from './Marker';
import InfoWindow from './InfoWindow';

export class Container extends React.Component {

    componentDidMount() {
        this.setState({
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {}
        });
    }

    onMarkerClick(props, marker, e) {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    render() {
        let locations = [...this.props.contacts, this.props.me];
        if ((!this.props.loaded) || ((locations.length === 1) && locations[0].key === undefined)) {
            return <div>Loading...</div>
        }
        let markers = locations.map((l) => {
            return (
                <Marker
                    key = {l.key}
                    onClick={this.onMarkerClick.bind(this) }
                    name={l.name}
                    position={l.position}
                    color={l.color} />
            )
        });
        let coords = locations.map((l) => { return l.position; });
        return (
            <div id="map-container" ref="container">
                <Map google={this.props.google} coords={coords}>
                    {markers}
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        onClose={this.onInfoWindowClose}>
                        <div><h2>{this.state.selectedPlace.name}</h2></div>
                    </InfoWindow>
                </Map>
            </div>
        )
    }

};

export default GoogleApiComponent({
    apiKey: 'AIzaSyDGe_FmSZBr74_Eo9rbe-Ld9r264Ay47hE',
    libraries: ['geometry']
})(Container);
