import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { MapService } from 'src/app/mapbox-servive.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})

export class MapPage implements OnInit {
  compare$: Observable<string>;
  constructor(
    private store: Store<{ compare: string }>,
    private map: MapService,
    private menu: MenuController
  ) {
    this.compare$ = store.select('compare');
  }

  ngOnInit() {
    this.map.buildMap();
  }

  public generatePins() {
    this.map.menuIndex= "You choose the use case  number 1";
    this.map.getOption()
    this.map.addPins();
    
  }
  public centerPins() {
    this.map.fitZoom();
    this.map.menuIndex='You choose the use case  number 4';
    this.map.getOption()
  }
  public gotoCurrentPosition(){
    this.map.flytoCurrentPosition();
  }
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
  
  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
  


}
