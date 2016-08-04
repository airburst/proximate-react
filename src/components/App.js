import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import GeolocationService from '../geolocation';
import Container from './map/Container';
import Toolbar from './Toolbar';
import ContactsList from './ContactsList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// class App extends Component {
const App = React.createClass({

    propTypes: {
        locationId: React.PropTypes.string,
        geo: React.PropTypes.object
    },

    getDefaultProps() {
        return {
            locationId: window.localStorage.getItem('proximateLocationId'),
            geo: new GeolocationService()
        };
    },

    getInitialState: function () {
        return {
            firebaseRef: {},
            contacts: [],
            me: {}
        };
    },

    // Get stream of locations from Firebase and filter for my contacts
    componentWillMount: function () {
        this.getDataFromFirebase();
        this.getGeoPosition(this.props.locationId);
    },

    setLocationId(id) {
        window.localStorage.setItem('proximateLocationId', id);
    },

    getGeoPosition: function (locationId) {
        this.props.geo.getLocation()
            .then((position) => { 
                /*this.setLocation(position, locationId);*/ 
                console.log(locationId, position)                       //
                // 
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

    // testForNewUser(location) {
    //   if ((location.$key === this.locationId) && (location.name === 'Me')) { this.newUser = true; }
    // }

    containsMyLocationId(location) {
        return (this.isMyLocationId(location) || this.isLinkedToMyLocationId(location)) ? true : false;
    },

    isMyLocationId(location) {
        return (location.key === this.props.locationId) ? true : false;
    },

    isLinkedToMyLocationId(location) {
        return location.contacts && (location.contacts.indexOf(this.props.locationId) > -1) ? true : false;
    },

    hasUpdatedInLastDay(location) {
        return (moment().diff(moment(location.updated), 'days') === 0);
    },

    componentWillUnmount: function () {
        this.firebaseRef.off();
    },

    removelocation: function (key) {
        this.firebaseRef.child(key).remove();
    },

    // handleSubmit: function(e) {
    //     e.preventDefault();
    //     if (this.state.text && this.state.text.trim().length !== 0) {
    //         this.firebaseRef.push({
    //             text: this.state.text
    //         });
    //         this.setState({
    //             text: ''
    //         });
    //     }
    // },

    // Pass contacts collection to Container as a prop

    render: function () {
        console.log('Rendering App...')                             //
        return (
            <MuiThemeProvider>
                <div role="main" id="main">
                    <Container contacts={this.state.contacts} me={this.state.me}/>
                    <ContactsList contacts={this.state.contacts} me={this.state.me}/>
                    <Toolbar />
                </div>
            </MuiThemeProvider>
        )
    }

});

export default App;
