import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom'
import GoogleApi from './lib/GoogleApi';
import GoogleApiComponent from './GoogleApiComponent';
import Map from './Map';

const Container = React.createClass({

    render() {
        const style = {
            width: '100vw',
            height: '100vh'
        }
        if (!this.props.loaded) {
            return <div>Loading...</div>
        }
        else {console.log(this.props.google); }             //
        return (
            <div style={style}>
                <Map google={this.props.google} />
            </div>
        )
    }

});

export default GoogleApiComponent({
    apiKey: 'AIzaSyDGe_FmSZBr74_Eo9rbe-Ld9r264Ay47hE',
    libraries: ['geometry']
})(Container);
