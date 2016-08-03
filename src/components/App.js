import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import ReactFireMixin from 'reactfire';
import Container from './map/Container';
import Toolbar from './Toolbar';
import ContactsList from './ContactsList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// class App extends Component {
const App = React.createClass({
    mixins: [ReactFireMixin],

    getInitialState: () => {
        return {
            firebaseRef: {},
            locations: []
        };
    },

    // Get locationId from localstorage

    // Get stream of locations from Firebase and filter for my contacts
    componentWillMount: function () {
        this.firebaseRef = firebase.database().ref('locations');
        this.firebaseRef.on('value', function (snapshot) {
            let locations = [];
            snapshot.forEach(function (childSnapshot) {
                let location = childSnapshot.val();
                location['.key'] = childSnapshot.key;
                locations.push(location);
            }.bind(this));

            this.setState({
                locations: locations
            });
        }.bind(this));
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
                    <Container locations={this.state.locations}/>
                    <ContactsList />
                    <Toolbar />
                </div>
            </MuiThemeProvider>
        )
    }

});

export default App;