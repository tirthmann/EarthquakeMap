import { GoogleMapsOverlay } from '@deck.gl/google-maps';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import { ScatterplotLayer } from '@deck.gl/layers';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';


const sourceData = './earthquake-data.json';

const scatterplot = () => new ScatterplotLayer({
    id: 'scatter',
    data: sourceData,
    opacity: 0.8,
    filled: true,
    radiusMinPixels: 2,
    radiusMaxPixels: 5,
    getPosition: d => [d.Longitude, d.Latitude],
    getFillColor: d => d.Magnitude > 6 ? [200, 0, 40, 150] : [255, 140, 0, 100],

    pickable: true,
    onHover: ({object, x, y}) => {
        const el = document.getElementById('tooltip');
        if (object) {
          const { Magnitude, Date } = object;
          el.innerHTML = `<h1>${Date} Magnitude: ${Magnitude}</h1>`
          el.style.display = 'block';
          el.style.opacity = 0.9;
          el.style.left = x + 'px';
          el.style.top = y + 'px';
        } else {
          el.style.opacity = 0.0;
        }
    },

    onClick: ({object, x, y}) => {
        //window.open(`https://www.gunviolencearchive.org/incident/${object.incident_id}`)
      },

      
  });

const heatmap = () => new HeatmapLayer({
    id: 'heat',
    data: sourceData,
    getPosition: d => [d.Longitude, d.Latitude],
    getWeight: d => (d.Magnitude * 10),
    radiusPixels: 60,
});

const hexagon = () => new HexagonLayer({
    id: 'hex',
    data: sourceData,
    getPosition: d => [d.Longitude, d.Latitude],
    getElevationWeight: d => d.Magnitude,
    elevationScale: 100,
    extruded: true,
    radius: 90000,         
    opacity: 0.6,        
    coverage: 0.88,
    lowerPercentile: 5
});

window.initMap = () => {

    const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.0, lng: -100.0},
        zoom: 5,
        //styles: mapStyles
    });

    const overlay = new GoogleMapsOverlay({
        layers: [
            scatterplot(),
            //heatmap(),
            //hexagon()
        ],
    });

    overlay.setMap(map);

}

