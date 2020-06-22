import { TestBed } from '@angular/core/testing';
import { TestScheduler } from 'rxjs/testing';
import * as assert from 'assert';
import { HttpClientModule } from '@angular/common/http';
import { rxSandbox } from 'rx-sandbox';
import { marbleAssert } from 'rx-sandbox/dist/src/assert/marbleAssert';
import { CarService } from './car.service';
import { CarCategoryService } from '../car-categories/car-category.service';
import { CarData } from './car-data';
import { CarCategoryData } from '../car-categories/car-category-data';


describe('CarService ', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientModule]}));
  let testScheduler: TestScheduler;
  let rx: any;
  let httpService: any;
  let carService: CarService;
  let carCategoryService: CarCategoryService;
  let testCars: any;
  let testCategories: any;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      // asserting the two objects are equal
      assert.deepEqual(actual, expected);
    });

    testCars = CarData.cars;
    testCategories = CarCategoryData.categories;

    rx = rxSandbox.create();
    const {cold, hot} = rx;
    httpService = jasmine.createSpyObj('MyHttpService', [
      'getCars',
      'getCategories'
    ]);

    httpService.getCategories.and.returnValue(
      cold('---a', {a: [testCategories[0], testCategories[1]]})
    );

    httpService.getCars.and.returnValue(
      cold('---a', {a: [testCars[0], testCars[1], testCars[2]]})
    );

    carCategoryService = new CarCategoryService(httpService);
    carService = new CarService(httpService, carCategoryService, null);
  });

  it('should return categories from stream', () => {
    const {e, getMessages, flush} = rx;

    // create the expected observable by using marble string
    const expectedObservable = e('---a', {
      a: [testCategories[0], testCategories[1]]
    });

    carCategoryService.refreshData();
    // carService.refreshData();

    // get metadata from observable to assert with expected metadata values
    const messages = getMessages(carCategoryService.carCategories$);

    // execute observables
    flush();

    // When assertion fails, 'marbleAssert' will display visual / object diff with raw object values for easier debugging.
    marbleAssert(messages).to.equal(expectedObservable);
  });

  it('should return cars from stream', () => {
    const {e, cold, getMessages, flush} = rx;

    // create the expected observable by using marble string
    httpService.getCars.and.returnValue(
      cold('---a', {a: [testCars[0], testCars[1], testCars[2]]})
    );
    const expectedObservable = e('---a', {
      a: [testCars[0], testCars[1], testCars[2]]
    });

    // carCategoryService.refreshData();
    carService.refreshData();

    // get metadata from observable to assert with expected metadata values
    const messages = getMessages(carService.cars$);

    // execute observables
    flush();

    // When assertion fails, 'marbleAssert' will display visual / object diff with raw object values for easier debugging.
    marbleAssert(messages).to.equal(expectedObservable);
  });

  it('should return cars with categories from stream', () => {
    const {e, cold, getMessages, flush} = rx;

    httpService.getCars.and.returnValue(
      cold('---a', {a: [testCars[0], testCars[1], testCars[2]]})
    );

    // create the expected observable by using marble string
    const expectedFinalObservable = e('---a', {
      a: [{...testCars[0], category: 'Sport', totalInThisCategory: 2},
        {...testCars[1], category: 'Sport', totalInThisCategory: 2},
        {...testCars[2], category: 'Vacation', totalInThisCategory: 1}]
    });

    // carCategoryService.refreshData();
    carService.refreshData();

    // get metadata from observable to assert with expected metadata values
    const messages = getMessages(carService.carsWithCategoryAndTotal$);

    // execute observables
    flush();

    // When assertion fails, 'marbleAssert' will display visual / object diff with raw object values for easier debugging.
    marbleAssert(messages).to.equal(expectedFinalObservable);
  });
});
