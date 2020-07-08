import { Car } from './car';

export class CarData {

  static cars: Car[] = [
    {
      'id': 1,
      'carName': 'Car1@c',
      'carCode': 'GDN-0011',
      'description': 'Leaf rake with 48-inch wooden handle',
      'price': 19.95,
      'categoryId': 1,
      'supplierIds': [1, 2],
    },
    {
      'id': 2,
      'carName': 'Car2',
      'carCode': 'GDN-0023',
      'description': '15 gallon capacity rolling garden cart',
      'price': 32.99,
      'categoryId': 1,
      'supplierIds': [3, 4]
    },
    {
      'id': 5,
      'carName': 'Car3',
      'carCode': 'TBX-0048',
      'description': 'Curved claw steel hammer',
      'price': 8.9,
      'categoryId': 3,
      'supplierIds': [5, 6]
    },
    {
      'id': 8,
      'carName': 'Car4',
      'carCode': 'TBX-0022',
      'description': '15-inch steel blade hand saw',
      'price': 11.55,
      'categoryId': 3,
      'supplierIds': [7, 8]
    },
    {
      'id': 10,
      'carName': 'Car6',
      'carCode': 'GMG-0042',
      'description': 'Standard two-button video game controller',
      'price': 35.95,
      'categoryId': 5,
      'supplierIds': [9, 10]
    },
    {
      'id': 11,
      'carName': 'Car7',
      'carCode': 'GDN-0011',
      'description': 'Leaf rake with 48-inch wooden handle',
      'price': 19.95,
      'categoryId': 3,
      'supplierIds': [1, 2, 3, 4]
    },
  ];
}
