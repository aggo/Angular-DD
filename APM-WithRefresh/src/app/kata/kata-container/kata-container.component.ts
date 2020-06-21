import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './kata-container.component.html'
})
export class KataContainerComponent implements OnInit {
  pageTitle = 'Katas';

  constructor() {
  }

  ngOnInit(): void {
  }
}
