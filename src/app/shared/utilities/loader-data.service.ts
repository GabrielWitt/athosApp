import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderDataService {

  constructor() { }

  loadItems(oldItems: any[], newItems: any[]){
    if(newItems.length < oldItems.length){
      return oldItems.concat(newItems);
    }else{
      return newItems
    }
  }

  loadItemsRefresh(oldItems: any[], newItems: any[]){
    if(newItems.length < oldItems.length){
      return oldItems.concat(newItems);
    }else{
      return newItems
    }
  }
}
