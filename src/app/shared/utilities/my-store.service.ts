import { Injectable } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class MyStoreService {

  constructor(private nativeStorage: NativeStorage) { }

  async setData(filename:string, data: any){
    try {
      const lockData = JSON.stringify(data);
      if(Capacitor.getPlatform() !== 'web'){ await this.nativeStorage.setItem(filename,{ value: lockData }); } 
      else { await Preferences.set({ key: filename, value: lockData }); }
      return 'ok'
    } catch (error) {
      console.log(error);
      return 'data not saved';
    }
  }

  async readFile(filename:string){
    try {
      if(Capacitor.getPlatform() !== 'web'){ 
        const saveData =  await this.nativeStorage.getItem(filename);
        return JSON.parse(saveData.value);
      } else {
        const { value } =  await Preferences.get({ key: filename });
        return JSON.parse(value);
      }
    } catch (error) {
      console.log(error);
      return 'file not found';
    }
  }

  async removeFile(filename:string){
    try {
      if(Capacitor.getPlatform() !== 'web'){ await this.nativeStorage.remove(filename); }
      else{ await Preferences.remove({ key: filename }); }
      return 'file removed'
    } catch (error) {
      console.log(error);
      return 'file not found';
    }
  }
}