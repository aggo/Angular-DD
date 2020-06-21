import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { CarListComponent } from './car-list/car-list.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { CarContainerComponent } from './car-container/car-container.component';

import { SharedModule } from '../shared/shared.module';
import { SupplierModule } from '../suppliers/supplier.module';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: ':id',
        component: CarContainerComponent
      }
    ]),
    SupplierModule
  ],
  declarations: [
    CarContainerComponent,
    CarListComponent,
    CarDetailComponent
  ]
})
export class CarModule {
}
