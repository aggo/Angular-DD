import { Component, OnInit } from '@angular/core';

import { tap, catchError, map, filter } from 'rxjs/operators';

import { ToyService } from '../toy.service';
import { Toy } from '../toy';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'pm-toy-detail',
  templateUrl: './toy-detail.component.html'
})
export class ToyDetailComponent implements OnInit {
  pageTitle = 'Toy Detail';
  errorMessage: string;

  selectedToyId$ = this.toyService.selectedToyChanges$;
  toy$ = this.toyService.selectedToy$.pipe(
    tap(toy => this.displayToy(toy)),
    catchError(err => this.errorMessage = err)
  );
  suppliers$ = this.toyService.selectedToySuppliers$;

  // Create another combined stream with all data used in the view
  vm$ = combineLatest([this.toy$, this.suppliers$, this.selectedToyId$]).pipe(
    map(([toy, suppliers, selectedToyId]) => ({ toy, suppliers, selectedToyId }))
  );

  constructor(private toyService: ToyService) { }

  ngOnInit() { }

  displayToy(toy: Toy): void {
    // Display the appropriate heading
    if (toy) {
      this.pageTitle = `Toy Detail for: ${toy.toyName}`;
    } else {
      this.pageTitle = 'No toy found';
    }
  }
}
