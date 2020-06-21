import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pm-toy-list',
  templateUrl: './toy-list.component.html'
})
export class ToyListComponent implements OnInit {
  pageTitle = 'Toys';
  errorMessage: string;

  constructor(
  ) {}

  ngOnInit(): void {
  }

}
