import { Supplier } from '../suppliers/supplier';

/*
  Defines the kata entity
  This shape includes both the categoryId and the category string
  This shape includes both the supplierIds and the supplier objects
*/
export interface Kata {
  id: number;
  kataName: string;
  kataCode: string;
  categoryId: number;
  category?: string;
  description: string;
  price: number;
  supplierIds?: number[];
  suppliers?: Supplier[];
}
