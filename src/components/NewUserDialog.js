import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

// TODO: no validation in form

const items = [
    <MenuItem key={1} value={'blue'} primaryText="Blue" />,
    <MenuItem key={2} value={'red'} primaryText="Red" />,
    <MenuItem key={3} value={'green'} primaryText="Green" />,
    <MenuItem key={4} value={'black'} primaryText="Black" />,
    <MenuItem key={5} value={'purple'} primaryText="Purple" />,
    <MenuItem key={6} value={'orange'} primaryText="Orange" />
];

export default class NewUserDialog extends React.Component {
    state = {
        open: false,
        name: '',
        color: 'blue'
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

    handleColorChange = (event, index, value) => {
        this.setState({ color: value });
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
                    <p className="dialog-text">You seem like you're new to ProxiMate.  Please give us a few details.</p> 
                    <TextField
                        id="shortname"
                        floatingLabelText="Your Name"
                        onChange={this.handleNameChange} />
                    <SelectField 
                        id="color"
                        floatingLabelText="Choose a colour for your pin"
                        floatingLabelFixed={true}
                        value={this.state.color} 
                        onChange={this.handleColorChange}>
                        {items}
                    </SelectField>
                </Dialog>
            </div>
        );
    }
}
