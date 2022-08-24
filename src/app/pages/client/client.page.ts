import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserController } from 'src/app/core/controller/user.controller';
import { AttachmentsService } from 'src/app/shared/utilities/attachments.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {

  constructor(
    private router: Router,
    private userCtrl: UserController
  ) { }

  ngOnInit() {
    this.userCtrl.loadUser();
  }

}
