import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pm-kata-detail',
  templateUrl: './kata-detail.component.html'
})
export class KataDetailComponent implements OnInit {
  pageTitle = 'Kata Detail';
  errorMessage: string;

  constructor() {
  }

  ngOnInit() {
  }

}
