import { Component, OnInit } from '@angular/core';
import { UserFormData } from 'src/app/core/models/user';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { FireAuthService } from 'src/app/core/services/modules/fire-auth.service';
import { ReservationsService } from 'src/app/core/services/modules/reservations.service';
import { NewServiceComponent } from 'src/app/shared/components/services/new-service/new-service.component';
import { Service } from 'src/app/core/models/services';
import { MaintenanceService } from 'src/app/core/services/modules/maintenance.service';
import { VerificationFuncService } from 'src/app/shared/utilities/verificationFunc';

@Component({
  selector: 'app-services-admin',
  templateUrl: './services-admin.component.html',
  styleUrls: ['./services-admin.component.scss'],
})
export class ServicesAdminComponent implements OnInit  {
  loading = true;
  itemList = []
  user: UserFormData;
  filterSelected: '>'|'<' = '>'

  servicesList = [
    {title:'Inodoro corriendo', type: 'Plomería'},
    {title:'Desagües obstruidos', type: 'Plomería'},
    {title:'Tuberías oxidadas', type: 'Plomería'},
    {title:'Tuberías con fugas', type: 'Plomería'},
    {title:'Reparaciones de pintura', type: 'Plomería'},
    {title:'Re/Cableado Eléctrico', type: 'Eléctrico'},
    {title:'Reparación Eléctrica', type: 'Eléctrico'},
    {title:'Instalación de Piezas Eléctricas', type: 'Eléctrico'},
    {title:'Mantenimiento/Inpección de Piezas Eléctricas', type: 'Eléctrico'},
    {title:'Reparación/Mantenimiento de Artefactos con motor', type: 'Eléctrico'},
    {title:'Cambio de Paneles de yeso', type: 'Muebles / Construcción'},
    {title:'Reparar Concreto Agrietado', type: 'Muebles / Construcción'},
    {title:'Diseño/Colocación de Ambiente navideño', type: 'Limpieza / Jardineria'},
    {title:'Retiro de Ambiente Navideño', type: 'Limpieza / Jardineria'},
    {title:'Limpieza de Espacio', type: 'Limpieza / Jardineria'},
    {title:'Limpieza Profunda Anual', type: 'Limpieza / Jardineria'},
    {title:'Cuidado de Macetas', type: 'Limpieza / Jardineria'},
    {title:'Poda de Arbustos y Plantas Ornamentales', type: 'Limpieza / Jardineria'},
    {title:'Abonar las plantas', type: 'Limpieza / Jardineria'},
    {title:'Reemplazar Ventana', type: 'Limpieza / Jardineria'}
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
    this.itemList = await this.services.readServicesListOrder('MD61xvWSecqNMYYjvEoM',false);
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

  async editService(service){
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
