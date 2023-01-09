import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  isActivated = false;
  activateSubscription: Subscription;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.activateSubscription = this.userService.activated.subscribe(
      (data: boolean) => {
        this.isActivated = data;
      }
    );
  }

  ngOnDestroy() {
    this.activateSubscription.unsubscribe();
  }
}
