import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Container from './map/Container';
import Toolbar from './Toolbar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {

    render() {
        injectTapEventPlugin();

        return (
            <MuiThemeProvider>
                <div role="main" id="main">
                    <Container />
                    <Toolbar />
                </div>
             </MuiThemeProvider>
        )
    }

}

export default App;