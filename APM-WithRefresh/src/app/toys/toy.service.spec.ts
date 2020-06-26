import { TestBed } from '@angular/core/testing';
import { TestScheduler } from 'rxjs/testing';
import * as assert from 'assert';
import { HttpClientModule } from '@angular/common/http';
import { rxSandbox } from 'rx-sandbox';
import { marbleAssert } from 'rx-sandbox/dist/src/assert/marbleAssert';
import { ToyService } from './toy.service';
import { ToyCategoryService } from '../toy-categories/toy-category.service';
import { ToyData } from './toy-data';
import { ToyCategoryData } from '../toy-categories/toy-category-data';
import { SupplierData } from '../suppliers/supplier-data';
import { SupplierService } from '../suppliers/supplier.service';


describe('ToyService ', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientModule]}));
  let testScheduler: TestScheduler;
  let rx: any;
  let httpService: any;
  let httpServiceForSupplier: any;
  let toyService: ToyService;
  let toyCategoryService: ToyCategoryService;
  let supplierService: SupplierService;
  let testToys: any;
  let testCategories: any;
  let testSuppliers: any;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      // asserting the two objects are equal
      assert.deepEqual(actual, expected);
    });

    testToys = ToyData.toys;
    testCategories = ToyCategoryData.categories;
    testSuppliers = SupplierData.suppliers;

    rx = rxSandbox.create();
    const {cold} = rx;
    httpService = jasmine.createSpyObj('MyHttpService', [
      'getToys',
      'getToyCategories'
    ]);

    httpService.getToyCategories.and.returnValue(
      cold('---a', {a: [testCategories[0], testCategories[1]]})
    );

    httpService.getToys.and.returnValue(
      cold('---a', {a: [testToys[0], testToys[1], testToys[2]]})
    );

    toyCategoryService = new ToyCategoryService(httpService);

    httpServiceForSupplier = {
      'getSupplierById': function(param) {
        return param;
      }
    };

    spyOn(httpServiceForSupplier, 'getSupplierById')
    // [!!] this is alternative to the withArgs.and.returnValue
    //   .and.callFake(function() {
    //   const param = arguments[0];
    //
    //   if (param === 1) {
    //     console.log('www', param);
    //     return cold('-a|', {a: testSuppliers[0]});
    //   } else if (param === 2) {
    //     return cold('-a|', {a: testSuppliers[1]});
    //   }
    // });
      .withArgs(1).and.returnValue(cold('-a|', {a: testSuppliers[0]}))
      .withArgs(2).and.returnValue(cold('-a|', {a: testSuppliers[1]}));

    supplierService = new SupplierService(httpServiceForSupplier);
    toyService = new ToyService(httpService, toyCategoryService, supplierService);

  });

  // it('should return categories from stream', () => {
  //   const {e, getMessages, flush} = rx;
  //
  //   // create the expected observable by using marble string
  //   const expectedObservable = e('---a', {
  //     a: [testCategories[0], testCategories[1]]
  //   });
  //
  //   toyCategoryService.refreshData();
  //   // toyService.refreshData();
  //
  //   // get metadata from observable to assert with expected metadata values
  //   const messages = getMessages(toyCategoryService.toyCategories$);
  //
  //   // execute observables
  //   flush();
  //
  //   // When assertion fails, 'marbleAssert' will display visual / object diff with raw object values for easier debugging.
  //   marbleAssert(messages).to.equal(expectedObservable);
  // });

  // it('should return toys from stream', () => {
  //   const {e, cold, getMessages, flush} = rx;
  //
  //   // create the expected observable by using marble string
  //   httpService.getToys.and.returnValue(
  //     cold('---a', {a: [testToys[0], testToys[1], testToys[2]]})
  //   );
  //   const expectedObservable = e('---a', {
  //     a: [testToys[0], testToys[1], testToys[2]]
  //   });
  //
  //   toyService.refreshData();
  //
  //   // get metadata from observable to assert with expected metadata values
  //   const messages = getMessages(toyService.toys$);
  //
  //   // execute observables
  //   flush();
  //
  //   // When assertion fails, 'marbleAssert' will display visual / object diff with raw object values for easier debugging.
  //   marbleAssert(messages).to.equal(expectedObservable);
  // });

  it('should return toys with categories from stream', () => {
    const {e, getMessages, flush} = rx;

    // create the expected observable by using marble string
    const expectedFinalObservable = e('---a', {
      a: [{...testToys[0], category: 'Kids 4-5'},
        {...testToys[1], category: 'Kids 4-5'},
        {...testToys[2], category: 'Kids 7-8'}]
    });

    toyCategoryService.refreshData();
    toyService.refresh();

    // get metadata from observable to assert with expected metadata values
    const messages = getMessages(toyService.toysWithCategories$);

    // execute observables
    flush();

    // When assertion fails, 'marbleAssert' will display visual / object diff with raw object values for easier debugging.
    marbleAssert(messages).to.equal(expectedFinalObservable);
  });

  // it('should return selected toy properly', () => {
  //   const {e, getMessages, flush} = rx;
  //
  //   // create the expected observable by using marble string
  //   const expectedFinalObservable = e('---a', {
  //     a: {...testToys[0], category: 'Sport', totalInThisCategory: 2}
  //   });
  //
  //   toyCategoryService.refreshData();
  //   toyService.changeSelectedToy(1);
  //
  //   // get metadata from observable to assert with expected metadata values
  //   const messages = getMessages(toyService.selectedToy$);
  //
  //   // execute observables
  //   flush();
  //
  //   // When assertion fails, 'marbleAssert' will display visual / object diff with raw object values for easier debugging.
  //   marbleAssert(messages).to.equal(expectedFinalObservable);
  // });
  //
  // it('should return selected toy suppliers', () => {
  //   const {e, getMessages, flush} = rx;
  //
  //   // create the expected observable by using marble string
  //   const expectedObservable = e('-----a)', {
  //     a: [testSuppliers[0], testSuppliers[1]]
  //   });
  //
  //   toyCategoryService.refreshData();
  //   toyService.changeSelectedToy(1);
  //
  //   // get metadata from observable to assert with expected metadata values
  //   const messages = getMessages(toyService.selectedToySuppliers$);
  //
  //   // execute observables
  //   flush();
  //
  //   // When assertion fails, 'marbleAssert' will display visual / object diff with raw object values for easier debugging.
  //   marbleAssert(messages).to.equal(expectedObservable);
  // });
  //
  // it('should return selected supplier', () => {
  //   const {e, getMessages, flush} = rx;
  //
  //   // create the expected observable by using marble string
  //   const expectedObservable = e('-----a', {
  //     a: testSuppliers[0]
  //   });
  //
  //   toyCategoryService.refreshData();
  //   toyService.changeSelectedToy(1);
  //   toyService.changeSelectedSupplier(1);
  //
  //   // get metadata from observable to assert with expected metadata values
  //   const messages = getMessages(toyService.selectedSupplier$);
  //
  //   // execute observables
  //   flush();
  //
  //   // When assertion fails, 'marbleAssert' will display visual / object diff with raw object values for easier debugging.
  //   marbleAssert(messages).to.equal(expectedObservable);
  // });
});
