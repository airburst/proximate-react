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
        console.log('Container locations', this.props.locations)            //
        let markers = this.props.locations.map((l) => {
            return (
                <Marker
                    key = {l.key}
                    onClick={this.onMarkerClick.bind(this) }
                    name={l.name}
                    position={l.position} />
            )
        });
        if (!this.props.loaded) {
            return <div>Loading...</div>
        }
        return (
            <div id="map-container" ref="container">
                <Map google={this.props.google}>
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
