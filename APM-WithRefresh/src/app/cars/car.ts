import { Supplier } from '../suppliers/supplier';

/*
  Defines the car entity
  This shape includes both the categoryId and the category string
  This shape includes both the supplierIds and the supplier objects
*/
export interface Car {
  id: number;
  carName: string;
  carCode: string;
  categoryId: number;
  category?: string;
  description: string;
  price: number;
  supplierIds?: number[];
  suppliers?: Supplier[];
  totalInThisCategory: number;
}
