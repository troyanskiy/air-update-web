import { Component } from '@angular/core';
import { AlertController, NavParams, ViewController } from 'ionic-angular';
import { AccessKeyType, IModalGeneralEditSaveDataOptions } from '../../app/declarations';


@Component({
  selector: 'modal-general-edit',
  templateUrl: 'modal-general-edit.html'
})
export class ModalGeneralEditComponent {

  AccessKeyType = AccessKeyType;

  withCode: boolean = false;
  withTypes: boolean = false;

  modalTitle: string = '';

  title: string = '';
  description: string = '';
  code: string = '';
  type: AccessKeyType = AccessKeyType.Pull;

  constructor(private viewCtrl: ViewController, private navParams: NavParams, private alertCtrl: AlertController) {
    console.log(this.navParams.data);

    this.modalTitle = this.navParams.data.title;
    this.withCode = this.navParams.data.withCode;
    this.withTypes = this.navParams.data.withTypes;

    this.type = this.navParams.data.defType || AccessKeyType.Pull;

    this.title = this.navParams.data.dataTitle || '';
    this.description = this.navParams.data.dataDescription || '';

  }


  close() {
    this.viewCtrl.dismiss(null, 'cancel');
  }

  async save() {

    this.title = this.title.trim();
    this.description = this.description.trim();

    if (!this.title) {
      this.alertCtrl.create({
        title: this.modalTitle,
        message: 'Please input the title',
        buttons: ['OK']
      }).present();
      return;
    }

    const retObj: IModalGeneralEditSaveDataOptions =  {
      title: this.title,
      description: this.description
    };

    if (this.withCode) {
      retObj.code = this.code;
    }

    if (this.withTypes) {
      retObj.type = this.type;
    }

    const data = await this.navParams.data.saveHandler(retObj);

    this.viewCtrl.dismiss(data, 'ok');

  }

}
