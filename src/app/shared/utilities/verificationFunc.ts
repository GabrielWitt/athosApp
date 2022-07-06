import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Keyboard } from '@capacitor/keyboard';

@Injectable({
  providedIn: 'root'
})
export class VerificationFuncService {

  constructor() { }

  async EnterSubmit(evt, form, block){
    if (evt.keyCode === 13 && form.status === 'VALID' && !block){
      if (Capacitor.getPlatform() !== 'web') { Keyboard.hide(); }
      return true;
    }
    return false
  }
}
