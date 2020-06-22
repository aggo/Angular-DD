import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { combineLatest, Observable, ReplaySubject, throwError } from 'rxjs';
import { catchError, filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';

import { Car } from './car';
import { CarCategoryService } from '../car-categories/car-category.service';
import { SupplierService } from '../suppliers/supplier.service';
import { Supplier } from '../suppliers/supplier';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(
    private http: HttpClient,
    private carCategoryService: CarCategoryService,
    private supplierService: SupplierService
  ) {
  }

  private carsUrl = 'api/cars';

  // Use ReplaySubject to "replay" values to new subscribers
  // It buffers the defined number of values, in these cases, 1.

  // Invalidates the cache and refreshes the data from the backend server
  // The generic parameter is void because it does not care what the value is, only that an item is emitted.
  private refresh = new ReplaySubject<void>(1);
  // Retains the currently selected car Id
  // Uses 0 for no selected car (couldn't use null because it is used as a route parameter)
  private selectedCarSource = new ReplaySubject<number>(1);
  // Expose the selectedCar as an observable for use by any components
  selectedCarChanges$ = this.selectedCarSource.asObservable();

  // LIST OF STREAMS

  // All cars
  // Instead of defining the http.get in a method in the service,
  // set the observable directly
  // Use shareReplay to "replay" the data from the observable
  // Subscription remains even if there are no subscribers (navigating to the Welcome page for example)
  cars$ = this.http.get<Car[]>(this.carsUrl)
    .pipe(
      tap(data => console.log('getCategories: ', JSON.stringify(data))),
      shareReplay(),
      catchError(this.handleError)
    );

  // All cars
  // Same as above, but set up with `refresh` to allow for invalidating the cache
  // Must then `mergeMap` to flatten the inner observable.
  // cars$ = this.refresh.pipe(
  //   mergeMap(() => this.http.get<Car[]>(this.carsUrl)),
  //   tap(data => console.log('getCategories: ', JSON.stringify(data))),
  //   shareReplay(),
  //   catchError(this.handleError)
  // );

  // All cars with category id mapped to category name
  // Be sure to specify the type to ensure after the map that it knows the correct type
  carsWithCategoryAndTotal$ = combineLatest(
    this.cars$,
    this.carCategoryService.carCategories$
  ).pipe(
    map(([cars, categories]) =>
      cars
        .map(
          currentCar =>
            ({
              ...currentCar,
              category: categories.find(c => currentCar.categoryId === c.id).name,
              totalInThisCategory: cars.filter(c => c.categoryId === currentCar.categoryId).length
            } as Car) // <-- note the type here
        )
// .filter(car => car.category === 'Vacation')
    ),
    shareReplay()
  );

// Currently selected car
// Subscribed to in both List and Detail pages,
// so use the shareReply to share it with any component that uses it
// Location of the shareReplay matters ... won't share anything *after* the shareReplay
  selectedCar$ = combineLatest(
    this.selectedCarChanges$,
    this.carsWithCategoryAndTotal$
  ).pipe(
    map(([selectedCarId, cars]) =>
      cars.find(car => car.id === selectedCarId)
    ),
    tap(car => console.log('changeSelectedCar', car)),
    shareReplay({bufferSize: 1, refCount: false})
  );

  // filter(Boolean) checks for nulls, which casts anything it gets to a Boolean.
  // Filter(Boolean) of an undefined value returns false
  // filter(Boolean) -> filter(value => !!value)
  // SwitchMap here instead of mergeMap so quickly clicking on
  // the items cancels prior requests.
  selectedCarSuppliers$ = this.selectedCar$.pipe(
    filter(value => !!value),
    switchMap(car =>
      this.supplierService.getSuppliersByIds(car.supplierIds)
    )
  );

  // suppliers
  // Retains the currently selected supplier Id
  private selectedSupplierSource = new ReplaySubject<number>(1);
  // Expose the selectedCar as an observable for use by any components
  selectedSupplierChanges$ = this.selectedSupplierSource.asObservable();

  selectedSupplier$ = combineLatest(
    this.selectedSupplierChanges$,
    this.selectedCarSuppliers$
  ).pipe(
    map(([selectedSupplierId, suppliers]) =>
      suppliers.find(supplier => supplier.id === selectedSupplierId) as Supplier
    ),
    tap(s => console.log('changeSelectedSupplier', s)),
    shareReplay({bufferSize: 1, refCount: false})
  );

  // Change the selected car
  changeSelectedCar(selectedCarId: number | null): void {
    this.selectedCarSource.next(selectedCarId);
  }

  // Change the selected supplier
  changeSelectedSupplier(selectedSupplierId: number | null): void {
    this.selectedSupplierSource.next(selectedSupplierId);
  }

  // AntiPattern: Nested (or chained) http calls results in nested observables
  // that are difficult to process
  // First, get the car
  // For each supplier for that car, get the supplier info
  // getCarSuppliers(id: number) {
  //   const carUrl = `${this.carsUrl}/${id}`;
  //   return this.http.get<Car>(carUrl)
  //     .pipe(
  //       map(car =>
  //         car.supplierIds.map(supplierId => {
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
    this.carCategoryService.start();
    this.refresh.next();
  }

  // Gets a single car by id
  // Using the existing list of cars.
  // This could instead get the data directly
  // if required, such as on an edit.
  private getCar(id: number): Observable<Car> {
    return this.cars$.pipe(
      map(carlist => carlist.find(row => row.id === id)),
      tap(data => console.log('getCar: ', JSON.stringify(data))),
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
