import React from "react";

import { Map, View } from "ol";
import { Tile as TileLayer } from "ol/layer";
import "ol/ol.css";
import OSM from "ol/source/OSM";
import OSMBuildings from "../OSMBuildings-OL5";
import * as olProj from "ol/proj.js";
import Button from "@material-ui/core/Button";

class OLMapSample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      featuresLayer: null,
      OSMBuildings: false,
      text: "Show Buildings"
    };
  }
  componentDidMount = () => {
    // create map object with feature layer
    let map = new Map({
      target: "mapContainer",
      layers: [
        //default OSM layer
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: olProj.transform([13.33522, 52.5044], "EPSG:4326", "EPSG:3857"),
        zoom: 16
      })
    });

    // save map and layer references to local state
    this.setState({
      map: map
    });
  };

  toggleOSMBuildings = () => {
    if (!this.state.OSMBuildings) {
      //console.log("Show OSM Building");
      this.osmBuildings = new OSMBuildings(this.state.map);
      this.osmBuildings.date(new Date(2017, 5, 15, 17, 30));
      this.osmBuildings.load();
      this.setState({ text: "Hide Buildings" });
    } else {
      //console.log("Hide OSM Building");
      this.osmBuildings.unload();
      this.setState({ text: "Show Buildings" });
    }
  };

  render() {
    const { text } = this.state;
    const style = {
      width: "100%",
      height: "500px",
      backgroundColor: "#ffffff"
    };
    const styleBtn = {
      margin: 5
    };
    return (
      <div>
        <div id="mapContainer" style={style}></div>
        <Button
          style={styleBtn}
          color={this.state.OSMBuildings ? "secondary" : "primary"}
          variant="contained"
          onClick={() =>
            this.setState(
              { OSMBuildings: !this.state.OSMBuildings },
              this.toggleOSMBuildings()
            )
          }
        >
          {text}
        </Button>
      </div>
    );
  }
}
export default OLMapSample;
