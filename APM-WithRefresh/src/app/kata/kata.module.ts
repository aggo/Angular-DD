import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { KataListComponent } from './kata-list/kata-list.component';
import { KataDetailComponent } from './kata-detail/kata-detail.component';
import { KataContainerComponent } from './kata-container/kata-container.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: ':id',
        component: KataContainerComponent
      }
    ])
  ],
  declarations: [
    KataContainerComponent,
    KataListComponent,
    KataDetailComponent
  ]
})
export class KataModule { }
