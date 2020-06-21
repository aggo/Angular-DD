import { Component, OnInit } from '@angular/core';

import { CarService } from '../car.service';

@Component({
  templateUrl: './car-container.component.html'
})
export class CarContainerComponent implements OnInit {
  pageTitle = 'Cars';

  constructor(private carService: CarService) {
  }

  ngOnInit(): void {
    // Set up the car services
    this.carService.start();
  }
}
