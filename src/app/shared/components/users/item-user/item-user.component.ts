import { Component, Input, OnInit } from '@angular/core';
import { Space } from 'src/app/core/models/spaces';
import { ShortUser, UserFormData } from 'src/app/core/models/user';

@Component({
  selector: 'app-item-user',
  templateUrl: './item-user.component.html',
  styleUrls: ['./item-user.component.scss'],
})
export class ItemUserComponent implements OnInit {
  @Input() user: UserFormData;
  defaultUser = '../../../../assets/profile/ProfileBlank.png';
  principal;

  constructor() { }

  ngOnInit() {
  }

}
