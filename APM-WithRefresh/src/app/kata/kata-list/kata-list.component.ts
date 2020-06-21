import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pm-kata-list',
  templateUrl: './kata-list.component.html'
})
export class KataListComponent implements OnInit {
  pageTitle = 'Katas';
  errorMessage: string;

  constructor(
  ) {}

  ngOnInit(): void {
  }

}
