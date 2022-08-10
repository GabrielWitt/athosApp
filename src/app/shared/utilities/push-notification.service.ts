import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { ActionPerformed, PushNotificationSchema, PushNotifications, Token } from '@capacitor/push-notifications';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor(

  ) { }

  registerPushService(): Promise<string>{
    return new Promise((resolve, reject) => {
      if (Capacitor.getPlatform() !== 'web') {
        PushNotifications.requestPermissions().then( async result => {
          if (result.receive === 'granted') { PushNotifications.register(); }
          else { 
            console.log('Notifications off')
            resolve(null); 
          }
        });

        PushNotifications.addListener('registration', (token: Token) => {
            console.log('Token: '+ token.value)
            resolve(token.value);
          }
        );

        PushNotifications.addListener('registrationError', (error: any) => { 
          console.log(JSON.stringify(error))
          resolve(null); 
        });
      } else {
        console.log('web')
        resolve(null);
      }
    });
  }

  async notificationFunctions(){
    if (Capacitor.getPlatform() !== 'web') {
      PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
        console.log('Notification: ' + JSON.stringify(notification))
        alert('Notification: ' + JSON.stringify(notification))
      });

      PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
        this.cleanNotifications();
        console.log('pushNotificationRoutingDecision')
      });

      LocalNotifications.addListener('localNotificationReceived', (notification) => {
        console.log('Notification: ' + JSON.stringify(notification))
        alert('Notification: ' + JSON.stringify(notification))
        console.log('pushNotificationRoutingDecision');
      });

      LocalNotifications.addListener('localNotificationActionPerformed', (notification) => {
        this.cleanNotifications();
        console.log('pushNotificationRoutingDecision');
      });
    }
  }

  cleanNotifications(){
    if (Capacitor.getPlatform() !== 'web') {
      PushNotifications.removeAllDeliveredNotifications();
    }
  }
}
