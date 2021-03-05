import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MenuController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MapService } from 'src/app/mapbox-servive.service';
import * as  Mapboxgl from 'mapbox-gl'
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})

export class MapPage implements OnInit {


  public currentLatitude: any = '';
  public currentLongitude: any = '';
  public mapa: Mapboxgl.Map;


  constructor(
    private map: MapService,
    private geolocation: Geolocation,
    private menu: MenuController
  ) {

  }

  ngOnInit() {
    this.map.buildMap();
  }
  
public generatePins(){
  this.map.addPins();
}
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
public centerPins(){
  this.map.fitZoom();
}
  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }


  
}
