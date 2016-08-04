import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import GeolocationService from '../geolocation';
import {timeStamp} from '../utils';
import Container from './map/Container';
import Toolbar from './Toolbar';
import ContactsList from './ContactsList';
import NewUserDialog from './NewUserDialog';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// class App extends Component {
const App = React.createClass({

    propTypes: {
        locationId: React.PropTypes.string,
        geo: React.PropTypes.object,
        newUser: React.PropTypes.bool
    },

    getDefaultProps() {
        let l = window.localStorage.getItem('proximateLocationId');
        return {
            locationId: l,
            newUser: (l === null) ? true : false,
            geo: new GeolocationService()
        };
    },

    getInitialState: function () {
        return {
            firebaseRef: {},
            contacts: [],
            me: {},
            locationId: this.props.locationId
        };
    },

    // Get stream of locations from Firebase and filter for my contacts
    componentWillMount: function () {
        this.getDataFromFirebase();
        this.getGeoPosition(this.state.locationId);
    },

    getGeoPosition: function (locationId) {
        this.props.geo.getLocation()
            .then((position) => {
                this.setLocation({ lat: position.latitude, lng: position.longitude }, locationId);
            })
            .catch((error) => { console.log('Geo error', error); });
    },

    getDataFromFirebase: function () {
        this.firebaseRef = firebase.database().ref('locations');
        this.firebaseRef.on('value', function (snapshot) {
            let locations = [], me = {};
            snapshot.forEach(function (l) {
                let location = l.val();
                location['key'] = l.key;
                if (this.isMyLocationId(location)) { me = location; }
                if (this.isLinkedToMyLocationId(location)) {        // && this.hasUpdatedInLastDay(l);
                    locations.push(location);
                }
            }.bind(this));
            this.setState({
                contacts: locations,
                me: me
            });
        }.bind(this));
    },

    containsMyLocationId(location) {
        return (this.isMyLocationId(location) || this.isLinkedToMyLocationId(location)) ? true : false;
    },

    isMyLocationId(location) {
        return (location.key === this.state.locationId) ? true : false;
    },

    isLinkedToMyLocationId(location) {
        return location.contacts && (location.contacts.indexOf(this.state.locationId) > -1) ? true : false;
    },

    hasUpdatedInLastDay(location) {
        return (moment().diff(moment(location.updated), 'days') === 0);
    },

    setLocation(position, locationId) {
        if (locationId !== null) {
            this.updateLocation(locationId, { position: position, updated: timeStamp });
        } else {
            let newLocation = { name: 'Me', position: position, color: 'blue', updated: timeStamp };
            let id = this.addLocation(newLocation);
            this.setLocationId(id);
        }
    },

    addLocation: function (location) {
        var newLocation = this.firebaseRef.push(location);
        return newLocation.key;
    },

    updateLocation: function (key, changes) {
        this.firebaseRef.child(key).update(changes);
    },

    removelocation: function (key) {
        this.firebaseRef.child(key).remove();
    },

    setLocationId(id) {
        this.setState({ locationId: id });
        window.localStorage.setItem('proximateLocationId', id);
    },

    componentWillUnmount: function () {
        this.firebaseRef.off();
    },

    updateNewUserDetails(details) {
        this.updateLocation(this.state.locationId, Object.assign(details, { updated: timeStamp }));
    },

    render: function () {
        return (
            <MuiThemeProvider>
                <div role="main" id="main">
                    <Container contacts={this.state.contacts} me={this.state.me}/>
                    <ContactsList contacts={this.state.contacts} me={this.state.me}/>
                    <Toolbar />
                    <NewUserDialog 
                        show={this.props.newUser}
                        onSave={this.updateNewUserDetails} />
                </div>
            </MuiThemeProvider>
        )
    }

});

export default App;
