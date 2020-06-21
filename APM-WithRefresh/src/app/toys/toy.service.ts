import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToyCategoryService } from '../toy-categories/toy-category.service';
import { SupplierService } from '../suppliers/supplier.service';

@Injectable({
  providedIn: 'root'
})
export class ToyService {
  private toysUrl = 'api/toys';

  constructor(
    private http: HttpClient,
    private toyCategoryService: ToyCategoryService,
    private supplierService: SupplierService
  ) { }

}
