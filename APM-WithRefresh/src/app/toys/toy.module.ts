import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ToyListComponent } from './toy-list/toy-list.component';
import { ToyDetailComponent } from './toy-detail/toy-detail.component';
import { ToyShellComponent } from './toy-shell/toy-shell.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: ':id',
        component: ToyShellComponent
      }
    ])
  ],
  declarations: [
    ToyShellComponent,
    ToyListComponent,
    ToyDetailComponent
  ]
})
export class ToyModule { }
