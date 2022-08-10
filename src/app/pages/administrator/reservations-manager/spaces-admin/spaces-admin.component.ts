import { Component, OnInit } from '@angular/core';
import { userFormData } from 'src/app/core/models/user';
import { AlertsService } from 'src/app/shared/utilities/alerts';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { FireAuthService } from 'src/app/core/services/modules/fire-auth.service';
import { NewSpaceComponent } from 'src/app/shared/components/spaces/new-space/new-space.component';
import { SpacesService } from 'src/app/core/services/modules/spaces.service';
import { TimeHandlerModule } from 'src/app/shared/utilities/time-handler';
import { Space } from 'src/app/core/models/spaces';

@Component({
  selector: 'app-spaces-admin',
  templateUrl: './spaces-admin.component.html',
  styleUrls: ['./spaces-admin.component.scss'],
})
export class SpacesAdminComponent implements OnInit {
  loading = true;
  itemList = []
  user: userFormData;

  filterSelected = 'Todos';
  filterSelection = { name: 'Todos', filter: null, value: null };
  filterItems = [
    { name: 'Todos', filter: null, value: null },
    { name: 'Espacios a Reservar', filter: 'rent', value: true },
    { name: 'Espacios Privados', filter: 'spaceType', value: 'privado' },
    { name: 'Espacios Comunitarios', filter: 'spaceType', value: 'comunal' },
  ]

  constructor(
    private modal: ModalController,
    private auth: FireAuthService,
    private spaces: SpacesService,
    private routerOutlet: IonRouterOutlet
  ) { }

  ngOnInit() {
    this.loading = true;
    this.loadData().then(user => {
      this.loading = false;
    })
  }

  async loadData(reload?) {
    try {
      let list: Space[] = [];
      const userData:any = await this.auth.getUser();
      if(this.filterSelection.filter){
        list = await this.spaces.
        readSpacesListOrderRent(this.filterSelection.filter,this.filterSelection.value);
      }else{list = await this.spaces.readSpacesListOrder();}
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
    let selection = null;
    this.filterItems.forEach(item => {
      if(item.name === this.filterSelected){selection = item}
    })
    if(selection){ this.filterSelection = selection;}
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
    if(modalResult.data){ this.loadData();}
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

}
