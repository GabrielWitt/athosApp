import { Component, OnInit } from '@angular/core';
import { UserFormData } from 'src/app/core/models/user';
import { AlertsService } from 'src/app/shared/utilities/alerts';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { FireAuthService } from 'src/app/core/services/modules/fire-auth.service';
import { NewSpaceComponent } from 'src/app/shared/components/spaces/new-space/new-space.component';
import { SpacesService } from 'src/app/core/services/modules/spaces.service';
import { TimeHandlerModule } from 'src/app/shared/utilities/time-handler';
import { Space } from 'src/app/core/models/spaces';
import { UsersService } from 'src/app/core/services/modules/users.service';

@Component({
  selector: 'app-spaces-admin',
  templateUrl: './spaces-admin.component.html',
  styleUrls: ['./spaces-admin.component.scss'],
})
export class SpacesAdminComponent implements OnInit {
  loading = true;
  itemList: Space[] = []
  user: UserFormData;

  filterSelected = 'Todos';
  filterItems = ['Todos','oficina','vivienda' , 'parqueo' , 'recepción' , 'bodega' , 'salón' , 'tienda' , 'terraza']

  constructor(
    private modal: ModalController,
    private users: UsersService,
    private auth: FireAuthService,
    private spaces: SpacesService,
    private routerOutlet: IonRouterOutlet
  ) { }

  ngOnInit() {
    this.loading = true;
    this.loadData().then(user => {
      this.loading = false;
      // this.loadUsers();
    })
  }

  async loadData(reload?) {
    try {
      let list: Space[] = [];
      const userData:any = await this.auth.getUser();
      if(this.filterSelected === 'Todos'){
        list = await this.spaces.readSpacesListOrder();
      }else{
        list = await this.spaces.readSpacesListOrderType(this.filterSelected);
      }
      if(reload){
        if(list.length>0 && list.length < this.itemList.length){
          list.forEach(newItem => {
            let found = false;
            this.itemList.forEach(item => {
              if(newItem.uid === item.uid){ item = newItem; found= true;}
            })
            if(!found)(this.itemList.push(newItem));
          })
        }else{ this.itemList = list;}
      }else{ this.itemList = list;}
      this.user = userData.data;
      return this.user
    } catch (error) {
      console.log(error)
      this.loading = false;
    }
  }

  async doRefresh(refresh?){
    await this.loadData()
    if (refresh){ refresh.target.complete(); }
  }


  filterChange(e) { 
    this.filterSelected = e.detail.value;
    this.loadData();
  }

  async createSpace(){
    const modal = await this.modal.create({
      component: NewSpaceComponent,
      componentProps: {space: null, user: this.user },
      mode: 'ios',
      presentingElement: this.routerOutlet.nativeEl
    });
    modal.present();
    const modalResult = await modal.onWillDismiss();
    console.log(modalResult);
    if(modalResult.data){ this.loadData(true);}
  }

  async detailSpace(space){
    const modal = await this.modal.create({
      component: NewSpaceComponent,
      componentProps: {space, user: this.user },
      mode: 'ios',
      presentingElement: this.routerOutlet.nativeEl
    });
    modal.present();
    const modalResult = await modal.onWillDismiss();
    if(modalResult.data){ this.loadData(true);}
  }

  loadUsers(){
    this.users.readAllUsers()
    .then(list => { 
      const unitlist = [...this.itemList];
      console.log(list)
      list.forEach(user => {
        if(user.leases?.length>0){
          user.leases.forEach(lease => {
            unitlist.forEach(async space => {
              if(lease.spaceLease.uid === space.uid){
                const updatedSpace:Space = {...space, lease: lease}
                await this.spaces.UpdateSpaces(updatedSpace)
                console.log(updatedSpace)
              }
            })
          })
        }
      } )
    })
  }
}
