import { Component, OnInit } from '@angular/core';
import { ToyService } from '../toy.service';

@Component({
  selector: 'pm-toy-list',
  templateUrl: './toy-list.component.html'
})
export class ToyListComponent implements OnInit {
  pageTitle = 'Toys';
  errorMessage: string;

  toys$ = this.toyService.toys$;
  toysWithCategories$ = this.toyService.toysWithCategories$;

  constructor(private toyService: ToyService
  ) {
  }

  ngOnInit(): void {
    this.toyService.refresh();
  }

}
