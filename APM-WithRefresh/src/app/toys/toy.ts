import { Supplier } from '../suppliers/supplier';

/*
  Defines the toy entity
  This shape includes both the categoryId and the category string
  This shape includes both the supplierIds and the supplier objects
*/
export interface Toy {
  id: number;
  toyName: string;
  toyCode: string;
  categoryId: number;
  category?: string;
  description: string;
  price: number;
  supplierIds?: number[];
  suppliers?: Supplier[];
}
