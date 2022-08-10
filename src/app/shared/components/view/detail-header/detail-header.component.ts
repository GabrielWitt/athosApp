import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

export interface ButtonRight {
  text?: string;
  icon?: string;
  show: boolean;
}

export interface ButtonBack {
  text?: string;
  icon?: string;
  modal: boolean;
  backUrl?: string;
}

@Component({
  selector: 'app-detail-header',
  templateUrl: './detail-header.component.html',
  styleUrls: ['./detail-header.component.scss'],
})
export class DetailHeaderComponent implements OnInit {
  @Input() title: string;
  @Input() backButton: ButtonBack;
  @Input() endButton: ButtonRight;

  constructor(
    private router: Router,
    public modal: ModalController
  ) { }

  ngOnInit() {}

  goBack(){
    this.router.navigateByUrl(this.backButton.backUrl);
  }

}
