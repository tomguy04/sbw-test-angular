import { Component, OnInit, Input } from '@angular/core';

import {Block} from  '../services/block'
import {BlockService} from  '../services/block.service'
import { CensusblockService } from '../services/censusblock.service';
import { Censusblock } from '../models_client/censusblock.model';


@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {

  model = new Block('No Block Selected Yet');
  @Input() pickedBlock:Censusblock;
  // @Input() currentblock:Block;
  // currentblock:Block;
  
  //lookup lists
  blockstatuses:Array<String> = ['In Progress', 'Ready for QC', 'QC Notes', 'QC Complete'];
  blockTypes:Array<String>= ['No OLSA', 'Street Lights Only', 'Other OLSA'];

  //helpful variables
  sitesavestatus:String;
  loggedinUser:String= 'gina';

  constructor(
    private blockService: BlockService, 
    private censusblockService: CensusblockService
    ) { }

  ngOnInit() {
    
  }
  ngOnChanges(){
    this.saveBlock(this.pickedBlock);
  }
  saveBlock(pickedBlock){
      //debugger;
      console.log(pickedBlock);
      /* work out form dirty test issue        
      if(this.blockForm.dirty)

        if ($scope.blockForm.$pristine) {
            console.log("Form is pristine, dont save");
            $scope.sitesavestatus = 'No changes, block not saved'
            //addForm.$pristine
        } else */
        if (typeof this.model.block === "undefined") {
          console.log("no block, dont save");
          this.sitesavestatus = 'No block, not saved';
      } else if (typeof this.loggedinUser === "undefined") {
          console.log("not logged in, dont save");
          this.sitesavestatus = 'Login to make changes';
    } else {
          // Grabs all of the text box fields
          var BlockData = this.model
          BlockData.updated_at = Date.now();
          
          //console.log("filled SiteData. Roads is " + SiteData.roads);
          //debugger;
          // Saves the Block data to the db
          this.blockService.updateBlock(BlockData)
            .subscribe(() => {
              
              this.sitesavestatus='block updated';
              console.log("block saved");
              this.sitesavestatus = 'Block Saved';
            });
      }   //end of else
  } //end of saveBlock

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

}
