import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Space } from 'src/app/core/models/spaces';
import { UserFormData } from 'src/app/core/models/user';
import { ImagePreviewComponent } from '../../view/image-preview/image-preview.component';

@Component({
  selector: 'app-detail-space',
  templateUrl: './detail-space.component.html',
  styleUrls: ['./detail-space.component.scss'],
})
export class DetailSpaceComponent implements OnInit {
  @Input() space: Space;
  @Input() user: UserFormData;
  @Input() reserve: boolean
  defaultSpace = '../../../../../assets/blueprint.png';

  constructor(private modal: ModalController) { }

  ngOnInit() {}

  async openPreview(img) {
    let preview = { url: img}
    const modal = await this.modal.create({
      component: ImagePreviewComponent,
      cssClass: 'transparent-modal',
      componentProps: {
        img: preview
      }
    });
    modal.present();
  }

}
