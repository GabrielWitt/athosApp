import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserController } from 'src/app/core/controller/user.controller';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.page.html',
  styleUrls: ['./employee.page.scss'],
})
export class EmployeePage implements OnInit {

  constructor(
    private router: Router,
    private userCtrl: UserController
  ) { }

  ngOnInit() {
    this.userCtrl.loadUser();
  }

}
