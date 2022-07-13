import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AttachmentsService } from 'src/app/shared/utilities/attachments.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.page.html',
  styleUrls: ['./manager.page.scss'],
})
export class ManagerPage implements OnInit {

  constructor(
    private router: Router,
    private images: AttachmentsService,
  ) { }

  ngOnInit() {
  }

  async checkSavedImages(){
    this.images.loadSaved().then((photos: any) => {
      if(photos.length){ setTimeout(() => {
          this.router.navigateByUrl(photos[0].route.substring(1)); 
        }, 1500);
      }else{
        this.router.navigateByUrl('/manager/home');
      }
    }).catch(e => {
      console.log(e);
      this.router.navigateByUrl('/manager/home');
    })
  }

}
