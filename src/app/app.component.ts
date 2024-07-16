import {Component, OnInit} from '@angular/core';
import {PushNotificationService} from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private pushNotificationService: PushNotificationService
  ) { }

  ngOnInit() {
    this.pushNotificationService.subscribeToNotifications();
  }
}
