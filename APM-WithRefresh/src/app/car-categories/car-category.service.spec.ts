import { TestBed } from '@angular/core/testing';
import { CarCategoryService } from './car-category.service';
import { TestScheduler } from 'rxjs/testing';
import * as assert from 'assert';
import { HttpClientModule } from '@angular/common/http';
import { rxSandbox } from 'rx-sandbox';
import { combineLatest, concat, forkJoin, merge, of } from 'rxjs';
import { marbleAssert } from 'rx-sandbox/dist/src/assert/marbleAssert';
import { catchError, concatMap, filter, map, mergeMap, startWith, switchMap, withLatestFrom } from 'rxjs/operators';
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
    const {cold} = rx;
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

  // tests for generic functions

  it('test merge', () => {
    const {hot, cold, flush, getMessages, e} = rxSandbox.create();
    const e1 = hot('    ---a--b--|');
    const e2 = cold('   ---x--y--|', {x: 1, y: 2});

    const expected = e('---(ax)--(by)--|', {x: 1, y: 2});

    const messages = getMessages(merge(e1, e2));

    flush();

    marbleAssert(messages).to.equal(expected);
  });

  it('test merge both hot', () => {
    const {cold, flush, getMessages, e} = rxSandbox.create();
    const e1 = cold('    ---a--b--|');
    const e2 = cold('   ---x--y--|', {x: 1, y: 2});

    const expected = e('---(ax)--(by)--|', {x: 1, y: 2});

    const messages = getMessages(merge(e1, e2));

    flush();

    marbleAssert(messages).to.equal(expected);
  });

  it('test concat', () => {
    const {hot, cold, flush, getMessages, e} = rxSandbox.create();
    const e1 = hot('    ---a--b--|');
    const e2 = cold('   ---x--y--|', {x: 1, y: 2});

    const expected = e('---a--b-----x--y--|', {x: 1, y: 2}); // they arrive in order

    const messages = getMessages(concat(e1, e2));

    flush();

    marbleAssert(messages).to.equal(expected);
  });

  it('test filter', () => {
    const {cold, flush, getMessages, e} = rxSandbox.create();
    const e1 = cold('   ---x--y--|', {x: 1, y: 2});

    const expected = e('------y--|', {y: 2}); // they arrive in order

    const messages = getMessages(e1.pipe(filter(v => v > 1)));

    flush();

    marbleAssert(messages).to.equal(expected);
  });

  it('test map', () => {
    const {hot, cold, flush, getMessages, e} = rxSandbox.create();
    const e1 = hot('    ---a--b--|', {a: 1, b: 2});
    const e2 = cold('   ---x--y--|', {x: 3, y: 4});

    const expected = e('---a--b-----x--y--|', {a: 10, b: 20, x: 30, y: 40}); // they arrive in order

    const messages = getMessages(concat(e1, e2).pipe(map(v => v * 10)));

    flush();

    marbleAssert(messages).to.equal(expected);
  });

  it('test concatMap', () => {
    const {hot, cold, flush, getMessages, e} = rxSandbox.create();
    const e1 = hot(' ---a--b---|');
    const e2 = cold('---c--d---|');
    const result = e1.pipe(concatMap(() => e2));

    const expected = e('------c--d------c--d---|');

    const messages = getMessages(result);

    flush();
    marbleAssert(messages).to.equal(expected);
  });

  it('test concatMap simpler', () => {
    const {hot, cold, flush, getMessages, e} = rxSandbox.create();
    const e1 = hot('ab|', {a: 0, b: 1});
    const e2 = cold('---c|');

    const result = e1.pipe(concatMap(() => e2));
    const expected = e('---c---c|');

    const messages = getMessages(result);
    flush();
    marbleAssert(messages).to.equal(expected);
  });

  it('test concatMap without complete', () => {
    const {hot, cold, flush, getMessages, e} = rxSandbox.create();
    const e1 = hot('ab|', {a: 0, b: 1});
    const e2 = cold('---c|');
    const e3 = cold('---d|');
    const es = [e2, e3];

    const result = e1.pipe(concatMap((val) => es[val]));
    const expected = e('---c---d|');

    const messages = getMessages(result);
    flush();
    marbleAssert(messages).to.equal(expected);
  });

  it('test mergeMap without complete', () => {
    const {hot, cold, flush, getMessages, e} = rxSandbox.create();
    const e1 = hot('ab|');
    const e2 = cold('---c|');
    const result = e1.pipe(mergeMap(() => e2));
    const expected = e('---cc|');

    const messages = getMessages(result);
    flush();
    marbleAssert(messages).to.equal(expected);
  });

  it('test mergemap with 2', () => {
    const {hot, cold, flush, getMessages, e} = rxSandbox.create();
    const e1 = hot('ab|', {a: 0, b: 1});
    const e2 = cold('---c|');
    const e3 = cold('---d|');
    const es = [e2, e3];

    const result = e1.pipe(mergeMap((val) => es[val]));
    const expected = e('---cd|');

    const messages = getMessages(result);

    flush();
    marbleAssert(messages).to.equal(expected);
  });

  it('test switchMap without complete', () => {
    const {hot, cold, flush, getMessages, e} = rxSandbox.create();
    const e1 = hot('ab|');
    const e2 = cold('---c|');
    const result = e1.pipe(switchMap(() => e2));
    const expected = e('----c|');

    const messages = getMessages(result);
    flush();
    marbleAssert(messages).to.equal(expected);
  });

  it('test switchmap with 2 hot', () => {
    const {hot, flush, getMessages, e} = rxSandbox.create();
    const e1 = hot('ab|', {a: 0, b: 1});
    const e2 = hot('---c|');
    const e3 = hot('---d|');
    const es = [e2, e3];

    const result = e1.pipe(switchMap((val) => es[val]));
    const expected = e('---d|');

    const messages = getMessages(result);

    flush();
    marbleAssert(messages).to.equal(expected);
  });

  it('test switchmap with 2 cold', () => {
    const {hot, cold, flush, getMessages, e} = rxSandbox.create();
    const e1 = hot('ab|', {a: 0, b: 1});
    const e2 = cold('---c|');
    const e3 = cold('---d|');
    const es = [e2, e3];

    const result = e1.pipe(switchMap((val) => es[val]));
    const expected = e('----d|');

    const messages = getMessages(result);
    flush();
    marbleAssert(messages).to.equal(expected);
  });

  it('test concatMap2', () => {
    const {hot, cold, flush, getMessages, e} = rxSandbox.create();
    const v1 = hot('--a--b--|');
    const v2 = cold('--1--2--|');

    const value = v1.pipe(concatMap(() => v2));

    const expected = e('----1--2----1--2--|');

    const messages = getMessages(value);

    flush();

    marbleAssert(messages).to.equal(expected);
  });

  it('test combineLatest', () => {
    const {hot, flush, getMessages, e} = rxSandbox.create();

    const e1 = hot('-a---b|', {a: 1, b: 2});
    const e2 = hot('---c--|', {c: 10});

    const result = combineLatest([e1, e2]).pipe(map((a) => {
      return a[0] + a[1];
    }));

    const expected = e('---d-e|', {d: 11, e: 12});

    const messages = getMessages(result);

    flush();

    marbleAssert(messages).to.equal(expected);
  });

  it('test forkJoin', () => {
    const {hot, cold, flush, getMessages, e} = rxSandbox.create();

    const e1 = cold('-a---b--|', {a: 1, b: 2});
    const e2 = cold('---c--d-|', {c: 10, d: 20});

    const result = forkJoin([e1, e2]);

    const expected = e('--------(a|)', {a: [2, 20]});

    const messages = getMessages<number[]>(result);

    flush();

    marbleAssert(messages).to.equal(expected);
  });


  it('test combineLatest with error and no mapping', () => {
    const {hot, flush, getMessages, e} = rxSandbox.create();

    const e1 = hot('-a---#-b|', {a: 1, b: 2});
    const e2 = hot('---c---d|', {c: 10, d: 20});

    const result = combineLatest([e1, e2]);

    const expected = e('---r-#', {r: [1, 10]});
    const messages = getMessages<number[]>(result);

    flush();

    marbleAssert(messages).to.equal(expected);
  });

  it('test withLatestFrom', () => {
    const {hot, flush, getMessages, e} = rxSandbox.create();

    const e1 = hot('-a---b--|', {a: 1, b: 2});
    const e2 = hot('---c---d|', {c: 10, d: 20});

    const result = e1.pipe(withLatestFrom(e2),
      map((res => res[0] + res[1])));

    const expected = e('-----r--|', {r: 12});

    const messages = getMessages(result);

    flush();

    marbleAssert(messages).to.equal(expected);
  });

  it('test page filter', () => {
    const {hot, flush, getMessages, e} = rxSandbox.create();

    const page = hot('--p---q--|', {p: 'page1', q: 'page2'});
    const flt = hot(' ----f---g|', {f: 'f1', g: 'f2'});

    const result = combineLatest([
      page.pipe(startWith('page0')),
      flt.pipe(startWith(''))])
      .pipe(map(p => {
        return p;
      }));

    const expected = e('a-b-c-d-e|', {
      a: ['page0', ''],
      b: ['page1', ''],
      c: ['page1', 'f1'],
      d: ['page2', 'f1'],
      e: ['page2', 'f2']
    });

    const messages = getMessages<string[]>(result);

    flush();

    marbleAssert(messages).to.equal(expected);
  });

  it('test combineLatest with error handling', () => {
    const {hot, flush, getMessages, e} = rxSandbox.create();

    const e1 = hot('-a---#-b-|', {a: 1, b: 2});
    const e2 = hot('---c---d-|', {c: 10, d: 20});

    const result = combineLatest([e1, e2]).pipe(map((a) => {
        return a[0] + a[1];
      }),
      catchError((err, caught) => {
        console.error(err);
        return of(null);
      }));

    const expected = e('---r-(q|)', {r: 11, q: null});

    const messages = getMessages(result);

    flush();

    marbleAssert(messages).to.equal(expected);
  });

  it('test hot and cold with merge', () => {
    const {hot, cold, flush, getMessages, e} = rxSandbox.create();

    const page = hot('abcdef|');
    const flt = cold('ghijkl');

    const result = merge(page, flt);

    const expected = e('(ag)(bh)(ci)(dj)(ek)(fl)');

    const messages = getMessages(result);

    flush();

    marbleAssert(messages).to.equal(expected);
  });
});
