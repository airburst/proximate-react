import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

/**
 * Dialogs can be nested. This example opens a Date Picker from within a Dialog.
 */
export default class NewUserDialog extends React.Component {
    state = {
        open: false,
        name: '',
        color: ''
    };

    componentDidMount() {
        if (this.props.show) {
            this.setState({ open: this.props.show });
        }
    };

    handleClose = () => {
        this.props.onSave({ name: this.state.name, color: this.state.color })
        this.setState({ open: false });
    };

    handleNameChange = (e) => {
        this.setState({ name: e.target.value });
    };

    handleColorChange = (e) => {
        this.setState({ color: e.target.value });
    };

    render() {
        const actions = [
            <FlatButton
                label="Ok"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleClose}
                />,
        ];

        return (
            <div>
                <Dialog
                    title="Hi There"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    >
                    <p>You seem like you're new to ProxiMate.  Please give us a few details.</p> 
                    <TextField
                        id="shortname"
                        floatingLabelText="Your Name"
                        onChange={this.handleNameChange} />
                    <TextField
                        id="color"
                        floatingLabelText="Colour"
                        onChange={this.handleColorChange} />
                </Dialog>
            </div>
        );
    }
}
