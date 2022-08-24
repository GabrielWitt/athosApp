import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Keyboard } from '@capacitor/keyboard';
import { ShortSpace, Space } from 'src/app/core/models/spaces';
import { ShortUser, UserFormData } from 'src/app/core/models/user';

@Injectable({
  providedIn: 'root'
})
export class VerificationFuncService {

  constructor( ) { }

  aleatorio(a,b) {
    const newNumber = Math.round(Math.random()*(b-a)+parseInt(a));
    return newNumber < 10 ? '0'+newNumber :''+newNumber
  }

  sortByType( a, b ) {
    if ( a.type < b.type ){
      return -1;
    }
    if ( a.type > b.type ){
      return 1;
    }
    return 0;
  }

  async EnterSubmit(evt, form, block){
    if (evt.keyCode === 13 && form.status === 'VALID' && !block){
      if (Capacitor.getPlatform() !== 'web') { Keyboard.hide(); }
      return true;
    }
    return false
  }

  async createShortUser(user: UserFormData): Promise<ShortUser>{
    const short: ShortUser = {
      uid: user.uid,
      photo: user.photo?user.photo:'',
      email: user.email,
      name: user.name + ' ' + user.lastName
    }
    return short;
  }

  async createShortSpace(space: Space): Promise<ShortSpace>{
    const short: ShortSpace = {
      uid: space.uid,
      unitNumber: space.unitNumber,
      communityUID: space.communityUID,
      description: space.description,
      floor: space.floor,
      type: space.type,
      photo: space.photo,
    }
    return short;
  }
  
}
