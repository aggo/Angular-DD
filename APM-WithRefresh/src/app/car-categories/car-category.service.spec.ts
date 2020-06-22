import { TestBed } from '@angular/core/testing';
import { CarCategoryService } from './car-category.service';
import { TestScheduler } from 'rxjs/testing';
import * as assert from 'assert';
import { HttpClientModule } from '@angular/common/http';
import { rxSandbox } from 'rx-sandbox';
import { merge } from 'rxjs';
import { expect } from 'chai';
import { marbleAssert } from 'rx-sandbox/dist/src/assert/marbleAssert';
import { mapTo } from 'rxjs/operators';
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
      hot('a', {a: testData})
    );

    carCategoryService = new CarCategoryService(null, httpService);
  });

  it('should return news from stream', () => {
    const {e, getMessages, flush} = rx;

    // create the expected observable by using marble string
    const expectedObservable = e('a', {
      a: testData
    });

    carCategoryService.refreshData();

    // get metadata from observable to assert with expected metadata values
    const messages = getMessages(carCategoryService.carCategories$);

    // execute observables
    flush();

    // When assertion fails, 'marbleAssert' will display visual / object diff with raw object values for easier debugging.
    marbleAssert(messages).to.equal(expectedObservable);
  });

  //
  // it('should test car categories', () => {
  //   const service: CarCategoryService = TestBed.get(CarCategoryService);
  //
  //   testScheduler.run(({hot, cold, expectObservable}) => {
  //     const action$ = hot('-a-a', {
  //       a: {type: 'FETCH_USER', id: '123'}
  //     });
  //     const dependencies = {
  //       getJSON: url => cold('--a', {
  //         a: {url}
  //       })
  //     };
  //
  //     const output$ = service.carCategories$;
  //
  //     service.refreshData();
  //
  //     const subs = output$.subscribe((result) => {
  //       console.log(result);
  //     }, (err) => {
  //       console.log(err);
  //     });
  //     subs.unsubscribe();
  //
  //     // expectObservable(output$).toBe('1');
  //   });
  // });
  xit('testcase', () => {
    const {hot, cold, flush, getMessages, e, s} = rxSandbox.create();
    const e1 = hot('  --^--a--b--|');
    const e2 = cold('   ---x--y--|', {x: 1, y: 2});

    const expected = e('       ---q--r--|');
    const sub = s('       ^        !');

    const messages = getMessages(merge(e1, e2));

    flush();

    //assertion

    marbleAssert(messages).to.equal(expected);
    expect(e1.subscriptions).to.deep.equal(sub);
  });

  xit('testcase', () => {
    const {hot, cold, flush, getMessages, e, s} = rxSandbox.create();
    const e1 = hot('    --^--a--b--|');
    const e2 = cold('   ---x--y--|', {x: 1, y: 2});

    const expected = e('       ---q--r--|');
    const sub = s('       ^        !');

    const messages = getMessages(merge(e1, e2));

    flush();

    //assertion

    marbleAssert(messages).to.equal(expected);
    expect(e1.subscriptions).to.deep.equal(sub);
  });

  it('testcase2', () => {
    const {hot, cold, flush, getMessages, e, s} = rxSandbox.create();

    const e1 = hot('    --a--b--c|');
    const expected = e('--x--x--x|');
    const subs = s(`    ^       !`);
    const messages = getMessages(e1.pipe(mapTo('x')));

    console.log(messages);
    expect(messages).to.be.empty;

    flush();

    //now values are available
    marbleAssert(messages).to.equal(expected);
    //subscriptions are also available too
    // expect(e1.subscriptions).to.deep.equal(subs);
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

    //now values are available
    marbleAssert(messages).to.equal(expected);
    //subscriptions are also available too
    // expect(e1.subscriptions).to.deep.equal(subs);
  });


});
