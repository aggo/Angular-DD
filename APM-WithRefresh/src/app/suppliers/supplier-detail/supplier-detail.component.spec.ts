import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestScheduler } from 'rxjs/testing';


import { SupplierDetailComponent } from './supplier-detail.component';
import * as assert from 'assert';
import { HttpClientModule } from '@angular/common/http';

describe('PmSupplierDetailComponent', () => {
  let component: SupplierDetailComponent;
  let fixture: ComponentFixture<SupplierDetailComponent>;
  let testScheduler: TestScheduler;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierDetailComponent],
      imports: [HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    testScheduler = new TestScheduler((actual, expected) => {
      // asserting the two objects are equal
      assert.deepEqual(actual, expected);
    });
  });

  it('should run the hot observable test', () => {
    testScheduler.run(({hot, expectObservable}) => {
      const source = hot('--a--a--a--a--a--a--a--');
      const sub1 = '      --^----------!';
      const sub2 = '      ---------^--------!';
      const expect1 = '   --a--a--a--a--';
      const expect2 = '   -----------a--a--a-';
      expectObservable(source, sub1).toBe(expect1);
      expectObservable(source, sub2).toBe(expect2);
    });
  });

  it('should run the 2nd hot observable test', () => {
    testScheduler.run(({hot, expectObservable}) => {
      const source = hot('a-a--a--a--a--a--a--a--');
      const sub1 = '      --^----------!';
      const sub2 = '      ---------^--------!';
      const expect1 = '   --a--a--a--a--';
      const expect2 = '   -----------a--a--a-';
      expectObservable(source, sub1).toBe(expect1);
      expectObservable(source, sub2).toBe(expect2);
    });
  });

  // it('should run the cold observable test', () => {
  //   testScheduler.run(({hot, cold, expectObservable}) => {
  //     const source = cold('--a--a--a--a--a--a--a--');
  //     const sub1 = '      --^----------!';
  //     const sub2 = '      ---------^--------!';
  //     const expect1 = '   --a--a--a--a--';
  //     const expect2 = '   -----------a--a--a-';
  //     expectObservable(source, sub1).toBe(expect1);
  //     expectObservable(source, sub2).toBe(expect2);
  //   });
  // });
  //
  // it('should test subscriptions', () => {
  //   testScheduler.run(({hot, cold, expectObservable}) => {
  //     const x = cold(        '--a---b---c--|');
  //     const xsubs =    '------^-------!';
  //     const y = cold(                '---d--e---f---|');
  //     const ysubs =    '--------------^-------------!';
  //     const e1 = hot(  '------x-------y------|', { x: x, y: y });
  //     const expected = '--------a---b----d--e---f---|';
  //
  //     expectObservable(e1.switch()).toBe(expected);
  //     expectSubscriptions(x.subscriptions).toBe(xsubs);
  //     expectSubscriptions(y.subscriptions).toBe(ysubs);
  //   });
  // });

  // it('Should properly merge and exclude earthquakes with magnitude 0', () => {
  //   const testScheduler2 = new TestScheduler(assert.deepEqual.bind(assert));
  //   const quakeMarbles1 = '--b---c--e';
  //   const quakeMarbles2 = 'a------d--';
  //
  //   const quake1$ = testScheduler.createHotObservable(quakeMarbles1);
  //   const quake2$ = testScheduler.createHotObservable(quakeMarbles2);
  //
  //   const expectedValues = {
  //     a: {richterScale: 2.6},
  //     b: {richterScale: 3.4},
  //     c: {richterScale: 1.3},
  //     d: {richterScale: 0},
  //     e: {richterScale: 6.2},
  //   };
  //
  //   const expected = 'a-b---c--f';
  //
  //   const mergedQuakes$ = merge(quake1$, quake2$)
  //     .pipe(filter((q: any) => q.richterScale && q.richterScale > 0));
  //
  //   testScheduler2.expectObservable(mergedQuakes$).toBe(expected, expectedValues);
  // });
  //
  // const fetchUserEpic = (action$, {getJSON}) => action$.pipe(
  //   mergeMap(action =>
  //     getJSON(`https://api.github.com/users/${action.id}`).pipe(
  //       map(response => ({type: 'FETCH_USER_FULFILLED', response}))
  //     )
  //   )
  // );
  //
  // it('should test the fetch user epic', () => {
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
  //     const output$ = fetchUserEpic(action$, dependencies);
  //
  //     expectObservable(output$).toBe('---a', {
  //       a: {
  //         type: 'FETCH_USER_FULFILLED',
  //         response: {
  //           url: 'https://api.github.com/users/123'
  //         }
  //       }
  //     });
  //   });
  // });

});
