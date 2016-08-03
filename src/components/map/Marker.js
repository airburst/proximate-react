import React, { PropTypes as T, Component } from 'react'
import { camelize } from './lib/String'
const evtNames = ['click', 'mouseover', 'recenter'];

const wrappedPromise = function () {
    var wrappedPromise = {},
        promise = new Promise(function (resolve, reject) {
            wrappedPromise.resolve = resolve;
            wrappedPromise.reject = reject;
        });
    wrappedPromise.then = promise.then.bind(promise);
    wrappedPromise.catch = promise.catch.bind(promise);
    wrappedPromise.promise = promise;

    return wrappedPromise;
}

export class Marker extends Component {

    componentDidMount() {
        this.markerPromise = wrappedPromise();
        this.renderMarker();
    }

    componentDidUpdate(prevProps) {
        if ((this.props.map !== prevProps.map) ||
            (this.props.position !== prevProps.position)) {
            this.renderMarker();
        }
    }

    componentWillUnmount() {
        if (this.marker) {
            this.marker.setMap(null);
        }
    }

    renderMarker() {
        let { map, google, position, mapCenter } = this.props;
        if (!google) { return null }

        let pos = position || mapCenter;
        if (!(pos instanceof google.maps.LatLng)) {
            position = new google.maps.LatLng(pos.lat, pos.lng);
        }
        const markerStyle = {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: 'white',
            fillOpacity: 0.8,
            scale: 15,
            strokeColor: 'blue',
            strokeWeight: 2
        };

        const pref = {
            map: map,
            icon: markerStyle,
            position: position,
            title: this.props.name,
            label: this.props.name
        };
        this.marker = new google.maps.Marker(pref);

        evtNames.forEach(e => {
            this.marker.addListener(e, this.handleEvent(e));
        });

        this.markerPromise.resolve(this.marker);
    }

    getMarker() {
        return this.markerPromise;
    }

    handleEvent(evt) {
        return (e) => {
            const evtName = `on${camelize(evt)}`
            if (this.props[evtName]) {
                this.props[evtName](this.props, this.marker, e);
            }
        }
    }

    render() {
        return null;
    }
}

Marker.propTypes = {
    position: T.object,
    map: T.object
}

evtNames.forEach(e => Marker.propTypes[e] = T.func)

Marker.defaultProps = {
    name: 'Marker'
}

export default Marker

// private scaleToFitNewMarker(marker: any) {
//     this.bounds.extend(marker.getPosition());
//     // Don't zoom too close if only one marker
//     if (this.bounds.getNorthEast().equals(this.bounds.getSouthWest())) {
//         var extendPoint1 = new window.google.maps.LatLng(this.bounds.getNorthEast().lat() + 0.005, this.bounds.getNorthEast().lng() + 0.005);
//         var extendPoint2 = new window.google.maps.LatLng(this.bounds.getNorthEast().lat() - 0.005, this.bounds.getNorthEast().lng() - 0.005);
//         this.bounds.extend(extendPoint1);
//         this.bounds.extend(extendPoint2);
//     }
//     this.map.fitBounds(this.bounds);
// }

// private removeAllMarkers() {
//     this.markers.forEach((m) => { m.setMap(null); });
//     this.markers.clear();
//     this.resetBounds();
// }

// private centreMe($event) {
//     this.map.panTo(this.settings.myLocation.position);
// }

// private scaleToFit() {
//     this.resetBounds();
//     this.markers.forEach((m) => { this.scaleToFitNewMarker(m); });
// }