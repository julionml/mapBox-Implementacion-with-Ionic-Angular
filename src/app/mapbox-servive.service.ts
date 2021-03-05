import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  mapbox = (mapboxgl as typeof mapboxgl);
  map: mapboxgl.Map;
  style = 'https://api.maptiler.com/maps/eef16200-c4cc-4285-9370-c71ca24bb42d/style.json?key=SoL71Zyf7SmLrVYWC7fQ';
  // Coordenadas de la localización donde queremos centrar el mapa
  lat = 38.909671288923;
  lng = -77.034084142948;
  zoom = 15;
  constructor() {
    // Asignamos el token desde las variables de entorno
    this.mapbox.accessToken = environment.mapBoxKey;
  }
  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'mapa-mapbox',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat]
    });
    
    }
    public flyToSelectedPoint(currentFeature) {  
    
      this.map.flyTo({
        center: currentFeature.geometry.coordinates,
        zoom: 15
      });
    }
    public createPopUp(currentFeature) {
      var popUps = document.getElementsByClassName('mapboxgl-popup');
      /** Check if there is already a popup on the map and if so, remove it */
      if (popUps[0]) popUps[0].remove();
  
      var popup = new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat(currentFeature.geometry.coordinates)
        .setHTML('<h3>Sweetgreen</h3>' +
          '<h4>' + currentFeature.properties.address + '</h4>')
        .addTo(this.map);
    }
    fitZoom() {
     
      this.map.fitBounds([
        [-77.361696,38.9577129],
        [-76.9358048,38.9923499]
      ],{maxZoom:8});
    

  }
  addPins(){
    var url = 'https://julionml.github.io/storesLocation/storesLocations.geojson';
    this.map.addSource('locations', {
      'type': 'geojson',
      'data':url
      
      });
      this.map.addLayer({
        'id': 'locations',
        'type': 'circle',
        'source': 'locations',
        'layout': {},
        paint: {
          'circle-radius': 6,
          'circle-color': {type: 'identity', property: 'color'},
        }
      });
      this.map.addLayer({
        "id": "locations1",
        "type": "fill",
        "source": "locations",
        "layout": {}
        
        
    });
    
      var that = this
      this.map.on('click', function (e) {
        /* Determine if a feature in the "locations" layer exists at that point. */
        var features = e.target.queryRenderedFeatures(e.point, {
          layers: ['locations']
        });
  
        /* If yes, then: */
        if (features.length) {
          var clickedPoint = features[0];
  
          /* Fly to the point */
          that.flyToSelectedPoint(clickedPoint);
  
          /* Close all other popups and display popup for clicked store */
          that.createPopUp(clickedPoint);
  
          
         
          
          
        }
      });     
  }
}