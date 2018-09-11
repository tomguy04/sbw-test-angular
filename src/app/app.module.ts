import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { CensusblockComponent } from './censusblock/censusblock.component';
import { GmapComponent }        from './gmap/gmap.component';
import { BlockComponent }       from './block/block.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule ],
   declarations: [ AppComponent, HelloComponent, CensusblockComponent, GmapComponent, BlockComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
