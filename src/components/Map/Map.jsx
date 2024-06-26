import React from "react";
import GoogleMapReact from "google-map-react";
import {Paper, Typography, useMediaQuery} from "@material-ui/core";
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';

const Map = ({setCoordinates, setBounds, coordinates, places, setChildClicked, weatherData}) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)');

    //console.log({weatherData});
    
    return(
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
                defaultCenter={undefined}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={{disableDefaultUI:true, zoomControl:true}}
                onChange={(e) => {
                    setCoordinates({lat:e.center.lat, lng: e.center.lng})
                    setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw})
                }}
                onChildClick={(child) => setChildClicked(child)}
            >
                {places?.map((place,i)=>(
                    <div
                        className={classes.makerContainer}
                        lat={Number(place?.latitude)}
                        lng={Number(place?.longitude)}
                        key={i}
                    >
                        {
                            !isDesktop ? (
                                <LocationOnOutlinedIcon color='primary' fontsize='large' />
                            ) : (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                                        {place.name}
                                    </Typography>
                                    <img
                                        className={classes.pointer}
                                        src={place.photo ? place.photo.images.large.url: 'https://google.com/'}
                                        alt={place.name}
                                    />
                                    <Rating size='small' value={Number(place.rating)} readOnly />
                                </Paper>
                            )
                        }

                    </div>
                ))}
                
                    <div style={{position: "absolute", transform: 'translate(0%,0%)'}}>
                        <img height={100} src={`https://openweather.site/img/wn/${weatherData?.weather?.[0]?.icon}.png`} />
                    </div>
            
            </GoogleMapReact>
        </div>
    )
}

export default Map;