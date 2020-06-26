import { Injectable } from '@angular/core';
import { ToyCategoryService } from '../toy-categories/toy-category.service';
import { SupplierService } from '../suppliers/supplier.service';
import { map, mergeMap, shareReplay, tap } from 'rxjs/operators';
import { Toy } from './toy';
import { combineLatest, Observable, ReplaySubject } from 'rxjs';
import { MyHttpService } from '../car-categories/my-http.service';

@Injectable({
  providedIn: 'root'
})
export class ToyService {

  private refresh$ = new ReplaySubject<boolean>();

  toys$ = this.refresh$.pipe(
    mergeMap(() => this.myHttpService.getToys()),
    tap(() => console.log('Loaded toys!')),
    // takeUntil(fromEvent(document.getElementById('id1'), 'click')),
    shareReplay()
  );


  toysWithCategories$ = combineLatest(
    this.toys$,
    this.toyCategoryService.toyCategories$)
    .pipe(map(([toys, categories]) => {
      return toys
        .map(currentToy => {
          return ({
            ...currentToy,
            category: categories.find(c => c.id === currentToy.categoryId).name
          } as Toy);
        });
    }));


  constructor(
    private myHttpService: MyHttpService,
    private toyCategoryService: ToyCategoryService,
    private supplierService: SupplierService,
  ) {
  }

  refresh() {
    this.refresh$.next(true);
  }

}
