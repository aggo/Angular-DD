import { TestBed } from '@angular/core/testing';
import { TestScheduler } from 'rxjs/testing';
import * as assert from 'assert';
import { HttpClientModule } from '@angular/common/http';
import { rxSandbox } from 'rx-sandbox';
import { marbleAssert } from 'rx-sandbox/dist/src/assert/marbleAssert';
import { SupplierData } from './supplier-data';
import { SupplierService } from './supplier.service';


describe('SupplierService ', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientModule]}));
  let testScheduler: TestScheduler;
  let rx: any;
  let httpService: any;
  let supplierService: SupplierService;
  let testSuppliers: any;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      // asserting the two objects are equal
      assert.deepEqual(actual, expected);
    });

    testSuppliers = SupplierData.suppliers;

    rx = rxSandbox.create();

    const {cold} = rx;
    httpService = {
      'getSupplierById': function(param) {
        return param;
      }
    };

    spyOn(httpService, 'getSupplierById')
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

    supplierService = new SupplierService(httpService);

  });

  it('should return suppliers properly', () => {
    const {e, getMessages, flush} = rx;

    const result = supplierService.getSuppliersByIds([1, 2]);

    const expectedObservable = e('--(a|)', {
      a: [testSuppliers[0], testSuppliers[1]]
    });

    // get metadata from observable to assert with expected metadata values
    const messages = getMessages(result);

    // execute observables
    flush();

    // When assertion fails, 'marbleAssert' will display visual / object diff with raw object values for easier debugging.
    marbleAssert(messages).to.equal(expectedObservable);
  });

});
