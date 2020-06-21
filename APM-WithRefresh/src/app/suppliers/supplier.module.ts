import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    SupplierDetailComponent
  ],
  exports: [
    SupplierDetailComponent
  ]
})
export class SupplierModule {
}
