import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, interval, map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;

  constructor() {}

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe((count) => {
    //   console.log(count);
    // });
    const customIntervalObserable = Observable.create((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 2) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('count is greater than 3'));
        }
        count++;
      }, 1000);
    });

    // customIntervalObserable.pipe(
    //   map((data) => {
    //     return 'Round ' + data;
    //   })
    // );

    this.firstObsSubscription = customIntervalObserable
      .pipe(
        filter((data) => {
          return data > 0;
        }),
        map((data) => {
          return 'Round ' + data;
        })
      )
      .subscribe(
        (data) => console.log(data),
        (error) => {
          console.log(error);
        },
        () => {
          console.log('Subscription completed');
        }
      );
  }

  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }
}
