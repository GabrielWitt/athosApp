import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-big-button',
  templateUrl: './big-button.component.html',
  styleUrls: ['./big-button.component.scss'],
})
export class BigButtonComponent implements OnInit {
  @Input() LABEL: string;
  @Input() loading: boolean;
  @Input() disabled: boolean;
  @Input() buttonType: string; 


  constructor() { }

  ngOnInit() {}

  checkType(type, value){
    return type === value
  }

}
