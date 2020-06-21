import { Toy } from './toy';

export class ToyData {

  static toys: Toy[] = [
    {
      'id': 1,
      'toyName': 'Leaf Rake',
      'toyCode': 'GDN-0011',
      'description': 'Leaf rake with 48-inch wooden handle',
      'price': 19.95,
      'categoryId': 1,
      'supplierIds': [1, 2]
    },
    {
      'id': 2,
      'toyName': 'Garden Cart',
      'toyCode': 'GDN-0023',
      'description': '15 gallon capacity rolling garden cart',
      'price': 32.99,
      'categoryId': 1,
      'supplierIds': [3, 4]
    },
    {
      'id': 5,
      'toyName': 'Hammer',
      'toyCode': 'TBX-0048',
      'description': 'Curved claw steel hammer',
      'price': 8.9,
      'categoryId': 3,
      'supplierIds': [5, 6]
    },
    {
      'id': 8,
      'toyName': 'Saw',
      'toyCode': 'TBX-0022',
      'description': '15-inch steel blade hand saw',
      'price': 11.55,
      'categoryId': 3,
      'supplierIds': [7, 8]
    },
    {
      'id': 10,
      'toyName': 'Video Game Controller',
      'toyCode': 'GMG-0042',
      'description': 'Standard two-button video game controller',
      'price': 35.95,
      'categoryId': 5,
      'supplierIds': [9, 10]
    }
  ];
}
