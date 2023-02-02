
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Lease, Space } from 'src/app/core/models/spaces';
import { ShortUser, UserFormData } from 'src/app/core/models/user';
import { SpacesService } from 'src/app/core/services/modules/spaces.service';
import { UsersService } from 'src/app/core/services/modules/users.service';
import { AlertsService } from 'src/app/shared/utilities/alerts';

@Component({
  selector: 'app-assign-space',
  templateUrl: './assign-space.component.html',
  styleUrls: ['./assign-space.component.scss'],
})
export class AssignSpaceComponent implements OnInit {
  @Input() userData: UserFormData;
  currentUser: UserFormData;
  loading = false;
  edit = false;
  showCalendar = false;
  showCalendar2 = false;
  defaultUser = '../../../../assets/profile/ProfileBlank.png';
  defaultSpace = '../../../../assets/blueprint.png';
  selectedSpace: Lease;
  alreadyLease: Lease;
  spacesList: Space[] = [];
  listSelected = [];
  currentShortUser: ShortUser;

  constructor(
    public modal: ModalController,
    private spaces: SpacesService,
    private users: UsersService,
    private alerts: AlertsService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.currentUser = this.userData;
    this.currentShortUser = {
      uid: this.userData.uid,
      photo: this.userData.photo,
      email: this.userData.email,
      name: this.userData.name,
    }
    this.spaces.readSpacesListOrder().then((list: Space[]) => {
      let available = [];
      list.forEach(item => {
        if(item.spaceType === 'privado'){ available.push(item); }
      })
      this.spacesList = available;
      this.loading = false;
      console.log(this.spacesList)
    })
  }

  editSpaces(){
    if(this.edit || this.alreadyLease){
      this.currentUser = this.userData;
      this.selectedSpace = null;
      this.alreadyLease = null;
      this.edit = false;
    } else { this.edit = true; }
  }

  selectSpace(lease: Lease){
    this.alreadyLease = lease;
    let spaceObj: Space = this.spacesList.find(space => space.uid === lease.spaceLease.uid);
    this.editSpaceLease(spaceObj);
  }

  newSpace(e){ 
    let spaceObj: Space = this.spacesList.find(space => space.uid === e.detail.value);
    this.editSpaceLease(spaceObj);
  }

  costListener(e){
    this.selectedSpace.monthlyCost = e.detail.value;
  }

  editSpaceLease(spaceObj){
    let newLease: Lease = {
      spaceLease: {
        uid: spaceObj.uid,
        unitNumber: spaceObj.unitNumber,
        communityUID: spaceObj.communityUID,
        description: spaceObj.description,
        floor: spaceObj.floor,
        photo: spaceObj.photo,
        type: spaceObj.type
      },
      userLease: this.currentShortUser,
      leaseStart: new Date().toISOString(),
      leaseEnd: '',
      status: 'active',
      monthlyCost: 0
    }
    this.selectedSpace = newLease;
  }

  showCalendar1(){ this.showCalendar = !this.showCalendar; }

  changeLeaseStartTime(event){
    this.showCalendar = false;
    this.selectedSpace.leaseStart = new Date(event).toISOString();
  }

  sendData(){
    this.loading = true;
    this.checkPreviousLease(this.selectedSpace).then(data => {
      if(!data){console.log('error')}
      else{ 
        this.alerts.showAlert('Asignación',this.selectedSpace.spaceLease.type.toUpperCase()+ ' ' + this.selectedSpace.spaceLease.unitNumber + ' ha sido agregado exitosamente')
        this.modal.dismiss(true); 
      }
      this.loading = false;
    })
  }

  async checkPreviousLease(lease){
    try {
      let spaceObj: Space = this.spacesList.find(space => space.uid === lease.spaceLease.uid);
      if(spaceObj.lease){
        let oldLease: Lease = await this.terminateLease(spaceObj,lease.spaceLease.uid);
        if(oldLease && !spaceObj.leaseHistory){ spaceObj.leaseHistory = [oldLease]}
        else{ spaceObj.leaseHistory.push(oldLease) }
      }
      spaceObj.lease = lease;
      spaceObj.lease.monthlyCost = parseFloat(''+spaceObj.lease.monthlyCost);
      await this.spaces.UpdateSpaces(spaceObj);
      if(this.currentUser.leases?.length > 0){ this.currentUser.leases.push(lease)}
      else{ this.currentUser.leases = [lease] }
      await this.users.updateUser(this.currentUser);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async terminateLease(spaceObj, uid){
    try {
      let oldLease: Lease;
      let previousUser: UserFormData = await this.users.readUser(spaceObj.lease.userLease.uid);
      previousUser.leases.forEach(leaseUser => {
        if(leaseUser.spaceLease.uid === uid){
          leaseUser.leaseEnd = new Date().toISOString();
          leaseUser.status = 'unactive';
          oldLease = leaseUser;
        }
      });
      await this.users.updateUser(previousUser);
      return oldLease;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  closeLease(){
    this.alerts.AlertConfirm(this.alreadyLease.spaceLease.type.toUpperCase()+ ' ' + this.alreadyLease.spaceLease.unitNumber,
      '¿Seguro que desea finalizar esta asignación?').then(async answer => {
      if(answer){
        this.loading = true;
        try {
          let spaceObj: Space = this.spacesList.find(space => space.uid === this.alreadyLease.spaceLease.uid);
          let oldLease: Lease = await this.terminateLease(spaceObj,this.alreadyLease.spaceLease.uid);
          if(oldLease && !spaceObj.leaseHistory){ spaceObj.leaseHistory = [oldLease]}
          else{ spaceObj.leaseHistory.push(oldLease) }
          this.loading = false;
          this.modal.dismiss(true);
        } catch (error) {
          console.log(error);
          this.loading = false;
        }
      }
    })
  }

}
