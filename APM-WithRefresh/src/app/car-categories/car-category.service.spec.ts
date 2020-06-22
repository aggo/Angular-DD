import { TestBed } from '@angular/core/testing';
import { CarCategoryService } from './car-category.service';
import { TestScheduler } from 'rxjs/testing';
import * as assert from 'assert';
import { HttpClientModule } from '@angular/common/http';
import { rxSandbox } from 'rx-sandbox';
import { concat, merge } from 'rxjs';
import { expect } from 'chai';
import { marbleAssert } from 'rx-sandbox/dist/src/assert/marbleAssert';
import { filter, map, mapTo, switchMap } from 'rxjs/operators';
import { CarCategoryData } from './car-category-data';


describe('CarCategoryService ', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientModule]}));
  let testScheduler: TestScheduler;
  let rx: any;
  let httpService: any;
  let carCategoryService: CarCategoryService;
  let testData: any;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      // asserting the two objects are equal
      assert.deepEqual(actual, expected);
    });

    testData = CarCategoryData.categories;

    rx = rxSandbox.create();
    const {cold, hot} = rx;
    httpService = jasmine.createSpyObj('MyHttpService', [
      'getCategories'
    ]);

    httpService.getCategories.and.returnValue(
      cold('---a---b', {a: testData[0], b: testData[1]})
    );

    carCategoryService = new CarCategoryService(httpService);
  });

  it('should return categories from stream', () => {
    const {e, getMessages, flush} = rx;

    // create the expected observable by using marble string
    const expectedObservable = e('---a---b', {
      a: testData[0], b: testData[1]
    });

    carCategoryService.refreshData();

    // get metadata from observable to assert with expected metadata values
    const messages = getMessages(carCategoryService.carCategories$);

    // execute observables
    flush();

    // When assertion fails, 'marbleAssert' will display visual / object diff with raw object values for easier debugging.
    marbleAssert(messages).to.equal(expectedObservable);
  });

  it('test merge', () => {
    const {hot, cold, flush, getMessages, e, s} = rxSandbox.create();
    const e1 = hot('    ---a--b--|');
    const e2 = cold('   ---x--y--|', {x: 1, y: 2});

    const expected = e('---(ax)--(by)--|', {x: 1, y: 2});

    const messages = getMessages(merge(e1, e2));

    flush();

    marbleAssert(messages).to.equal(expected);
  });

  it('test concat', () => {
    const {hot, cold, flush, getMessages, e, s} = rxSandbox.create();
    const e1 = hot('    ---a--b--|');
    const e2 = cold('   ---x--y--|', {x: 1, y: 2});

    const expected = e('---a--b-----x--y--|', {x: 1, y: 2}); // they arrive in order

    const messages = getMessages(concat(e1, e2));

    flush();

    marbleAssert(messages).to.equal(expected);
  });

  it('test filter', () => {
    const {hot, cold, flush, getMessages, e, s} = rxSandbox.create();
    const e1 = hot('    ---a--b--|');
    const e2 = cold('   ---x--y--|', {x: 1, y: 2});

    const expected = e('------y--|', {y: 2}); // they arrive in order

    const messages = getMessages(e2.pipe(filter(v => v > 1)));

    flush();

    marbleAssert(messages).to.equal(expected);
  });

  it('test map', () => {
    const {hot, cold, flush, getMessages, e, s} = rxSandbox.create();
    const e1 = hot('    ---a--b--|', {a: 1, b: 2});
    const e2 = cold('   ---x--y--|', {x: 3, y: 4});

    const expected = e('---a--b-----x--y--|', {a: 10, b: 20, x: 30, y: 40}); // they arrive in order

    const messages = getMessages(concat(e1, e2).pipe(map(v => v * 10)));

    flush();

    marbleAssert(messages).to.equal(expected);
  });

  // todo
  xit('test switchmap', () => {
    const {hot, cold, flush, getMessages, e, s} = rxSandbox.create();
    const e1 = hot('    ---a--b--|');
    const e2 = cold('   ---x--y--|', {x: 1, y: 2});

    const expected = e('---------1--2--|', {x: 1, y: 2});

    const messages = getMessages(e1.pipe(switchMap((value) => e2)));

    flush();

    marbleAssert(messages).to.equal(expected);
  });

  it('service test', () => {
    const {hot, cold, flush, getMessages, e, s} = rxSandbox.create();

    const e1 = hot('    --a--b--c|');
    const expected = e('--x--x--x|');
    const subs = s(`    ^       !`);
    const messages = getMessages(e1.pipe(mapTo('x')));

    console.log(messages);
    expect(messages).to.be.empty;

    flush();

    // now values are available
    marbleAssert(messages).to.equal(expected);
    // subscriptions are also available too
    // expect(e1.subscriptions).to.deep.equal(subs);
  });


});
