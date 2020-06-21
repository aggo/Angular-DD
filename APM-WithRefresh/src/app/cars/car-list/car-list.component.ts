import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CarService } from '../car.service';

@Component({
  selector: 'pm-car-list',
  templateUrl: './car-list.component.html'
})
export class CarListComponent implements OnInit {
  pageTitle = 'Cars';
  errorMessage: string;
  cars$ = this.carService.carsWithCategoryAndTotal$.pipe(
    catchError(error => {
      this.errorMessage = error;
      return of(null);
    })
  );

  vacationCars$ = this.carService.carsWithCategoryAndTotal$.pipe(
    // transform the array into an array where we only keep vacation cars
    map(cars => cars.filter(car => car.category === 'Vacation')),
    catchError(error => {
      this.errorMessage = error;
      return of(null);
    })
  );
  selectedCarId$ = this.carService.selectedCarChanges$;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService
  ) {
  }

  ngOnInit(): void {
    // Read the parameter from the route - supports deep linking
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      this.carService.changeSelectedCar(id);
    });
  }

  onRefresh(): void {
    this.carService.refreshData();
  }

  onSelected(carId: number): void {
    // Modify the URL to support deep linking
    this.router.navigate(['/cars', carId]);
  }
}
