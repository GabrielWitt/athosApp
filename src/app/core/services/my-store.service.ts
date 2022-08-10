import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class MyStoreService {

  constructor() { }

  async setData(filename:string, data: any){
    try {
      const lockData = JSON.stringify(data);
      await Preferences.set({ key: filename, value: lockData });
      return 'ok'
    } catch (error) {
      console.log(error);
      return 'data not saved';
    }
  }

  async readFile(filename:string){
    try {
      const { value } =  await Preferences.get({ key: filename });
      return JSON.parse(value);
    } catch (error) {
      console.log(error);
      return 'file not found';
    }
  }

  async removeFile(filename:string){
    try {
      await Preferences.remove({ key: filename });
      return 'file removed'
    } catch (error) {
      console.log(error);
      return 'file not found';
    }
  }
}
