import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { showDataOnMap } from "../../util";
import "./Map.css";

function Map({ casesType, countries, center, zoom, darkMode }) {
  // console.log(darkMode);
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      casesType={casesType}
      className="map"
    >
      <TileLayer
        attribution={
          darkMode
            ? '© <a href="https://stadiamaps.com/">Stadia Maps</a>, © <a href="https://openmaptiles.org/">OpenMapTiles</a> © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            : '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }
        url={
          darkMode
            ? "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        }
      />
      {/* looping through all countries and display circles  */}
      {showDataOnMap(countries, casesType)}
    </MapContainer>
  );
}

export default Map;
