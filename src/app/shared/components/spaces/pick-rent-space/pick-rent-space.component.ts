import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Space } from 'src/app/core/models/spaces';
import { SpacesService } from 'src/app/core/services/modules/spaces.service';

@Component({
  selector: 'app-pick-rent-space',
  templateUrl: './pick-rent-space.component.html',
  styleUrls: ['./pick-rent-space.component.scss'],
})
export class PickRentSpaceComponent implements OnInit {
  rentSpacesList: Space[] = [];
  loading = true;

  constructor(
    private spaces: SpacesService,
    public modal: ModalController
  ) { }

  ngOnInit() {
    this.loadData()
  }

  async loadData(){
    try {
      this.rentSpacesList = await this.spaces.
      readSpacesListOrderRent('rent',true);
      this.loading = false;
    } catch (error) {
      console.log(error)
      this.loading = false;
    }
  }

  pickSpace(space){
    this.modal.dismiss(space);
  }

}
