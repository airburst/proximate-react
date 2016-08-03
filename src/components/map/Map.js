import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom'
import Marker from './Marker';

export class Map extends React.Component {

    constructor(props) {
        super(props);
        const {lat, lng} = this.props.initialCenter;
        this.state = {
            currentLocation: {
                lat: lat,
                lng: lng
            }
        }
    }

    static propTypes = {
        google: React.PropTypes.object,
        zoom: React.PropTypes.number,
        coords: React.PropTypes.array,
        initialCenter: React.PropTypes.object
    }

    static defaultProps = {
        zoom: 15,
        coords: [],
        initialCenter: {
            lat: 51.417163327836576,
            lng: -2.210025647776225
        },
        centerAroundCurrentLocation: true
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
        // React to changes in contacts' locations
        // if (prevState.coords !== this.state.coords) {
        //     this.loadMap();
        // }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextProps.coords !== this.props.coords;
    // }

    recenterMap(position) {
        const map = this.map;
        //const curr = this.state.currentLocation;
        const google = this.props.google;
        const maps = google.maps;
        if (map) {
            let center = new maps.LatLng(position.lat, position.lng)
            map.panTo(center)
        }
    }

    componentDidMount() {
        if (this.props.centerAroundCurrentLocation) {
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((pos) => {
                    const coords = pos.coords;
                    this.setState({
                        currentLocation: {
                            lat: coords.latitude,
                            lng: coords.longitude
                        }
                    })
                })
            }
        }
        this.loadMap();
    }

    loadMap() {
        console.log('Reloading map')
        if (this.props && this.props.google) {
            const {google} = this.props;
            const maps = google.maps;
            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);

            let {initialCenter, zoom} = this.props;
            const {lat, lng} = this.state.currentLocation;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = Object.assign({}, {
                center: center,
                zoom: zoom,
                zoomControlOptions: {
                    position: maps.ControlPosition.RIGHT_TOP
                }
            })
            this.map = new maps.Map(node, mapConfig);

            this.scaleMap();
        }
    }

    scaleMap() {
        const bounds = new this.props.google.maps.LatLngBounds();
        this.props.coords.forEach((c) => { this.scaleToFitNewMarker(bounds, c); });
    }

    scaleToFitNewMarker(bounds, marker) {
        const maps = this.props.google.maps;
        bounds.extend(new maps.LatLng(marker.lat, marker.lng));
        // Don't zoom too close if only one marker
        if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
            var extendPoint1 = new maps.LatLng(bounds.getNorthEast().lat() + 0.005, bounds.getNorthEast().lng() + 0.005);
            var extendPoint2 = new maps.LatLng(bounds.getNorthEast().lat() - 0.005, bounds.getNorthEast().lng() - 0.005);
            bounds.extend(extendPoint1);
            bounds.extend(extendPoint2);
        }
        this.map.fitBounds(bounds);
    }

    render() {
        return (
            <div ref='map' id="map">
                Loading map...
                {this.renderChildren() }
            </div>
        );
    }

    renderChildren() {
        const {children} = this.props;
        if (!children) return;

        return React.Children.map(children, c => {
            return React.cloneElement(c, {
                map: this.map,
                google: this.props.google,
                mapCenter: this.state.currentLocation
            });
        })
    }

};

export default Map;