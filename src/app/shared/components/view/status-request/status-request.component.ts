import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-request',
  templateUrl: './status-request.component.html',
  styleUrls: ['./status-request.component.scss'],
})
export class StatusRequestComponent implements OnInit {
  @Input() status: 'Solicitado'|'Aprovado'|'Cancelado'|'Terminado';

  constructor() { }

  ngOnInit() {
  }

}
