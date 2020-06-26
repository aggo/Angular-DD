import { Injectable } from '@angular/core';

import { forkJoin, Observable, throwError } from 'rxjs';

import { Supplier } from './supplier';
import { MyHttpService } from '../car-categories/my-http.service';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  constructor(private myHttpService: MyHttpService) {
  }

  // Gets all suppliers
  private getSuppliers(): Observable<Supplier[]> {
    return this.myHttpService.getSuppliers()
      .pipe(
        tap(data => console.log('getSuppliers: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  // Gets set of suppliers given a set of ids
  getSuppliersByIds(ids: number[]): Observable<Supplier[]> {
    // Build the list of http calls
    const calls: Observable<Supplier>[] = [];
    ids.map(id => {
      calls.push(this.myHttpService.getSupplierById(id));
    });

    return forkJoin(calls) // Join the calls
      .pipe(
        tap(data => console.log('getSuppliersByIds: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }


  // Gets a single supplier by id
  private getSupplier(id: number): Observable<Supplier> {
    return this.myHttpService.getSupplierById(id)
      .pipe(
        tap(data => console.log('getSupplier: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
