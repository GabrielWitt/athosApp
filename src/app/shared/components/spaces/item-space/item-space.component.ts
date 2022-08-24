import { Component, Input, OnInit } from '@angular/core';
import { Space } from 'src/app/core/models/spaces';

@Component({
  selector: 'app-item-space',
  templateUrl: './item-space.component.html',
  styleUrls: ['./item-space.component.scss'],
})
export class ItemSpaceComponent implements OnInit {
  @Input() space: Space;
  @Input() profileView: boolean;
  defaultSpace = '../../../../../assets/blueprint.png';

  constructor() { }

  ngOnInit() {}

  fixTitle(title){
    if (title.length > 50){ return title.substring(0, 50) + '...'; }
    else{ return title; }
  }

  showOccupant(){
    if(this.space.rent){return this.space.rentData.cost + "$"; }
    else{ return '-'; }
  }

}
