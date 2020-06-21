import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pm-toy-detail',
  templateUrl: './toy-detail.component.html'
})
export class ToyDetailComponent implements OnInit {
  pageTitle = 'Toy Detail';
  errorMessage: string;

  constructor() {
  }

  ngOnInit() {
  }

}
