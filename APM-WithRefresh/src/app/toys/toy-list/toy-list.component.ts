import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { of, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Toy } from '../toy';
import { ToyService } from '../toy.service';

@Component({
  selector: 'pm-toy-list',
  templateUrl: './toy-list.component.html'
})
export class ToyListComponent implements OnInit {
  pageTitle = 'Toys';
  errorMessage: string;
  toys$ = this.toyService.toysWithCategory$.pipe(
    catchError(error => {
      this.errorMessage = error;
      return of(null);
    })
  );
  selectedToyId$ = this.toyService.selectedToyChanges$;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toyService: ToyService
  ) {}

  ngOnInit(): void {
    // Read the parameter from the route - supports deep linking
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      this.toyService.changeSelectedToy(id);
    });
  }

  onRefresh(): void {
    this.toyService.refreshData();
  }

  onSelected(toyId: number): void {
    // Modify the URL to support deep linking
    this.router.navigate(['/toys', toyId]);
  }
}
