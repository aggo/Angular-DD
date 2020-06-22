import { Component, OnInit } from '@angular/core';
import { ToyCategoryService } from '../../toy-categories/toy-category.service';

@Component({
  templateUrl: './toy-container.component.html'
})
export class ToyContainerComponent implements OnInit {
  pageTitle = 'Toys';

  constructor(private toyCategoryService: ToyCategoryService) {
  }

  ngOnInit(): void {
    this.toyCategoryService.start();
  }
}
