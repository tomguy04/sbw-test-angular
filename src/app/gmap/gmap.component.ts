/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
//import {MatButtonModule, MatCheckboxModule} from '@angular/material';

//https://www.techiediaries.com/angular-tutorial/

import { Censusblock } from '../models_client/censusblock.model';
import { CensusblockService } from '../services/censusblock.service';
import { BlockService } from '../services/block.service';
import { Block } from '../services/block';

import { } from '@types/googlemaps'

//to get google maps working
declare const google;

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.css']
})
export class GmapComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  censusblock: Censusblock;
  censusblock2: Censusblock;
  map: google.maps.Map;
  
  // Selected Location (initialize to Seattle)
  selectedLat: number = 46.073;
  selectedLong: number = -118.368;
  selectedBlock: number = 530719205001030;
  selectedBlockData: any;
  cbid: number;
  selectedID: number = 0;
  currentZoom: number = 17;
  errors='';

  //Layers

  blockLayer;
  
  toggleblocklayer:boolean = true;
  
  latitude: any;
  longitude: any;

//class constructor injecting stuff
constructor(
   private  changeDetector:ChangeDetectorRef, 
    private censusblockService: CensusblockService,
    ){
  this.changeDetector = changeDetector;
}
  ngOnInit() {

  }

  //ngAfterContentInit(selectedLat, selectedLng, selectedBlock) {
  ngAfterContentInit() { 

    
    let mapProp = {
      center: new google.maps.LatLng(this.selectedLat, this.selectedLong),
      zoom: 15,
      //mapTypeId: google.maps.MapTypeId.ROADMAP
      mapTypeId: google.maps.MapTypeId.HYBRID,
      tilt: 0,
      scaleControl: true,
      zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM
      },
      streetViewControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM
      },
      fullscreenControlOptions: {
        position: google.maps.ControlPosition.BOTTOM_LEFT
      }
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    this.blockLayer = new google.maps.FusionTablesLayer({
                query: {
                   //Sample census blocks
                    //https://www.google.com/fusiontables/DataSource?docid=181lhJJkYVFl3-SBjZ49gj_DPCNhJTGdhm_-Z0oAg
                    select: '\'geometry\'',
                    where: 'name = ' + this.selectedBlock,
                    from: '1UuMuU8demcoaoW2pIVc1P8nsD_YhpOzfa5RRsGwk'
                }
                ,
                options: {
                    styleId: 2,
                    templateId: 2
                }
                
            });
    this.blockLayer.setMap(this.map);  
     

  } //end of nginitafter...
  logStuff(){
    console.log(this.censusblock);
}

   
    loadBlockSites(cbid){
        
        //use service to lookup block info
        console.log('loadBlockSites has '+ cbid);
        this.censusblockService.getCensusblockbyID(cbid)
        .subscribe(
            censusblock => {
                this.censusblock=censusblock;
                console.log('passed block is '  + cbid + ' returned geoid is '+ this.censusblock.geoid10);    
                let cbs: Censusblock = this.censusblock;
                //let index = 0;
                //console.log('cbs is ' + cbs);
                //// *** ?? Why doesn't selectedBlockData have all columns of data?
                //this.selectedBlock = this.selectedBlockData.geoid10;
                this.selectedBlock = cbs.geoid10;
                //this.selectedLat = this.selectedBlockData.intptlat10;
                this.selectedLat = cbs.intptlat10;
                //this.selectedLong = this.selectedBlockData.intptlon10;
                this.selectedLong = cbs.intptlon10;
                //console.log('parts are '  + this.selectedBlock + "  " + this.selectedLat + "  " + this.selectedLong);
                this.latitude = this.selectedLat;
                this.longitude = this.selectedLong;    
                //this.ngAfterContentInit();
                this.blockLayer = new google.maps.FusionTablesLayer({
                            query: {
                                select: '\'geometry\'',
                                where: 'name = ' + this.selectedBlock,
                                from: '1UuMuU8demcoaoW2pIVc1P8nsD_YhpOzfa5RRsGwk'
                            }
                            ,
                            options: {
                                styleId: 2,
                                templateId: 2
                            }                
                        });
                this.blockLayer.setMap(this.map);
                //fit to block
                //this.setCenter();
                this.map.setCenter(new google.maps.LatLng(this.latitude, this.longitude));      
            }
        );

        //console.log('block is '  + this.selectedBlockData[0].geoid10);
        //this is delayed by one block. cbid is current, this.censusblock is one behind
        //Argh!!!!
        //this.changeDetector.detectChanges();
// *** in the real app the values below area different. But in this version they are the same. So I guess that means it's the real API call that is the problem.       
        
        // console.log('passed block is '  + cbid + ' returned geoid is '+ this.censusblock.geoid10);
        
    
        // let cbs: Censusblock = this.censusblock;
        // //let index = 0;
        // //console.log('cbs is ' + cbs);
        // //// *** ?? Why doesn't selectedBlockData have all columns of data?
        // //this.selectedBlock = this.selectedBlockData.geoid10;
        // this.selectedBlock = cbs.geoid10;
        // //this.selectedLat = this.selectedBlockData.intptlat10;
        // this.selectedLat = cbs.intptlat10;
        // //this.selectedLong = this.selectedBlockData.intptlon10;
        // this.selectedLong = cbs.intptlon10;
        // //console.log('parts are '  + this.selectedBlock + "  " + this.selectedLat + "  " + this.selectedLong);
        // this.latitude = this.selectedLat;
        // this.longitude = this.selectedLong;    
        // //this.ngAfterContentInit();
        // this.blockLayer = new google.maps.FusionTablesLayer({
        //             query: {
        //                 select: '\'geometry\'',
        //                 where: 'name = ' + this.selectedBlock,
        //                 from: '1UuMuU8demcoaoW2pIVc1P8nsD_YhpOzfa5RRsGwk'
        //             }
        //             ,
        //             options: {
        //                 styleId: 2,
        //                 templateId: 2
        //             }                
        //         });
        // this.blockLayer.setMap(this.map);
        // //fit to block
        // //this.setCenter();
        // this.map.setCenter(new google.maps.LatLng(this.latitude, this.longitude));
            
    } //end of loadBlockSites     
  
    
    onPickedBlock(censusblock){

        console.log ('got the block: ' + censusblock);
        this.loadBlockSites(censusblock);
    }

    setCenter() {
          this.map.setCenter(new google.maps.LatLng(this.latitude, this.longitude));

          let location = new google.maps.LatLng(this.latitude, this.longitude);

          let marker = new google.maps.Marker({
          position: location,
          map: this.map,
          title: this.selectedBlock.toString(),
          //label: this.selectedBlock
          });

          //marker.addListener('click', this.simpleMarkerHandler);

          marker.addListener('click', () => {
          this.markerHandler(marker);
          });
      }

     markerHandler(marker: google.maps.Marker) {
        alert('Marker\'s Title: ' + marker.getTitle());
        //alert('Marker\'s Label: ' + marker.getLabel());
    }

    toggleBlockLayer() {
        console.log('in toggleblocklayer: ' + this.toggleblocklayer);
        if (this.toggleblocklayer) {
            this.blockLayer.setMap(this.map);
        } else {
            this.blockLayer.setMap(null);
        }
    }



} //End of ? (everthing)
