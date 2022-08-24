import { Component, Input, OnInit } from '@angular/core';
import { ShortUser, UserFormData } from 'src/app/core/models/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  @Input() user: UserFormData;
  @Input() shortUser: ShortUser;
  defaultUser = '../../../../assets/profile/ProfileBlank.png';
  lastName = '';

  constructor() { }

  ngOnInit() { 
  }

}
