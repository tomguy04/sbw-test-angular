import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map, tap, mapTo, delay } from 'rxjs/operators';

import { Censusblock } from './censusblock';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CensusblockService {

  // Let's pretend this is coming from the server
  censusblocks: Censusblock[] = [
    new Censusblock(160010007021043, 43.5967709, -116.1750783, 30659),
    new Censusblock(160010008042001, 43.5913309, -116.174233,419597),
    new Censusblock(160010021001017, 43.559862, -116.183786, 1025),
    new Censusblock(530330017021009, 47.6987487, -122.3573981, 20279)
  ];

// stuff below is the real API call, but don't know how to use on stackblitz
  private censusblocksUrl = 'http://localhost:4000/api/censusblocks';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET censusblocks from the server */
  getCensusblocks (): Observable<Censusblock[]> {

    return of(null).pipe(
      mapTo(this.censusblocks),
      delay(3000)  // to simulate API call delay
    );
  }

  getCensusblockbyID (cbid): Observable<Censusblock> {
    //this didn't seem to work that's why I put in the switch above              
    const current = this.censusblocks.find(c => {
      // console.log(c, cbid);
      console.log('service returns ', c.geoid10);
      return c.geoid10 === +cbid
    });

    // const current = this.censusblocks.find(
    //   c => c.geoid10 === +cbid);
    //   console.log('current is ', current);
     
    //   return of(current);
      

    //const current = this.censusblocks[index];       
    this.log(`Retrieved 1 census block: ${current.geoid10}`);
    return of(null).pipe(
      mapTo(current),
      delay(3000)  // to simulate API call delay
    );
  
  
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`CensusblockService: ${message}`);
  }

}
