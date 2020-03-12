import React from "react";
import {
    render
} from "react-dom";
import OLMapFragment from "./components/OLMapSample";
import "./index.css";
// OSM Buildings
import OSMBuildings from './OSMBuildings-OL5.js';

render( < OLMapFragment / > , document.getElementById("root"));