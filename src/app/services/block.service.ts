import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Block } from './block';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})

export class BlockService {
 //use node server address
 private blocksUrl = 'http://localhost:4000/api/blocks';  // URL to web api

 constructor(
   private http: HttpClient,
   private messageService: MessageService) { }

  /** GET blocks from the server */
  getAllBlocks (): Observable<Block[]> {
    return this.http.get<Block[]>(this.blocksUrl)
      .pipe(
        tap(blocks => this.log('fetched blocks')),
        catchError(this.handleError('getBlocks', []))
      );
  }
 
  getBlockbyID (blockid): Observable<Block> {
    return this.http.get<Block>(this.blocksUrl + '/' + blockid )
      .pipe(
        tap(censusblocks => this.log('fetched block by id ' + blockid)),
        catchError(this.handleError<any>('getBlocks'))
      );
  }

    /** PUT: update the Block on the server */
    updateBlock (block: Block): Observable<any> {
      console.log('block service recd ', block);
      return this.http.put(this.blocksUrl, block, httpOptions).pipe(
        tap(_ => this.log(`updated block id=${block.block} on ${this.blocksUrl}`)),
        catchError(this.handleError<any>('updateBlock'))
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

  /** Log a BlockService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`BlockService: ${message}`);
  }

}

