import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { Zoom, Navigation, Pagination } from "swiper";

// install Swiper modules
SwiperCore.use([Zoom, Navigation, Pagination]);

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ImagePreviewComponent implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  @Input('img')img: any;
  zoomSetting = false;
 
  constructor(private modalController: ModalController) { }
 
  ngOnInit() { 
    console.log(this.img); 
    console.log(this.slides);
  }
 
  ionViewDidEnter(){
    this.slides.update();
  }
 
  async zoom(zoomIn: boolean, swiperObj) {
    const slider = swiperObj.swiperRef;
    const zoom = slider.zoom;
    this.zoomSetting = zoomIn;
    zoomIn ? zoom.in() : zoom.out();
  }
 
  close() {
    this.modalController.dismiss();
  }
 
}

