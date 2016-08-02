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
        if (!this.props.loaded) {
            return <div>Loading...</div>
        }
        return (
            <Map google={this.props.google}>
                <Marker
                    onClick={this.onMarkerClick.bind(this) }
                    name={'Home'}
                    position={{ lat: 51.417163, lng: -2.210025 }} />

                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onInfoWindowClose}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map>
        )
    }

};

export default GoogleApiComponent({
    apiKey: 'AIzaSyDGe_FmSZBr74_Eo9rbe-Ld9r264Ay47hE',
    libraries: ['geometry']
})(Container);
