import React, {PropTypes, Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';

class ContactsList extends Component {

    render() {
        return (
            <Paper className="contacts-container" zDepth={2}>
                <List className="contacts-list">
                    <ListItem primaryText="Mark" />
                    <ListItem primaryText="John" />
                    <ListItem primaryText="Roger" />
                    <ListItem primaryText="Peter" />
                </List>
            </Paper>
        )
    }

}

export default ContactsList;