import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Censusblock } from '../services/censusblock';
import { CensusblockService } from '../services/censusblock.service';

@Component({
  selector: 'app-censusblock',
  templateUrl: './censusblock.component.html',
  styleUrls: ['./censusblock.component.css']
})
export class CensusblockComponent implements OnInit {
  censusblocks: Censusblock[];
  @Output() pickedBlock = new EventEmitter<any>();

  constructor(private censusblockService: CensusblockService) { }

  ngOnInit() {
    this.getCensusblocks();
  }

  getCensusblocks(): void {
    this.censusblockService.getCensusblocks()   
    .subscribe(censusblocks => this.censusblocks = censusblocks);
    //.subscribe(censusblocks => this.censusblocks = censusblocks.sort()); SORT DIDN'T WORK
  }
  
  selectedBlock(block){   
    this.pickedBlock.emit(block);  
    console.log('this.pickedBlock.emit',block);
    console.log('block passed is', block);
  }

}
