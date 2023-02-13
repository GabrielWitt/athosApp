import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent implements OnInit {
  sounds = true;
  vibration = true;
  fontSize = 10;
  
  loading= false;

  constructor(
    public modal: ModalController
  ) { }

  ngOnInit() {}

  changeSettings(event, type){
    console.log(type,event)
    if(type === 'sounds'){this.sounds = event.detail.checked;}
    else{{this.vibration = event.detail.checked;}}
  }

  changeText(evt){
    this.fontSize = evt.detail.value;
  }

  saveConfig(){

  }

}
