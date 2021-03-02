import React from 'react';
import {MapContainer,TileLayer,CircleMarker,useMap} from 'react-leaflet';

/*We had to make a MapChild Component because MapContainer only updates once and As we need to change center
in the map according to the selected country from the dropdown, we need to update the Map. So the only way to
update the Map is to make a MapChild Component and change the center using setView.
For More Info: https://react-leaflet.js.org/docs/api-map
Also, The Solution: https://stackoverflow.com/questions/64736789/react-leaflet-map-doesnt-update*/
function MapChild({center}){
    const map=useMap();
    map.setView(center);
    return null;
}

function Map({mapCountries,mapType,mapCenter}) {
    const showData=(mapCountries)=>{
        if(mapCountries.length===0){
            return(
                <CircleMarker center={[10,20]} pathOptions={{color: 'red'}} radius={80}></CircleMarker>
            );
        }else{
            /*return(
                <CircleMarker center={[latLongs[10].lat,latLongs[10].long]} pathOptions={{color: 'red'}} radius={80}></CircleMarker>
            );*/
            return(
                //latLongs.map((item)=><CircleMarker center={[item.lat,item.long]} pathOptions={{color: 'red'}} radius={80}></CircleMarker>)
                mapCountries.map((item)=>
                    <CircleMarker center={[item.countryInfo.lat,item.countryInfo.long]} pathOptions={{color: mapType.color}} radius={Math.sqrt(item.cases)*mapType.multiplier}></CircleMarker>
                )
            );
        }
    };

    return (
        <MapContainer center={mapCenter} zoom={3} scrollWheelZoom={false} style={{height: '100%'}}>
            <MapChild center={mapCenter} />
            <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {showData(mapCountries)}
        </MapContainer>
    );
}

export default Map;
