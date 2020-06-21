import { Component, OnInit } from '@angular/core';
import { CarService } from '../../cars/car.service';

@Component({
  selector: 'pm-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.css']
})
export class SupplierDetailComponent implements OnInit {
  selectedSupplierId$ = this.carService.selectedSupplierChanges$;
  selectedSupplier$ = this.carService.selectedSupplier$;

  constructor(private readonly carService: CarService) {
  }

  ngOnInit() {
  }

}
