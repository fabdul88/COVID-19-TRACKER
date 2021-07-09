import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { showDataOnMap } from "../../util";
import "./Map.css";

function Map({ casesType, countries, center, zoom }) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      casesType={casesType}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* looping through all countries and display circles  */}
      {showDataOnMap(countries, casesType)}
    </MapContainer>
  );
}

export default Map;
