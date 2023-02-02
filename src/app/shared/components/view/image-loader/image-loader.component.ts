import { Component, Input, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { UserFormData } from 'src/app/core/models/user';

@Component({
  selector: 'app-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.scss'],
})
export class ImageLoaderComponent implements OnInit {
  @Input() notice: any;
  @Input() user: UserFormData;
  platform;

  backgroundImg = '../../../../../assets/Athos.png'

  constructor() { }

  ngOnInit(){
    this.platform = Capacitor.getPlatform();
    console.log(this.platform);
  }

}
