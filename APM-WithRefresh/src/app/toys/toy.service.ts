import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToyCategoryService } from '../toy-categories/toy-category.service';
import { SupplierService } from '../suppliers/supplier.service';
import { mergeMap, shareReplay, tap } from 'rxjs/operators';
import { Toy } from './toy';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToyService {
  private toysUrl = 'api/toys';

  private refresh$ = new ReplaySubject<boolean>();
  private refreshObs = new Observable(observer => {
    observer.next();
  });

  toys$ = this.refresh$.pipe(
    mergeMap(() => this.http.get<Toy[]>(this.toysUrl)),
    tap(() => console.log('Loaded toys!')),
    // takeUntil(fromEvent(document.getElementById('id1'), 'click')),
    shareReplay()
  );

  toysWithObs$ = this.refreshObs.pipe(
    mergeMap(() => this.http.get<Toy[]>(this.toysUrl)),
    tap(() => console.log('Loaded toys!')),
    // takeUntil(fromEvent(document.getElementById('id1'), 'click')),
    shareReplay()
  );


  constructor(
    private http: HttpClient,
    private toyCategoryService: ToyCategoryService,
    private supplierService: SupplierService,
  ) {
  }

  refresh() {
    this.refresh$.next(true);
    this.refreshObs.subscribe(() => {
      console.log('si de aici');
    });
  }

}
