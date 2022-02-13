import React from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';


const containerStyle = {
    position : 'relative',
    width: '1000px',
    height: '500px'
  }

  const style = {
    width: '100%',
    height: '100%'
  }

export class MapContainer extends React.Component {

    render() {
      return (
          <>
        <Map google={this.props.google} zoom={3}
            containerStyle={containerStyle}
            style={style}
            initialCenter={{
                lat: 0.0,
                lng: 0.0
              }}
            >
   
         <Marker position={{lat: this.props.lat, lng: this.props.long}} />
   
        </Map>
        </>
      );
    }
  }
   
  export default GoogleApiWrapper({
    apiKey: ('AIzaSyBnTVUBEL1qB0HaVIfKmCCeHCxDtUB5icg')
  })(MapContainer)