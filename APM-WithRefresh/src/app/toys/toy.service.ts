import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { combineLatest, Observable, ReplaySubject, throwError } from 'rxjs';
import { catchError, filter, map, mergeMap, shareReplay, switchMap, tap } from 'rxjs/operators';

import { Toy } from './toy';
import { ToyCategoryService } from '../toy-categories/toy-category.service';
import { SupplierService } from '../suppliers/supplier.service';

@Injectable({
  providedIn: 'root'
})
export class ToyService {
  private toysUrl = 'api/toys';

  // Use ReplaySubject to "replay" values to new subscribers
  // It buffers the defined number of values, in these cases, 1.

  // Invalidates the cache and refreshes the data from the backend server
  // The generic parameter is void because it does not care what the value is, only that an item is emitted.
  private refresh = new ReplaySubject<void>(1);
  // Retains the currently selected toy Id
  // Uses 0 for no selected toy (couldn't use null because it is used as a route parameter)
  private selectedToySource = new ReplaySubject<number>(1);
  // Expose the selectedToy as an observable for use by any components
  selectedToyChanges$ = this.selectedToySource.asObservable();

  // LIST OF STREAMS

  // All toys
  // Instead of defining the http.get in a method in the service,
  // set the observable directly
  // Use shareReplay to "replay" the data from the observable
  // Subscription remains even if there are no subscribers (navigating to the Welcome page for example)
  toys$ = this.http.get<Toy[]>(this.toysUrl)
    .pipe(
      tap(data => console.log('getToys: ', JSON.stringify(data))),
      shareReplay(),
      catchError(this.handleError)
    );

  // All toys
  // Same as above, but set up with `refresh` to allow for invalidating the cache
  // Must then `mergeMap` to flatten the inner observable.
  // toys$ = this.refresh.pipe(
  //   mergeMap(() => this.http.get<Toy[]>(this.toysUrl)),
  //   tap(data => console.log('getToys: ', JSON.stringify(data))),
  //   shareReplay(),
  //   catchError(this.handleError)
  // );

  // All toys with category id mapped to category name
  // Be sure to specify the type to ensure after the map that it knows the correct type
  toysWithCategory$ = combineLatest(
    this.toys$,
    this.toyCategoryService.toyCategories$
  ).pipe(
    map(([toys, categories]) =>
      toys.map(
        p =>
          ({
            ...p,
            category: categories.find(c => p.categoryId === c.id).name
          } as Toy) // <-- note the type here!
      )
    ),
    shareReplay()
  );

  // Currently selected toy
  // Subscribed to in both List and Detail pages,
  // so use the shareReply to share it with any component that uses it
  // Location of the shareReplay matters ... won't share anything *after* the shareReplay
  selectedToy$ = combineLatest(
    this.selectedToyChanges$,
    this.toysWithCategory$
  ).pipe(
    map(([selectedToyId, toys]) =>
      toys.find(toy => toy.id === selectedToyId)
    ),
    tap(toy => console.log('changeSelectedToy', toy)),
    shareReplay({ bufferSize: 1, refCount: false })
  );

  // filter(Boolean) checks for nulls, which casts anything it gets to a Boolean.
  // Filter(Boolean) of an undefined value returns false
  // filter(Boolean) -> filter(value => !!value)
  // SwitchMap here instead of mergeMap so quickly clicking on
  // the items cancels prior requests.
  selectedToySuppliers$ = this.selectedToy$.pipe(
    filter(value => !!value),
    switchMap(toy =>
      this.supplierService.getSuppliersByIds(toy.supplierIds)
    )
  );

  constructor(
    private http: HttpClient,
    private toyCategoryService: ToyCategoryService,
    private supplierService: SupplierService
  ) { }

  // Change the selected toy
  changeSelectedToy(selectedToyId: number | null): void {
    this.selectedToySource.next(selectedToyId);
  }

  // AntiPattern: Nested (or chained) http calls results in nested observables
  // that are difficult to process
  // First, get the toy
  // For each supplier for that toy, get the supplier info
  // getToySuppliers(id: number) {
  //   const toyUrl = `${this.toysUrl}/${id}`;
  //   return this.http.get<Toy>(toyUrl)
  //     .pipe(
  //       map(toy =>
  //         toy.supplierIds.map(supplierId => {
  //           const supplierUrl = `${this.suppliersUrl}/${supplierId}`;
  //           return this.http.get(supplierUrl);
  //         })
  //       ),
  //       catchError(this.handleError)
  //     );
  // }

  // Refresh the data.
  refreshData(): void {
    this.start();
  }

  start() {
    // Start the related services
    this.toyCategoryService.start();
    this.refresh.next();
  }

  // Gets a single toy by id
  // Using the existing list of toys.
  // This could instead get the data directly
  // if required, such as on an edit.
  private getToy(id: number): Observable<Toy> {
    return this.toys$.pipe(
      map(toylist => toylist.find(row => row.id === id)),
      tap(data => console.log('getToy: ', JSON.stringify(data))),
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
