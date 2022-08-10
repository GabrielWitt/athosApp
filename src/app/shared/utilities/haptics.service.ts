import { Injectable } from '@angular/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

@Injectable({
  providedIn: 'root'
})
export class HapticsService {

  constructor() { }

  async lightVibe(){
    await Haptics.impact({ style: ImpactStyle.Light });
  }

  async mediumVibe(){
    await Haptics.impact({ style: ImpactStyle.Medium });
  }

  async vibrate(){
    await Haptics.vibrate();
  }

  async startAction(){
    await Haptics.impact({ style: ImpactStyle.Medium });
  }

  async changeAction(){
    await Haptics.selectionChanged();
  }

  async endAction(){
    await Haptics.selectionEnd();
  }
}