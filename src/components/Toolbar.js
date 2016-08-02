import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom'
import RaisedButton from 'material-ui/RaisedButton';

class Toolbar extends Component {

    render() {
        return (
            <div role="footer" id="toolbar">
                <RaisedButton label="Default" />
            </div>
        )
    }

}

export default Toolbar;