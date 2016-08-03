import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import ReactFireMixin from 'reactfire';
import moment from 'moment';
import Container from './map/Container';
import Toolbar from './Toolbar';
import ContactsList from './ContactsList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// class App extends Component {
const App = React.createClass({
    mixins: [ReactFireMixin],

    getInitialState: function () {
        return {
            firebaseRef: {},
            contacts: [],
            me: {}
        };
    },

    // Get stream of locations from Firebase and filter for my contacts
    componentWillMount: function () {
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

//  getLocationByKey(key: string): Promise<any> {
//     let loc[] = [];
//     return new Promise((resolve: any, reject: any) => {
//       this.locations$.subscribe((l) => {
//         let item = l[l.length - 1];
//         if ((item !== undefined) && (item.$key === key)) { resolve(item); }
//       }, reject);
//     });
//   }