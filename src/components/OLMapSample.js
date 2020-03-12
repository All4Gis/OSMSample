import React from "react";

// Openlayers imports
import { Map, View } from "ol";
import { Tile as TileLayer } from "ol/layer";
import { TileWMS as TileWMSSource } from "ol/source";
import { ScaleLine, ZoomSlider, defaults as DefaultControls } from "ol/control";
import {
  defaults as defaultInteractions,
  DragRotateAndZoom
} from "ol/interaction";
import "ol/ol.css";
import OSM from "ol/source/OSM";

// End Openlayers imports

class OLMapSample extends React.Component {
  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  updateDimensions() {
    const h = window.innerWidth >= 992 ? window.innerHeight : 400;
    this.setState({ height: h });
  }
  componentWillMount() {
    window.addEventListener("resize", this.updateDimensions);
    this.updateDimensions();
  }
  componentDidMount() {
    // Create an Openlayer Map instance with two tile layers
    new Map({
      //  Display the map in the div with the id of map
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        new TileLayer({
          source: new TileWMSSource({
            url: "https://ahocevar.com/geoserver/wms",
            params: {
              layers: "topp:states",
              TILED: true,
              serverType: "geoserver",
              // Countries have transparency, so do not fade tiles:
              transition: 0
            },
            projection: "EPSG:4326"
          }),
          name: "USA"
        })
      ],
      // Add in the following map interactions
      interactions: defaultInteractions().extend([new DragRotateAndZoom()]),
      // Add in the following map controls
      controls: DefaultControls().extend([new ZoomSlider(), new ScaleLine()]),
      // Render the tile layers in a map view with a Mercator projection
      view: new View({
        projection: "EPSG:3857",
        center: [0, 0],
        zoom: 2
      })
    });
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  render() {
    const style = {
      width: "100%",
      height: this.state.height,
      backgroundColor: "#ffffff"
    };
    return <div id="map" style={style}></div>;
  }
}
export default OLMapSample;
