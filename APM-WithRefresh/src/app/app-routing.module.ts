import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShellComponent } from './home/shell.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: ShellComponent,
        children: [
          {path: 'welcome', component: WelcomeComponent},
          {
            path: 'products',
            loadChildren: './products/product.module#ProductModule'
          },
          {
            path: 'cars',
            loadChildren: './cars/car.module#CarModule'
          },
          {
            path: 'toys',
            loadChildren: './toys/toy.module#ToyModule'
          },
          {
            path: 'kata',
            loadChildren: './kata/kata.module#KataModule'
          },
          {path: '', redirectTo: 'welcome', pathMatch: 'full'}
        ]
      },
      { path: '**', component: PageNotFoundComponent }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
