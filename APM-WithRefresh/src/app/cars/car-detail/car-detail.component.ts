import { Component, OnInit } from '@angular/core';

import { tap, catchError, map, filter } from 'rxjs/operators';

import { CarService } from '../car.service';
import { Car } from '../car';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'pm-car-detail',
  templateUrl: './car-detail.component.html'
})
export class CarDetailComponent implements OnInit {
  pageTitle = 'Car Detail';
  errorMessage: string;

  selectedCarId$ = this.carService.selectedCarChanges$;
  car$ = this.carService.selectedCar$.pipe(
    tap(car => this.displayCar(car)),
    catchError(err => this.errorMessage = err)
  );
  suppliers$ = this.carService.selectedCarSuppliers$;

  // Create another combined stream with all data used in the view
  vm$ = combineLatest([this.car$, this.suppliers$, this.selectedCarId$]).pipe(
    map(([car, suppliers, selectedCarId]) => ({ car, suppliers, selectedCarId }))
  );

  constructor(private carService: CarService) { }

  ngOnInit() { }

  displayCar(car: Car): void {
    // Display the appropriate heading
    if (car) {
      this.pageTitle = `Car Detail for: ${car.carName}`;
    } else {
      this.pageTitle = 'No car found';
    }
  }
}
