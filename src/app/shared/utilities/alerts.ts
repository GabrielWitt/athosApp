import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HapticsService } from './haptics.service';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(
    private alertController: AlertController,
    private vibe: HapticsService
  ) { }

  async showAlert( title: string, message: string, buttonOk?): Promise<any> {
    const button = buttonOk ? [buttonOk] : ['OK'];
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: title,
      message,
      buttons: button,
      mode: 'ios'
    });
    this.vibe.vibrate();
    await alert.present();
    await alert.onDidDismiss();
    return ;
  }

  async AlertConfirm( title: string, message: string, yes?:'', no?: string) {
    let answer = false;
    const alertConfirm = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: title,
      message,
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            answer = false;
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            answer = true;
          }
        }
      ]
    });
    await alertConfirm.present();
    await alertConfirm.onDidDismiss();
    this.vibe.mediumVibe();
    return answer;
  }
  
} 