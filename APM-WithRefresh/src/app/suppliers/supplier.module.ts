import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';
import { MaterialModule } from './supplier-detail/material.module';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    MaterialModule
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
