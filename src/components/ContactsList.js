import React, {PropTypes, Component} from 'react';
import moment from 'moment';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';

class ContactsList extends Component {
    
    formatDate(dateTime) {
        return moment(dateTime).fromNow();
    }

    distanceTo(contact) {
        let d = this.distanceBetween(this.props.me.position, contact.position) / 1.6142;
        return d.toFixed(1.1);
    }

    distanceBetween(latLng1, latLng2){
        var R = 6371;
        var dLat = this.deg2rad(latLng2.lat - latLng1.lat);
        var dLon = this.deg2rad(latLng2.lng - latLng1.lng);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(latLng1.lat)) * Math.cos(this.deg2rad(latLng2.lat)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }

    deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

    render() {
        let contacts = this.props.contacts.map((l) => {
            return (
                <ListItem key={l.key}>
                    <div className="contact-row">
                        <span className="name">{l.name}</span>
                        <span className="fill-space"></span>
                        <span className="time"><i>{this.formatDate(l.updated) }</i></span>
                        <span className="label label-success">{this.distanceTo(l) } mi</span>
                    </div>
                </ListItem>
            )
        });

        return (
            <Paper className="contacts-container" zDepth={2}>
                <List className="contacts-list">
                    {contacts}
                </List>
            </Paper>
        )
    }

}

export default ContactsList;