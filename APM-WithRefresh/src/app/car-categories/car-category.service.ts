import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { CarCategory } from './car-category';
import { MyHttpService } from './my-http.service';

@Injectable({
  providedIn: 'root'
})
export class CarCategoryService {

  // Getting started and refresh ... not a data stream so therefore use ReplaySubject to retain the values
  // "Reactive" way to control flow.
  // Not ever actually putting any data into it.
  private refresh = new ReplaySubject<void>();

  // All car categories
  // Refresh is used as a starter here.
  // [Object reference to a function]
  // HTTP: One and done eg. Autocomplete
  // Using refresh here instead of reassigning the value ensures that
  // no references are lost.
  carCategories$: Observable<CarCategory[]> = this.refresh.pipe(
    /** any xxxMap will do, merge is the safest. */
    mergeMap(() => this.myHttpService.getCategories()),
    tap({
      next: data => console.log('getCategories', JSON.stringify(data)),
      complete: () => console.log('competed request!')
    }),
    catchError((this.handleError))
  );

  constructor(private myHttpService: MyHttpService) {
  }

  // Refresh the data.
  refreshData(): void {
    this.refresh.next();
  }

  start() {
    this.refreshData();
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
