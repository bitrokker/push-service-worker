import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {SwPush} from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  private readonly VAPID_PUBLIC_KEY =
    'BCEGrrF1VSHHkJAKVVkTVrWBEr7Be670xmAOHBcsV6beobw_fuURkTc6HltO0m0QYiIXZB4gpeFqQl_ZLQ2T2og';

  constructor(
    private swPush: SwPush,
    private http: HttpClient
  ) { }

  subscribeToNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(subscription => {
        console.log('Subscribed to notifications', subscription);
        // Sende das Abonnement an deinen Server
        this.http.post('http://localhost:3000/api/subscribe', subscription).subscribe();
      })
      .catch(err => console.error('Could not subscribe to notifications', err));
  }
}
