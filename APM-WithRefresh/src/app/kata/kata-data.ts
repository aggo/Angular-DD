import { Kata } from './kata';

export class KataData {

  static katas: Kata[] = [
    {
      'id': 1,
      'kataName': 'Kata1',
      'kataCode': 'GDN-0011',
      'description': 'Leaf rake with 48-inch wooden handle',
      'price': 19.95,
      'categoryId': 1,
      'supplierIds': [1, 2]
    },
    {
      'id': 2,
      'kataName': 'Kata2',
      'kataCode': 'GDN-0023',
      'description': '15 gallon capacity rolling garden cart',
      'price': 32.99,
      'categoryId': 1,
      'supplierIds': [3, 4]
    },
    {
      'id': 5,
      'kataName': 'Kata3',
      'kataCode': 'TBX-0048',
      'description': 'Curved claw steel hammer',
      'price': 8.9,
      'categoryId': 3,
      'supplierIds': [5, 6]
    },
    {
      'id': 8,
      'kataName': 'Kata4',
      'kataCode': 'TBX-0022',
      'description': '15-inch steel blade hand saw',
      'price': 11.55,
      'categoryId': 3,
      'supplierIds': [7, 8]
    },
    {
      'id': 10,
      'kataName': 'Kata5',
      'kataCode': 'GMG-0042',
      'description': 'Standard two-button video game controller',
      'price': 35.95,
      'categoryId': 5,
      'supplierIds': [9, 10]
    }
  ];
}
