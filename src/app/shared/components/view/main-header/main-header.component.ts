import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { UserController } from 'src/app/core/controller/user.controller';
import { UserFormData } from 'src/app/core/models/user';
import { FireAuthService } from 'src/app/core/services/modules/fire-auth.service';
import { AlertsService } from 'src/app/shared/utilities/alerts';
import { NewNoticeComponent } from '../../new-notice/new-notice.component';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  loading = false;
  @Input() title: string;
  @Input() rightButton: any;
  user: UserFormData;

  constructor(
    public userCtrl: UserController,
    private router: Router,
    private modal: ModalController,
    private alerts: AlertsService,
    private auth: FireAuthService,
    private routerOutlet: IonRouterOutlet,
  ) { }

  ngOnInit() { }

  cerrarSesion(){
    this.loading = true;
    this.alerts.AlertConfirm('','¿Seguro que desea salir de su sesión?').then(answer => {
      if(answer){
        this.auth.signOut().then(done => {
          this.loading = false;
          this.router.navigateByUrl('general/login');
        });
      }else{
        this.loading = false;
      }
    })
  }

  async createNotice(){
    const userData:any = await this.auth.getUser();
    const modal = await this.modal.create({
      component: NewNoticeComponent,
      componentProps: {notice: null, user: userData.data, pet: null},
      mode: 'ios',
      presentingElement: this.routerOutlet.nativeEl
    });
    modal.present();
    const modalResult = await modal.onWillDismiss();
    this.rightButton(modalResult.data);
  }

  goProfile(){
    this.router.navigateByUrl('administrator/profile')
  }

  goBack(){
    this.router.navigateByUrl('administrator/users')
  }

}
