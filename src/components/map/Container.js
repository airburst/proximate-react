import React, { Component } from 'react';
//import GoogleApiComponent from './GoogleApiComponent';

export class Container extends React.Component {
    
    render() {
        const style = {
            width: '100vw',
            height: '100vh'
        }
        return (
            <div style={style}>
                <Map google={this.props.google}
                    />
            </div>
        )
    }
    
}

export default GoogleApiComponent({
    apiKey: 'AIzaSyDGe_FmSZBr74_Eo9rbe-Ld9r264Ay47hE'
})(Container)