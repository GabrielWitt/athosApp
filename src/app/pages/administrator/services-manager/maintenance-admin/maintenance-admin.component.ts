import { Component, OnInit } from '@angular/core';
import { UserFormData } from 'src/app/core/models/user';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { FireAuthService } from 'src/app/core/services/modules/fire-auth.service';
import { NewServiceComponent } from 'src/app/shared/components/services/new-service/new-service.component';
import { Service } from 'src/app/core/models/services';
import { MaintenanceService } from 'src/app/core/services/modules/maintenance.service';
import { VerificationFuncService } from 'src/app/shared/utilities/verificationFunc';

@Component({
  selector: 'app-maintenance-admin',
  templateUrl: './maintenance-admin.component.html',
  styleUrls: ['./maintenance-admin.component.scss'],
})
export class MaintenanceAdminComponent implements OnInit  {
  loading = true;
  itemList = []
  user: UserFormData;
  filterSelected: '>'|'<' = '>'

  servicesList = [
    {title:'Inpeccionar Tuberias', type: 'Plomería'},
    {title:'Inpeccionar Muros Húmedos', type: 'Plomería'},
    {title:'Inpeccionar Cableado', type: 'Eléctrico'},
    {title:'Inpeccionar Iluminación', type: 'Eléctrico'},
    {title:'Inpeccionar Dispositivo', type: 'Eléctrico'},
    {title:'Inpeccionar Ventana', type: 'Limpieza / Jardineria'},
    {title:'Inpeccionar Paneles de yeso', type: 'Muebles / Construcción'},
    {title:'Inpeccionar Concreto Agrietado', type: 'Muebles / Construcción'},
    {title:'Inpeccionar Area Dañada', type: 'Muebles / Construcción'},
    {title:'Inpeccionar Plantas', type: 'Limpieza / Jardineria'},
    {title:'Inpeccionar Area Sucia', type: 'Limpieza / Jardineria'},
    {title:'Limpieza de Espacio Comunal', type: 'Limpieza / Jardineria'},
  ]
  typeList = this.services.typeList;

  filterItems = [
    {name: 'Mantenimientos',filter: '>'},
    {name: 'Servicios',filter: '<'}
  ]

  constructor(
    private modal: ModalController,
    private auth: FireAuthService,
    private services: MaintenanceService,
    private routerOutlet: IonRouterOutlet,
    private utility: VerificationFuncService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.loadData().then(user => {
      this.loading = false;
    })
  }

  async loadData() {
    const userData:any = await this.auth.getUser();
    this.itemList = await this.services.readServicesListOrder('MD61xvWSecqNMYYjvEoM',true);
    console.log(this.itemList)
    this.user = userData.data;
    return this.user
  }

  filterChange(e){
    this.filterSelected = e.detail.value;
    this.loadData();
  }

  async doRefresh(refresh?){
    // load 
    await this.loadData();
    if (refresh){ refresh.target.complete(); }
  }

  requestService(service){}

  async createService(service){
    const modalService = await this.modal.create({
      component: NewServiceComponent,
      componentProps: {service, user: this.user },
      mode: 'ios',
      presentingElement: this.routerOutlet.nativeEl
    });
    modalService.present();
    const modalResult1 = await modalService.onWillDismiss();
    if(modalResult1.data){}
  }
} 
