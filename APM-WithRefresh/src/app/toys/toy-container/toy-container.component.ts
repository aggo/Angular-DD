import { Component, OnInit } from '@angular/core';

import { ToyService } from '../toy.service';

@Component({
  templateUrl: './toy-container.component.html'
})
export class ToyContainerComponent implements OnInit {
  pageTitle = 'Toys';

  constructor() {
  }

  ngOnInit(): void {
  }
}
