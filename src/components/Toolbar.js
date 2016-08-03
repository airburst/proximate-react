import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom'
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import SocialPeople from 'material-ui/svg-icons/social/people';
import MapsMyLocation from 'material-ui/svg-icons/maps/my-location';
import MapsZoomOutMap from 'material-ui/svg-icons/maps/zoom-out-map';

class Toolbar extends Component {

    centreMap() {
        console.log('Centre map on me')        //
    }

    scaleToFit() {
        console.log('Scale to fit')        //
    }
    
    showContacts() {
        console.log('Show or hide contacts')        //
    }

    render() {
        return (
            <Paper className="toolbar">

                <IconButton 
                    tooltip="Centre on Me" 
                    tooltipPosition="top-center"
                    onTouchTap={this.centreMap}>
                    <MapsMyLocation />
                </IconButton>

                <IconButton 
                    tooltip="Show Everyone" 
                    tooltipPosition="top-center"
                    onTouchTap={this.scaleToFit}>
                    <MapsZoomOutMap />
                </IconButton>

                <IconButton 
                    tooltip="Contacts" 
                    tooltipPosition="top-center"
                    onTouchTap={this.showContacts}>
                    <SocialPeople />
                </IconButton>

            </Paper>
        )
    }

}

export default Toolbar;