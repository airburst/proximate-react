import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Container from './map/Container';
import Toolbar from './Toolbar';
import ContactsList from './ContactsList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {

    // Get locationId from localstorage

    // Get stream of locations from Firebase and filter for my contacts

    // Pass contacts collection to Container as a prop

    // Need actions to update Firebase

    render() {
        injectTapEventPlugin();

        return (
            <MuiThemeProvider>
                <div role="main" id="main">
                    <Container />
                    <ContactsList />
                    <Toolbar />
                </div>
             </MuiThemeProvider>
        )
    }

}

export default App;