import { Component, OnInit } from '@angular/core';

import { ProductService } from '../product.service';

@Component({
  templateUrl: './product-container.component.html'
})
export class ProductContainerComponent implements OnInit {
  pageTitle = 'Products';

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    // Set up the product services
    this.productService.start();
  }
}
