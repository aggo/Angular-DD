import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

import { SharedModule } from '../shared/shared.module';
import { ProductContainerComponent } from './product-container/product-container.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: ':id',
        component: ProductContainerComponent
      }
    ])
  ],
  declarations: [
    ProductContainerComponent,
    ProductListComponent,
    ProductDetailComponent
  ]
})
export class ProductModule { }
