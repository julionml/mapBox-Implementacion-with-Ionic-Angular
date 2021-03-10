import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { compare } from './map/map.actions';
import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  menuIndex: string;
  mapbox = (mapboxgl as typeof mapboxgl);
  map: mapboxgl.Map;
  style = 'https://api.maptiler.com/maps/eef16200-c4cc-4285-9370-c71ca24bb42d/style.json?key=SoL71Zyf7SmLrVYWC7fQ';
  // Coordenadas de la localización donde queremos centrar el mapa
  lat = 38.909671288923;
  lng = -77.034084142948;
  zoom = 15;
  currentLng: number;
  currentLat: number;
  constructor(
    private geolocation: Geolocation,
    private store: Store<{ compare: string }>
    ) {
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
    getOption(){
      this.store.dispatch(compare({compareOption:this.menuIndex}));
      
    }
    public flyToSelectedPoint(currentFeature) {  
      this.menuIndex="You choose the use cases  number 2, 3 and 5"
     this.getOption()
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
          
        }else{
          that.menuIndex=''
          that.getOption();
        }
       
      });     
  }
  /*function to create a marker in the user current position*/
  createMarker(lng:number,lat:number){
    const marker = new mapboxgl.Marker({
      draggable: true
      })
      .setLngLat([lng, lat])
      .addTo(this.map);
  }
  /*function to go to the user current position*/
  async flytoCurrentPosition(){
   this.getCurrentPosition();
   await new Promise(resolve => setTimeout(resolve, 1000)); // 5 sec

   this.createMarker(this.currentLng,this.currentLat)
   this.map.flyTo({
    center: [this.currentLng, this.currentLat],
    zoom: 15
  });
  this.menuIndex="You choose the use cases  number 6"
  this.getOption();
  }
  /*function to get the user current position*/
  getCurrentPosition(){
    this.geolocation.getCurrentPosition({ maximumAge: 1000, timeout: 5000, enableHighAccuracy: true }).then((resp) => {
      this.currentLat=resp.coords.latitude;
      this.currentLng=resp.coords.longitude;  
      
      }, er => {
        alert("error getting location")
    
      }).catch((error) => {
        alert('Error getting location' + JSON.stringify(error));
    
      });
  }
  
}